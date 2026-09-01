import crypto from 'crypto';

export interface ScrapeRequest {
  url: string;
  render_js?: boolean;
  extract_tables?: boolean;
  include_links?: boolean;
  max_length?: number;
  user_agent_profile?: 'stealth_chrome' | 'bot_curl' | 'googlebot';
}

export interface ScrapedTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ScrapeResponse {
  url: string;
  canonical_url: string;
  title: string;
  description: string;
  markdown: string;
  text_content: string;
  metadata: {
    author?: string;
    published_time?: string;
    site_name?: string;
    word_count: number;
    estimated_read_minutes: number;
    language: string;
    status_code: number;
    content_type: string;
  };
  tables: ScrapedTable[];
  links: Array<{ text: string; href: string }>;
  fetched_at: string;
  latency_ms: number;
}

// User-Agent Stealth Profiles
const UA_PROFILES = {
  stealth_chrome: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  bot_curl: 'curl/8.4.0',
  googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
};

/**
 * Converts raw HTML into clean, LLM-ready structured Markdown
 */
function htmlToCleanMarkdown(html: string): { markdown: string; title: string; description: string; tables: ScrapedTable[]; links: Array<{ text: string; href: string }> } {
  let processed = html;

  // Extract Page Title
  let title = '';
  const titleMatch = processed.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // Extract Meta Description
  let description = '';
  const descMatch = processed.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                    processed.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  if (descMatch) {
    description = descMatch[1].trim();
  }

  // Extract Canonical URL
  const canonicalMatch = processed.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  
  // Extract Structured Tables before stripping
  const tables: ScrapedTable[] = [];
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let tMatch;
  while ((tMatch = tableRegex.exec(processed)) !== null) {
    const tableHtml = tMatch[1];
    const headers: string[] = [];
    const rows: string[][] = [];

    // Extract th
    const thRegex = /<th[^>]*>([\s\S]*?)<\/th>/gi;
    let thMatch;
    while ((thMatch = thRegex.exec(tableHtml)) !== null) {
      headers.push(thMatch[1].replace(/<[^>]+>/g, '').trim());
    }

    // Extract tr -> td
    const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let trMatch;
    while ((trMatch = trRegex.exec(tableHtml)) !== null) {
      const rowHtml = trMatch[1];
      const rowCols: string[] = [];
      const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
      let tdMatch;
      while ((tdMatch = tdRegex.exec(rowHtml)) !== null) {
        rowCols.push(tdMatch[1].replace(/<[^>]+>/g, '').trim());
      }
      if (rowCols.length > 0) {
        rows.push(rowCols);
      }
    }

    if (headers.length > 0 || rows.length > 0) {
      tables.push({ headers, rows });
    }
  }

  // Extract Links
  const links: Array<{ text: string; href: string }> = [];
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let aMatch;
  while ((aMatch = linkRegex.exec(processed)) !== null) {
    const href = aMatch[1];
    const text = aMatch[2].replace(/<[^>]+>/g, '').trim();
    if (href && text && !href.startsWith('javascript:') && !href.startsWith('#')) {
      links.push({ text, href });
    }
  }

  // Strip Scripts, Styles, Navbars, Headers, Footers, SVGs, Iframes, Ads
  processed = processed
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '')
    .replace(/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/gi, '')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Convert headings
  processed = processed
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n')
    .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n\n##### $1\n\n')
    .replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n\n###### $1\n\n');

  // Convert lists
  processed = processed
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n');

  // Convert paragraphs and line breaks
  processed = processed
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<hr\s*[\/]?>/gi, '\n\n---\n\n');

  // Convert code blocks and inline code
  processed = processed
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '\n\n```\n$1\n```\n\n')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');

  // Convert bold and italic
  processed = processed
    .replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**')
    .replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, '*$1*');

  // Convert blockquotes
  processed = processed.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '\n\n> $1\n\n');

  // Strip remaining HTML tags
  processed = processed.replace(/<[^>]+>/g, ' ');

  // Decode common HTML entities
  processed = processed
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

  // Clean up excess whitespace
  const lines = processed.split('\n').map(l => l.trim()).filter((l, i, arr) => {
    if (l === '' && arr[i - 1] === '') return false;
    return true;
  });

  const markdown = lines.join('\n').trim();

  return { markdown, title, description, tables, links };
}

/**
 * Executes Anti-Shield Web Scraping & Clean Markdown Extraction
 */
export async function scrapeWebPage(req: ScrapeRequest): Promise<ScrapeResponse> {
  const startTime = Date.now();
  const targetUrl = req.url;

  // Basic URL Validation
  try {
    const parsed = new URL(targetUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error(`Invalid protocol ${parsed.protocol}. Only HTTP and HTTPS are supported.`);
    }
  } catch (e: any) {
    throw new Error(`Malformed target URL: ${e.message}`);
  }

  const selectedUa = UA_PROFILES[req.user_agent_profile || 'stealth_chrome'];

  const stealthHeaders: Record<string, string> = {
    'User-Agent': selectedUa,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"macOS"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1'
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: stealthHeaders,
      signal: controller.signal,
      redirect: 'follow'
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type') || '';
    const rawHtml = await response.text();

    const { markdown, title, description, tables, links } = htmlToCleanMarkdown(rawHtml);
    const words = markdown.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const estimatedReadMinutes = Math.max(1, Math.ceil(wordCount / 200));

    // Limit markdown length if requested
    const finalMarkdown = req.max_length ? markdown.slice(0, req.max_length) : markdown;
    const plainText = finalMarkdown.replace(/[#*`_\[\]()]/g, ' ').replace(/\s+/g, ' ').trim();

    return {
      url: targetUrl,
      canonical_url: targetUrl,
      title: title || targetUrl,
      description: description || `Extracted clean markdown content from ${targetUrl}`,
      markdown: finalMarkdown,
      text_content: plainText.slice(0, 1000),
      metadata: {
        word_count: wordCount,
        estimated_read_minutes: estimatedReadMinutes,
        language: 'en',
        status_code: response.status,
        content_type: contentType
      },
      tables: req.extract_tables !== false ? tables : [],
      links: req.include_links ? links.slice(0, 50) : [],
      fetched_at: new Date().toISOString(),
      latency_ms: Date.now() - startTime
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    const isAbort = err.name === 'AbortError';
    throw new Error(isAbort ? `Web scraper timed out while fetching ${targetUrl}` : `Web scraper failure: ${err.message}`);
  }
}
