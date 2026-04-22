#!/usr/bin/env node
/**
 * Extract all Notion pages and airqoon.com articles into raw/ directory
 * Usage: node extract-all-sources.mjs
 * Requires: NOTION_API_KEY env variable
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = '2022-06-28';

const BASE_DIR = path.resolve(import.meta.dirname, '..');
const RAW_NOTION_DIR = path.join(BASE_DIR, 'raw', 'articles', 'notion');
const RAW_WEBSITE_DIR = path.join(BASE_DIR, 'raw', 'articles', 'airqoon-com');

// Ensure directories exist
fs.mkdirSync(RAW_NOTION_DIR, { recursive: true });
fs.mkdirSync(RAW_WEBSITE_DIR, { recursive: true });

// ============= NOTION PAGE IDS =============
const NOTION_PAGES = {
  // Marketing
  'gathering-testimonials': 'd8aba90137ec4176ab8160dffb1d827b',
  'outbound-marketing-linkedin-templates': '963f7c3f9ba44addb9eb91b688a2cc65',
  'customer-success-scenarios': 'd89a638e851a4839a5d7c9d078cd2582',
  'marketing-documents': 'ce2bdef8dec540b590f44742572e7d7a',
  
  // Growth
  'pace-projesi': '2cafb36e07e7805cacebe709606ddfb6',
  'airqoon-lens-yeni-ozellik-mesaj': '299fb36e07e7805498f4e0a007e84eab',
  'iot-hava-kalitesi-izleme-bursa': '261fb36e07e780d2b38cc7db94d43e47',
  'n8n-templates': '25bfb36e07e780928c34c7be50556c45',
  'airqoon-vs-oizom-comparison': '24cfb36e07e7808c8864dcfcccffa1ed',
  'satis-arastirma': '23bfb36e07e780b49e6ad22ac3561bd1',
  'unite-l': '21efb36e07e78074a21cefc8a67ca87e',
  'product-page': '1f1fb36e07e780aa9184f12f14e1b2b6',
  'airqoon-lens': '1eafb36e07e780368616dc30a4fd7406',
  'distributor-partnership-search': '1e3fb36e07e7805f86a7ccbee909db12',
  'istanbul-hava-kalitesi-olcumu': '1b9fb36e07e780bf9787c420fa0b630c',
  'copernicus': '1abfb36e07e780779ffae3b00bd55e43',
  'surdurulebilirlik-nedir': '11ffb36e07e78084a261e28bc45c547d',
  'emisyon-ve-imisyon-olcumleri': '3b694c3114604c70a69b31bef771250d',
  'clean-air-zone-caz': '07f79760b86c48a1a59fe8f863ae7d8f',
  'yonetmelik-guncel': 'ba373734895b400f92b9ba4fd930230f',
  'air-sensors-growth-marketing-staj': 'e2c49b40f467423ca5c3ddb8aa01dec8',
  'ngos': 'dbac9ce752fd4c1caf5d0e773d3f857d',
  'konular': '165fb36e07e780c1a7c5d32f88d8d2b7',
  'usa-hava-kirliligi-olcum-arastirmasi': '1b9fb36e07e7807aa1fbfa5e882b2f1b',
  'archive': '239fb36e07e780a68a47cf5d72a77874',
  '2026-potential-events': '321fb36e07e7801aa0dec23244178a2b',
  
  // Sales
  'target-sectors': 'f80da7f54c2443718225cde639c1dc6d',
  'sales-funnel': '16a88d46cd5c44528ee1d3f6b97ae271',
  'merhaba-iletisim': '18c34a39b173472889687467f13222a6',
  'projeler': '15a97b092ca34b5586af151d7d677700',
  'azerbaijan': 'f57b5c53033043cca099b5bab3f5f8a4',
  'iraq': 'ff27ab5072064ff3a1ff7ade24895355',
  
  // Lead Lists  
  'scewc2023': '5273c199cca34772b14e0fa78ecd444c',
  'sales-pipeline-active-leads': 'cceb117d634c4299addb6ed70b56b8b5',
  'potential-lead-companies': '2e4f3123364042c0afc7c51a3eb54c4b',
  'mbb-hava-kirliligi-kentsel-doku': '1cffb36e07e7809da5c0f31a9c15b53a',
  'cimento-potansiyel-kurumlar': '302fb36e07e780818707d819bdb15a19',
  
  // Partnership Management
  'partnerships-crm': 'fe81c8ddc27c4e78942d616ca0fd587f',
  'partner-onboarding': 'fae6d9a10faa4bc28a3cff6eeafc3fb4',
  
  // Boards
  'marketing-content-calendar': 'e6e86a6d77ac431891812469ac6a7254',
  'social-media-sharing-calendar': '9042c3094db1472490a88b8bb99fe73e',
  
  // Twitter
  'tweet-akisi': '1e03129dfab1475ea42a6f431545b84d',
  
  // Other
  'sensor-tanitim-paylasim-metni': '15afb36e07e780bd99c7d6cea1986310',

  // Mail Template
  'mail-template': '10c551f878d44433a02b6c6bd0457d2d',
};

// ============= AIRQOON.COM ARTICLE URLS =============
const WEBSITE_URLS = [
  // Key pages
  'https://airqoon.com/about-airqoon/',
  'https://airqoon.com/solutions/lens-platform/',
  'https://airqoon.com/solutions/sensor-unit/unit-l/',
  'https://airqoon.com/solutions/sensor-unit/unit-m/',
  'https://airqoon.com/epic-fund/',
  
  // Sectors
  'https://airqoon.com/sectors/oilgas/',
  'https://airqoon.com/sectors/cement/',
  'https://airqoon.com/sectors/mining/',
  'https://airqoon.com/sectors/aluminum/',
  'https://airqoon.com/sectors/organized-industrial-zones-oiz/',
  'https://airqoon.com/sectors/cities/',
  'https://airqoon.com/sectors/schools-school-playgrounds/',
  'https://airqoon.com/sectors/shopping-mall-play-areas/',
  
  // Use Cases
  'https://airqoon.com/use-cases/perimeter-monitoring-to-assess-the-environmental-impact-of-industrial-facilities/',
  'https://airqoon.com/use-cases/public-information-and-protection-raise-public-awareness/',
  'https://airqoon.com/use-cases/heat-island-effect-measurement/',
  'https://airqoon.com/use-cases/urban-air-pollution-monitoring-networks-expand-spatial-coverage/',
  'https://airqoon.com/use-cases/assessing-the-impact-of-investments-on-green-tech/',
  
  // Articles page 1
  'https://airqoon.com/resources/global-approaches-to-construction-dust-management/',
  'https://airqoon.com/resources/next-generation-air-quality-monitoring-systems/',
  'https://airqoon.com/resources/volcanic-activity-in-santorini-concerns-and-potential-effects/',
  'https://airqoon.com/resources/the-state-of-air-quality-funding/',
  'https://airqoon.com/resources/european-union-and-united-states-update-air-quality-standards/',
  'https://airqoon.com/resources/the-need-of-continuous-emission-monitoring/',
  'https://airqoon.com/resources/record-breaking-high-temperatures-el-nino/',
  'https://airqoon.com/resources/auxiliary-methods-in-reducing-outdoor-air-pollution/',
  'https://airqoon.com/resources/global-inequality-air-pollution-in-africa/',
  'https://airqoon.com/resources/indicative-monitoring-the-use-of-low-cost-sensor-systems/',
  
  // Articles page 2
  'https://airqoon.com/resources/the-effect-of-settlement-and-construction-forms-on-air-pollution/',
  'https://airqoon.com/resources/aluminum-industry-and-environmental-impacts/',
  'https://airqoon.com/resources/articles/greenhouse-gases-and-air-pollution/',
  'https://airqoon.com/resources/articles/implementation-of-carbon-border-adjustment-mechanism-cbam/',
  'https://airqoon.com/resources/what-happened-at-the-much-awaited-cop27-climate-summit/',
  'https://airqoon.com/resources/articles/occupational-health-and-air-pollution/',
  'https://airqoon.com/resources/standardization-efforts-on-low-cost-air-pollution-sensors/',
  'https://airqoon.com/resources/measurable-impact-on-air-pollution-mitigation-strategies/',
  'https://airqoon.com/resources/turkeys-key-strategy-for-green-economy-transformation-carbon-tax/',
  'https://airqoon.com/resources/articles/who-update-on-air-quality-guidelines-after-16-years/',
  
  // Articles page 3
  'https://airqoon.com/resources/industrial-air-pollution-management-in-turkey/',
  'https://airqoon.com/resources/articles/indicator-of-increasing-air-pollution-in-istanbul-smog/',
  'https://airqoon.com/resources/articles/urban-heat-island-effect/',
  'https://airqoon.com/resources/articles/air-quality-management-in-cities/',
  'https://airqoon.com/resources/the-impact-of-the-oil-and-gas-industry-on-air-pollution/',
  'https://airqoon.com/resources/articles/urban-air-pollution-sources-and-pollutants/',
  'https://airqoon.com/resources/measurement-methods-in-monitoring-air-quality/',
  'https://airqoon.com/resources/the-worlds-energy-u-turn-coal/',
  'https://airqoon.com/resources/articles/the-impact-of-the-mining-industry-on-air-pollution/',
  'https://airqoon.com/resources/increasing-demand-for-cement-triggers-air-pollution/',
];

// ============= NOTION HELPERS =============

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
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse: ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getPageTitle(pageId) {
  try {
    const page = await notionRequest(`/pages/${pageId}`);
    if (page.properties) {
      const titleProp = Object.values(page.properties).find(p => p.type === 'title');
      if (titleProp && titleProp.title && titleProp.title.length > 0) {
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
      return ''; // handled by children
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
    default:
      return text ? `${indent}${text}\n\n` : '';
  }
}

async function extractNotionPage(pageId, filename) {
  console.log(`  Extracting: ${filename} (${pageId})`);
  
  try {
    const title = await getPageTitle(pageId);
    const blocks = await getAllBlockChildren(pageId);
    
    let markdown = `---\ntitle: "${title.replace(/"/g, '\\"')}"\nsource: notion\npage_id: ${pageId}\nextracted: ${new Date().toISOString().split('T')[0]}\n---\n\n# ${title}\n\n`;
    
    for (const block of blocks) {
      markdown += blockToMarkdown(block);
      
      // Recursively get children for blocks that have them
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
    
    const filePath = path.join(RAW_NOTION_DIR, `${filename}.md`);
    fs.writeFileSync(filePath, markdown, 'utf-8');
    console.log(`  ✓ Saved: ${filename}.md (${markdown.length} chars)`);
    return { filename, success: true, chars: markdown.length };
  } catch (e) {
    console.error(`  ✗ Failed: ${filename} — ${e.message}`);
    return { filename, success: false, error: e.message };
  }
}

// ============= WEBSITE HELPERS =============

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, { headers: { 'User-Agent': 'AirqoonKB/1.0' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function htmlToMarkdown(html, url) {
  // Remove scripts, styles, nav, footer
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
  html = html.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  html = html.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/ - Airqoon.*$/, '').trim() : '';
  
  // Extract main content area
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                       html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                       html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                       html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  
  let content = articleMatch ? articleMatch[1] : html;
  
  // Convert HTML to markdown
  content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n\n');
  content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n\n');
  content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n\n');
  content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n\n');
  content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
  content = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  content = content.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  content = content.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  content = content.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  content = content.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');
  content = content.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  content = content.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, '![$1]($2)');
  content = content.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
  content = content.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '> $1\n\n');
  content = content.replace(/<br\s*\/?>/gi, '\n');
  content = content.replace(/<hr\s*\/?>/gi, '\n---\n\n');
  
  // Remove remaining HTML tags
  content = content.replace(/<[^>]+>/g, '');
  
  // Decode HTML entities
  content = content.replace(/&amp;/g, '&');
  content = content.replace(/&lt;/g, '<');
  content = content.replace(/&gt;/g, '>');
  content = content.replace(/&quot;/g, '"');
  content = content.replace(/&#39;/g, "'");
  content = content.replace(/&nbsp;/g, ' ');
  content = content.replace(/&#8211;/g, '–');
  content = content.replace(/&#8212;/g, '—');
  content = content.replace(/&#8216;/g, "'");
  content = content.replace(/&#8217;/g, "'");
  content = content.replace(/&#8220;/g, '"');
  content = content.replace(/&#8221;/g, '"');
  
  // Clean up whitespace
  content = content.replace(/\n{3,}/g, '\n\n');
  content = content.trim();
  
  const markdown = `---\ntitle: "${title.replace(/"/g, '\\"')}"\nsource: airqoon.com\nurl: ${url}\nextracted: ${new Date().toISOString().split('T')[0]}\n---\n\n# ${title}\n\n${content}\n`;
  
  return markdown;
}

async function extractWebPage(url) {
  const slug = url.replace(/https?:\/\/airqoon\.com\//, '').replace(/\//g, '-').replace(/-$/, '') || 'homepage';
  const filename = slug.replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-');
  
  console.log(`  Scraping: ${filename}`);
  
  try {
    const html = await fetchUrl(url);
    const markdown = htmlToMarkdown(html, url);
    
    const filePath = path.join(RAW_WEBSITE_DIR, `${filename}.md`);
    fs.writeFileSync(filePath, markdown, 'utf-8');
    console.log(`  ✓ Saved: ${filename}.md (${markdown.length} chars)`);
    return { filename, success: true, chars: markdown.length };
  } catch (e) {
    console.error(`  ✗ Failed: ${filename} — ${e.message}`);
    return { filename, success: false, error: e.message };
  }
}

// ============= MAIN =============

async function main() {
  console.log('=== Airqoon Knowledge Base — Source Extraction ===\n');
  
  // --- Extract Notion pages ---
  if (!NOTION_API_KEY) {
    console.log('⚠️  NOTION_API_KEY not set. Skipping Notion extraction.');
    console.log('   Set it with: $env:NOTION_API_KEY="ntn_..."');
  } else {
    console.log(`📋 Extracting ${Object.keys(NOTION_PAGES).length} Notion pages...\n`);
    
    const notionResults = [];
    const entries = Object.entries(NOTION_PAGES);
    
    // Process in batches of 3 to avoid rate limits
    for (let i = 0; i < entries.length; i += 3) {
      const batch = entries.slice(i, i + 3);
      const promises = batch.map(([filename, pageId]) => extractNotionPage(pageId, filename));
      const results = await Promise.all(promises);
      notionResults.push(...results);
      
      // Small delay between batches
      if (i + 3 < entries.length) {
        await new Promise(r => setTimeout(r, 500));
      }
    }
    
    const notionSuccess = notionResults.filter(r => r.success).length;
    const notionFailed = notionResults.filter(r => !r.success);
    console.log(`\n📋 Notion: ${notionSuccess}/${notionResults.length} pages extracted`);
    if (notionFailed.length > 0) {
      console.log('   Failed:');
      notionFailed.forEach(r => console.log(`   - ${r.filename}: ${r.error}`));
    }
  }
  
  // --- Scrape website pages ---
  console.log(`\n🌐 Scraping ${WEBSITE_URLS.length} airqoon.com pages...\n`);
  
  const webResults = [];
  // Process in batches of 5
  for (let i = 0; i < WEBSITE_URLS.length; i += 5) {
    const batch = WEBSITE_URLS.slice(i, i + 5);
    const promises = batch.map(url => extractWebPage(url));
    const results = await Promise.all(promises);
    webResults.push(...results);
    
    if (i + 5 < WEBSITE_URLS.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  const webSuccess = webResults.filter(r => r.success).length;
  const webFailed = webResults.filter(r => !r.success);
  console.log(`\n🌐 Website: ${webSuccess}/${webResults.length} pages scraped`);
  if (webFailed.length > 0) {
    console.log('   Failed:');
    webFailed.forEach(r => console.log(`   - ${r.filename}: ${r.error}`));
  }
  
  console.log('\n=== Extraction complete ===');
}

main().catch(console.error);
