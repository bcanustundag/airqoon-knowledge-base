#!/usr/bin/env node
/**
 * Export Notion "Resources Docs" database pages to markdown files.
 * 
 * Usage: NOTION_TOKEN=<your-token> node export-notion.mjs
 * 
 * This reads the token from the MCP config if not provided via env var.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Try to get token from MCP config
let NOTION_TOKEN = process.env.NOTION_TOKEN;
if (!NOTION_TOKEN) {
  try {
    const config = JSON.parse(readFileSync(join(process.env.HOME, '.gemini/antigravity/mcp_config.json'), 'utf-8'));
    // Look for notion token in MCP config
    const notionServer = config.mcpServers?.['notion-mcp-server'];
    if (notionServer?.env?.OPENAPI_MCP_HEADERS) {
      const headers = JSON.parse(notionServer.env.OPENAPI_MCP_HEADERS);
      NOTION_TOKEN = headers.Authorization?.replace('Bearer ', '');
    }
  } catch (e) {
    console.error('Could not read token from MCP config:', e.message);
  }
}

if (!NOTION_TOKEN) {
  console.error('No NOTION_TOKEN found. Set NOTION_TOKEN env var or ensure MCP config has it.');
  process.exit(1);
}

const DATABASE_ID = 'b3a1a582-51f6-418d-818c-a22804c4a431';
const OUTPUT_DIR = join(import.meta.dirname, '..', 'raw', 'articles');
const NOTION_VERSION = '2022-06-28';

const headers = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': NOTION_VERSION,
  'Content-Type': 'application/json',
};

async function notionFetch(url, options = {}) {
  const resp = await fetch(url, { headers, ...options });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Notion API ${resp.status}: ${body}`);
  }
  return resp.json();
}

// Query all pages in the database
async function queryDatabase() {
  let allPages = [];
  let startCursor = undefined;

  while (true) {
    const body = { page_size: 100 };
    if (startCursor) body.start_cursor = startCursor;

    const data = await notionFetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      { method: 'POST', body: JSON.stringify(body) }
    );

    allPages.push(...data.results);
    console.log(`Fetched ${data.results.length} pages (total: ${allPages.length})`);

    if (!data.has_more) break;
    startCursor = data.next_cursor;
  }

  return allPages;
}

// Get all blocks (content) of a page, recursively
async function getBlocks(blockId) {
  let allBlocks = [];
  let startCursor = undefined;

  while (true) {
    let url = `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`;
    if (startCursor) url += `&start_cursor=${startCursor}`;

    const data = await notionFetch(url);
    allBlocks.push(...data.results);

    if (!data.has_more) break;
    startCursor = data.next_cursor;
  }

  // Recursively get children
  for (const block of allBlocks) {
    if (block.has_children) {
      block.children = await getBlocks(block.id);
    }
  }

  return allBlocks;
}

// Convert rich text array to markdown string
function richTextToMd(richTextArr) {
  if (!richTextArr || !Array.isArray(richTextArr)) return '';
  return richTextArr.map(rt => {
    let text = rt.plain_text || '';
    const ann = rt.annotations || {};
    if (ann.bold) text = `**${text}**`;
    if (ann.italic) text = `*${text}*`;
    if (ann.strikethrough) text = `~~${text}~~`;
    if (ann.code) text = `\`${text}\``;
    if (rt.href) text = `[${text}](${rt.href})`;
    return text;
  }).join('');
}

// Convert blocks to markdown
function blocksToMd(blocks, indent = 0) {
  const lines = [];
  const prefix = '  '.repeat(indent);

  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        lines.push(prefix + richTextToMd(block.paragraph.rich_text));
        lines.push('');
        break;
      case 'heading_1':
        lines.push(`${prefix}# ${richTextToMd(block.heading_1.rich_text)}`);
        lines.push('');
        break;
      case 'heading_2':
        lines.push(`${prefix}## ${richTextToMd(block.heading_2.rich_text)}`);
        lines.push('');
        break;
      case 'heading_3':
        lines.push(`${prefix}### ${richTextToMd(block.heading_3.rich_text)}`);
        lines.push('');
        break;
      case 'bulleted_list_item':
        lines.push(`${prefix}- ${richTextToMd(block.bulleted_list_item.rich_text)}`);
        if (block.children) lines.push(blocksToMd(block.children, indent + 1));
        break;
      case 'numbered_list_item':
        lines.push(`${prefix}1. ${richTextToMd(block.numbered_list_item.rich_text)}`);
        if (block.children) lines.push(blocksToMd(block.children, indent + 1));
        break;
      case 'to_do':
        const checked = block.to_do.checked ? 'x' : ' ';
        lines.push(`${prefix}- [${checked}] ${richTextToMd(block.to_do.rich_text)}`);
        if (block.children) lines.push(blocksToMd(block.children, indent + 1));
        break;
      case 'toggle':
        lines.push(`${prefix}<details><summary>${richTextToMd(block.toggle.rich_text)}</summary>`);
        lines.push('');
        if (block.children) lines.push(blocksToMd(block.children, indent));
        lines.push(`${prefix}</details>`);
        lines.push('');
        break;
      case 'code':
        const lang = block.code.language || '';
        lines.push(`${prefix}\`\`\`${lang}`);
        lines.push(prefix + richTextToMd(block.code.rich_text));
        lines.push(`${prefix}\`\`\``);
        lines.push('');
        break;
      case 'quote':
        const quoteText = richTextToMd(block.quote.rich_text);
        quoteText.split('\n').forEach(l => lines.push(`${prefix}> ${l}`));
        lines.push('');
        break;
      case 'callout':
        lines.push(`${prefix}> ${block.callout.icon?.emoji || '💡'} ${richTextToMd(block.callout.rich_text)}`);
        if (block.children) lines.push(blocksToMd(block.children, indent));
        lines.push('');
        break;
      case 'divider':
        lines.push(`${prefix}---`);
        lines.push('');
        break;
      case 'image':
        const imgUrl = block.image?.file?.url || block.image?.external?.url || '';
        const caption = richTextToMd(block.image?.caption);
        lines.push(`${prefix}![${caption}](${imgUrl})`);
        lines.push('');
        break;
      case 'bookmark':
        const bmUrl = block.bookmark?.url || '';
        const bmCaption = richTextToMd(block.bookmark?.caption);
        lines.push(`${prefix}[${bmCaption || bmUrl}](${bmUrl})`);
        lines.push('');
        break;
      case 'link_preview':
        lines.push(`${prefix}[${block.link_preview?.url}](${block.link_preview?.url})`);
        lines.push('');
        break;
      case 'embed':
        lines.push(`${prefix}[Embed: ${block.embed?.url}](${block.embed?.url})`);
        lines.push('');
        break;
      case 'table':
        if (block.children) {
          for (let i = 0; i < block.children.length; i++) {
            const row = block.children[i];
            if (row.type === 'table_row') {
              const cells = row.table_row.cells.map(c => richTextToMd(c));
              lines.push(`${prefix}| ${cells.join(' | ')} |`);
              if (i === 0) {
                lines.push(`${prefix}| ${cells.map(() => '---').join(' | ')} |`);
              }
            }
          }
          lines.push('');
        }
        break;
      case 'child_page':
        lines.push(`${prefix}📄 **${block.child_page.title}** *(sub-page)*`);
        lines.push('');
        break;
      case 'child_database':
        lines.push(`${prefix}🗃️ **${block.child_database.title}** *(database)*`);
        lines.push('');
        break;
      default:
        // Catch-all for unsupported block types
        lines.push(`${prefix}<!-- unsupported block type: ${block.type} -->`);
        lines.push('');
    }
  }

  return lines.join('\n');
}

// Extract page title
function getPageTitle(page) {
  const titleProp = page.properties?.Name || page.properties?.title;
  if (!titleProp) return 'Untitled';
  const titleArr = titleProp.title || titleProp;
  if (Array.isArray(titleArr)) {
    return titleArr.map(t => t.plain_text).join('') || 'Untitled';
  }
  return 'Untitled';
}

// Sanitize filename
function sanitizeFilename(name) {
  return name
    .replace(/[/\\?%*:|"<>]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100);
}

// Extract tags
function getTags(page) {
  const tagProp = page.properties?.Tags;
  if (!tagProp || tagProp.type !== 'multi_select') return [];
  return tagProp.multi_select.map(t => t.name);
}

// Extract language
function getLanguage(page) {
  const langProp = page.properties?.Language;
  if (!langProp || langProp.type !== 'select' || !langProp.select) return '';
  return langProp.select.name;
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('Querying Resources Docs database...');
  const pages = await queryDatabase();
  console.log(`Found ${pages.length} pages total.\n`);

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const title = getPageTitle(page);
    const tags = getTags(page);
    const language = getLanguage(page);
    const created = page.created_time?.split('T')[0] || '';
    const edited = page.last_edited_time?.split('T')[0] || '';

    console.log(`[${i + 1}/${pages.length}] Exporting: ${title}`);

    try {
      const blocks = await getBlocks(page.id);
      const content = blocksToMd(blocks);

      // Build frontmatter
      const frontmatter = [
        '---',
        `title: "${title.replace(/"/g, '\\"')}"`,
        `source: notion`,
        `notion_id: "${page.id}"`,
        `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
        language ? `language: "${language}"` : null,
        `created: ${created}`,
        `last_edited: ${edited}`,
        `exported: ${new Date().toISOString().split('T')[0]}`,
        '---',
      ].filter(Boolean).join('\n');

      const markdown = `${frontmatter}\n\n# ${title}\n\n${content}`;
      const filename = sanitizeFilename(title) + '.md';
      const filepath = join(OUTPUT_DIR, filename);

      writeFileSync(filepath, markdown, 'utf-8');
      console.log(`   → ${filename}`);
    } catch (err) {
      console.error(`   ✗ Error: ${err.message}`);
    }

    // Small delay to respect rate limits
    await new Promise(r => setTimeout(r, 350));
  }

  console.log('\nDone! Files saved to:', OUTPUT_DIR);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
