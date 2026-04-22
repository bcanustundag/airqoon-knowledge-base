#!/usr/bin/env node
/**
 * Fetch all Notion pages from the marketing section and save them as raw articles.
 * This script uses the Notion API directly (no SDK required).
 * 
 * Usage: 
 *   $env:NOTION_API_KEY="ntn_xxx"; node fetch-notion-pages.mjs
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
if (!NOTION_API_KEY) {
  console.error('❌ NOTION_API_KEY environment variable is required.');
  console.error('   Set it with: $env:NOTION_API_KEY="ntn_..."');
  process.exit(1);
}

const NOTION_VERSION = '2022-06-28';
const BASE_DIR = path.resolve(import.meta.dirname, '..');
const RAW_DIR = path.join(BASE_DIR, 'raw', 'articles', 'notion');

fs.mkdirSync(RAW_DIR, { recursive: true });

// ============= ALL PAGES TO EXTRACT =============
const PAGES = {
  // === Boards (databases - we extract their entries) ===
  // 'marketing-content-calendar': { id: 'e6e86a6d77ac431891812469ac6a7254', type: 'database' },
  // 'social-media-sharing-calendar': { id: '9042c3094db1472490a88b8bb99fe73e', type: 'database' },

  // === Marketing ===
  'gathering-testimonials': { id: 'd8aba90137ec4176ab8160dffb1d827b', type: 'page' },
  'outbound-marketing-linkedin-templates': { id: '963f7c3f9ba44addb9eb91b688a2cc65', type: 'page' },
  'customer-success-scenarios': { id: 'd89a638e851a4839a5d7c9d078cd2582', type: 'page' },
  'marketing-documents': { id: 'ce2bdef8dec540b590f44742572e7d7a', type: 'page' },

  // === Growth ===
  'pace-projesi': { id: '2cafb36e07e7805cacebe709606ddfb6', type: 'page' },
  'airqoon-lens-yeni-ozellik-mesaj': { id: '299fb36e07e7805498f4e0a007e84eab', type: 'page' },
  'iot-hava-kalitesi-izleme-bursa': { id: '261fb36e07e780d2b38cc7db94d43e47', type: 'page' },
  'n8n-templates': { id: '25bfb36e07e780928c34c7be50556c45', type: 'page' },
  'airqoon-vs-oizom-comparison': { id: '24cfb36e07e7808c8864dcfcccffa1ed', type: 'page' },
  'satis-arastirma': { id: '23bfb36e07e780b49e6ad22ac3561bd1', type: 'page' },
  'unite-l': { id: '21efb36e07e78074a21cefc8a67ca87e', type: 'page' },
  'product-page': { id: '1f1fb36e07e780aa9184f12f14e1b2b6', type: 'page' },
  'airqoon-lens': { id: '1eafb36e07e780368616dc30a4fd7406', type: 'page' },
  'distributor-partnership-search': { id: '1e3fb36e07e7805f86a7ccbee909db12', type: 'page' },
  'istanbul-hava-kalitesi-olcumu': { id: '1b9fb36e07e780bf9787c420fa0b630c', type: 'page' },
  'copernicus': { id: '1abfb36e07e780779ffae3b00bd55e43', type: 'page' },
  'surdurulebilirlik-nedir': { id: '11ffb36e07e78084a261e28bc45c547d', type: 'page' },
  'emisyon-ve-imisyon-olcumleri': { id: '3b694c3114604c70a69b31bef771250d', type: 'page' },
  'clean-air-zone-caz': { id: '07f79760b86c48a1a59fe8f863ae7d8f', type: 'page' },
  'yonetmelik-guncel': { id: 'ba373734895b400f92b9ba4fd930230f', type: 'page' },
  'air-sensors-growth-marketing-staj': { id: 'e2c49b40f467423ca5c3ddb8aa01dec8', type: 'page' },
  'ngos': { id: 'dbac9ce752fd4c1caf5d0e773d3f857d', type: 'page' },
  'konular': { id: '165fb36e07e780c1a7c5d32f88d8d2b7', type: 'page' },
  'usa-hava-kirliligi-olcum-arastirmasi': { id: '1b9fb36e07e7807aa1fbfa5e882b2f1b', type: 'page' },
  'archive': { id: '239fb36e07e780a68a47cf5d72a77874', type: 'page' },
  '2026-potential-events': { id: '321fb36e07e7801aa0dec23244178a2b', type: 'page' },

  // === Sales ===
  'target-sectors': { id: 'f80da7f54c2443718225cde639c1dc6d', type: 'page' },
  'sales-funnel': { id: '16a88d46cd5c44528ee1d3f6b97ae271', type: 'page' },
  'merhaba-iletisim': { id: '18c34a39b173472889687467f13222a6', type: 'page' },
  'projeler': { id: '15a97b092ca34b5586af151d7d677700', type: 'page' },
  'azerbaijan': { id: 'f57b5c53033043cca099b5bab3f5f8a4', type: 'page' },
  'iraq': { id: 'ff27ab5072064ff3a1ff7ade24895355', type: 'page' },

  // === Lead Lists ===
  'scewc2023': { id: '5273c199cca34772b14e0fa78ecd444c', type: 'page' },
  'sales-pipeline-active-leads': { id: 'cceb117d634c4299addb6ed70b56b8b5', type: 'page' },
  'potential-lead-companies': { id: '2e4f3123364042c0afc7c51a3eb54c4b', type: 'page' },
  'mbb-hava-kirliligi-kentsel-doku': { id: '1cffb36e07e7809da5c0f31a9c15b53a', type: 'page' },
  'cimento-potansiyel-kurumlar': { id: '302fb36e07e780818707d819bdb15a19', type: 'page' },

  // === Partnership Management ===
  'partnerships-crm': { id: 'fe81c8ddc27c4e78942d616ca0fd587f', type: 'page' },
  'partner-onboarding': { id: 'fae6d9a10faa4bc28a3cff6eeafc3fb4', type: 'page' },

  // === Twitter ===
  'tweet-akisi': { id: '1e03129dfab1475ea42a6f431545b84d', type: 'page' },

  // === Other ===
  'sensor-tanitim-paylasim-metni': { id: '15afb36e07e780bd99c7d6cea1986310', type: 'page' },
};

// ============= DATABASES TO EXTRACT =============
const DATABASES = {
  'marketing-content-calendar': 'e6e86a6d77ac431891812469ac6a7254',
  'social-media-sharing-calendar': '9042c3094db1472490a88b8bb99fe73e',
};

// ============= NOTION API HELPERS =============

function notionRequest(endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      path: `/v1${endpoint}`,
      method,
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.status && parsed.status >= 400) {
            reject(new Error(`API error ${parsed.status}: ${parsed.message}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Request timeout')); });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getPageTitle(pageId) {
  try {
    const page = await notionRequest(`/pages/${pageId}`);
    if (page.properties) {
      const titleProp = Object.values(page.properties).find(p => p.type === 'title');
      if (titleProp?.title?.length > 0) {
        return titleProp.title.map(t => t.plain_text).join('');
      }
    }
    return pageId;
  } catch (e) {
    return pageId;
  }
}

async function getAllBlockChildren(blockId) {
  let allBlocks = [];
  let cursor = undefined;
  
  do {
    const endpoint = `/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`;
    const response = await notionRequest(endpoint);
    
    if (response.results) {
      allBlocks = allBlocks.concat(response.results);
    }
    
    cursor = response.has_more ? response.next_cursor : null;
  } while (cursor);
  
  return allBlocks;
}

function richTextToMarkdown(richTextArray) {
  if (!richTextArray || richTextArray.length === 0) return '';
  
  return richTextArray.map(rt => {
    let text = rt.plain_text || '';
    if (rt.annotations) {
      if (rt.annotations.bold) text = `**${text}**`;
      if (rt.annotations.italic) text = `*${text}*`;
      if (rt.annotations.strikethrough) text = `~~${text}~~`;
      if (rt.annotations.code) text = `\`${text}\``;
    }
    if (rt.href) text = `[${text}](${rt.href})`;
    return text;
  }).join('');
}

function blockToMarkdown(block, depth = 0) {
  const indent = '  '.repeat(depth);
  const type = block.type;
  
  if (!block[type]) return '';
  
  const data = block[type];
  const text = data.rich_text ? richTextToMarkdown(data.rich_text) : '';
  
  switch (type) {
    case 'paragraph':
      return text ? `${indent}${text}\n\n` : '\n';
    case 'heading_1':
      return `# ${text}\n\n`;
    case 'heading_2':
      return `## ${text}\n\n`;
    case 'heading_3':
      return `### ${text}\n\n`;
    case 'bulleted_list_item':
      return `${indent}- ${text}\n`;
    case 'numbered_list_item':
      return `${indent}1. ${text}\n`;
    case 'to_do':
      return `${indent}- [${data.checked ? 'x' : ' '}] ${text}\n`;
    case 'toggle':
      return `${indent}<details><summary>${text}</summary>\n\n`;
    case 'quote':
      return `> ${text}\n\n`;
    case 'callout':
      const icon = data.icon?.emoji || '💡';
      return `> ${icon} ${text}\n\n`;
    case 'code':
      const lang = data.language || '';
      return `\`\`\`${lang}\n${text}\n\`\`\`\n\n`;
    case 'divider':
      return `---\n\n`;
    case 'image':
      const imgUrl = data.file?.url || data.external?.url || '';
      const caption = data.caption ? richTextToMarkdown(data.caption) : '';
      return `![${caption}](${imgUrl})\n\n`;
    case 'bookmark':
      return `[${data.caption ? richTextToMarkdown(data.caption) : data.url}](${data.url})\n\n`;
    case 'link_preview':
      return `[Link](${data.url})\n\n`;
    case 'table':
      return '';
    case 'table_row':
      if (data.cells) {
        const cells = data.cells.map(c => richTextToMarkdown(c)).join(' | ');
        return `| ${cells} |\n`;
      }
      return '';
    case 'child_page':
      return `📄 **Sub-page:** ${data.title}\n\n`;
    case 'child_database':
      return `📊 **Database:** ${data.title}\n\n`;
    case 'embed':
      return `[Embed](${data.url})\n\n`;
    case 'video':
      const vidUrl = data.file?.url || data.external?.url || '';
      return `🎥 [Video](${vidUrl})\n\n`;
    case 'file':
      const fileUrl = data.file?.url || data.external?.url || '';
      return `📎 [File](${fileUrl})\n\n`;
    case 'pdf':
      const pdfUrl = data.file?.url || data.external?.url || '';
      return `📄 [PDF](${pdfUrl})\n\n`;
    case 'table_of_contents':
      return `*[Table of Contents]*\n\n`;
    default:
      return text ? `${indent}${text}\n\n` : '';
  }
}

// ============= EXTRACTION FUNCTIONS =============

async function extractPage(slug, pageId) {
  console.log(`  📄 ${slug} (${pageId})`);
  
  try {
    const title = await getPageTitle(pageId);
    const blocks = await getAllBlockChildren(pageId);
    
    let markdown = `---\ntitle: "${title.replace(/"/g, '\\"')}"\nsource: notion\npage_id: ${pageId}\nextracted: ${new Date().toISOString().split('T')[0]}\n---\n\n# ${title}\n\n`;
    
    for (const block of blocks) {
      markdown += blockToMarkdown(block);
      
      // Recursively get children
      if (block.has_children && block.type !== 'child_page' && block.type !== 'child_database') {
        try {
          const children = await getAllBlockChildren(block.id);
          for (const child of children) {
            markdown += blockToMarkdown(child, 1);
          }
        } catch (e) {
          markdown += `  *(children not accessible)*\n\n`;
        }
      }
    }
    
    const filePath = path.join(RAW_DIR, `${slug}.md`);
    fs.writeFileSync(filePath, markdown, 'utf-8');
    console.log(`    ✓ Saved (${markdown.length} chars)`);
    return { slug, success: true, chars: markdown.length };
  } catch (e) {
    console.error(`    ✗ Failed: ${e.message}`);
    return { slug, success: false, error: e.message };
  }
}

async function extractDatabase(slug, databaseId) {
  console.log(`  📊 ${slug} (${databaseId})`);
  
  try {
    // Get database info
    const db = await notionRequest(`/databases/${databaseId}`);
    const dbTitle = db.title?.map(t => t.plain_text).join('') || slug;
    
    // Query all entries
    let allEntries = [];
    let cursor = undefined;
    
    do {
      const body = { page_size: 100 };
      if (cursor) body.start_cursor = cursor;
      
      const response = await notionRequest(`/databases/${databaseId}/query`, 'POST', body);
      if (response.results) {
        allEntries = allEntries.concat(response.results);
      }
      cursor = response.has_more ? response.next_cursor : null;
    } while (cursor);
    
    // Build markdown
    let markdown = `---\ntitle: "${dbTitle.replace(/"/g, '\\"')}"\nsource: notion-database\ndatabase_id: ${databaseId}\nextracted: ${new Date().toISOString().split('T')[0]}\nentry_count: ${allEntries.length}\n---\n\n# ${dbTitle}\n\n`;
    
    // Get property names from schema
    const propNames = Object.keys(db.properties);
    
    // Add table header
    markdown += `| ${propNames.join(' | ')} |\n`;
    markdown += `| ${propNames.map(() => '---').join(' | ')} |\n`;
    
    // Add entries
    for (const entry of allEntries) {
      const values = propNames.map(propName => {
        const prop = entry.properties[propName];
        if (!prop) return '';
        
        switch (prop.type) {
          case 'title':
            return prop.title?.map(t => t.plain_text).join('') || '';
          case 'rich_text':
            return prop.rich_text?.map(t => t.plain_text).join('') || '';
          case 'select':
            return prop.select?.name || '';
          case 'multi_select':
            return prop.multi_select?.map(s => s.name).join(', ') || '';
          case 'status':
            return prop.status?.name || '';
          case 'date':
            return prop.date?.start || '';
          case 'url':
            return prop.url || '';
          case 'number':
            return prop.number?.toString() || '';
          case 'checkbox':
            return prop.checkbox ? '✅' : '❌';
          case 'people':
            return prop.people?.map(p => p.name || p.id).join(', ') || '';
          case 'files':
            return prop.files?.map(f => f.name || 'file').join(', ') || '';
          case 'email':
            return prop.email || '';
          case 'phone_number':
            return prop.phone_number || '';
          case 'formula':
            return prop.formula?.string || prop.formula?.number?.toString() || '';
          case 'relation':
            return prop.relation?.map(r => r.id).join(', ') || '';
          case 'rollup':
            return JSON.stringify(prop.rollup?.array || prop.rollup?.number || '');
          default:
            return '';
        }
      });
      
      // Escape pipe characters in values
      const escaped = values.map(v => v.replace(/\|/g, '\\|').replace(/\n/g, ' '));
      markdown += `| ${escaped.join(' | ')} |\n`;
    }
    
    const filePath = path.join(RAW_DIR, `${slug}.md`);
    fs.writeFileSync(filePath, markdown, 'utf-8');
    console.log(`    ✓ Saved ${allEntries.length} entries (${markdown.length} chars)`);
    return { slug, success: true, entries: allEntries.length, chars: markdown.length };
  } catch (e) {
    console.error(`    ✗ Failed: ${e.message}`);
    return { slug, success: false, error: e.message };
  }
}

// ============= MAIN =============

async function main() {
  console.log('=== Fetching Notion Pages for Knowledge Base ===\n');
  
  const results = [];
  const entries = Object.entries(PAGES);
  
  // Extract pages in batches of 3
  console.log(`📋 Extracting ${entries.length} pages...\n`);
  
  for (let i = 0; i < entries.length; i += 3) {
    const batch = entries.slice(i, i + 3);
    const promises = batch.map(([slug, config]) => extractPage(slug, config.id));
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
    
    // Rate limit
    if (i + 3 < entries.length) {
      await new Promise(r => setTimeout(r, 400));
    }
  }
  
  // Extract databases
  console.log(`\n📊 Extracting ${Object.keys(DATABASES).length} databases...\n`);
  
  for (const [slug, dbId] of Object.entries(DATABASES)) {
    const result = await extractDatabase(slug, dbId);
    results.push(result);
    await new Promise(r => setTimeout(r, 400));
  }
  
  // Summary
  const success = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n=== Summary ===`);
  console.log(`✅ Succeeded: ${success.length}/${results.length}`);
  if (failed.length > 0) {
    console.log(`❌ Failed: ${failed.length}`);
    failed.forEach(r => console.log(`   - ${r.slug}: ${r.error}`));
  }
  console.log(`\nFiles saved to: ${RAW_DIR}`);
}

main().catch(console.error);
