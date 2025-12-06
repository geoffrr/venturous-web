import { slug } from "github-slugger";
import { marked } from "marked";

// slugify
export const slugify = (content: string | undefined | null) => {
  if (!content) return "";
  return slug(content);
};

// markdownify
export const markdownify = (content: string, div?: boolean) => {
  return div ? marked.parse(content) : marked.parseInline(content);
};

// Escape HTML entities
const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// markdownify with gradient support for ***text*** patterns
export const markdownifyWithGradient = (content: string, div?: boolean) => {
  // Find all ***text*** patterns and replace with HTML spans directly
  // Markdown will preserve raw HTML, so we can insert it before processing
  const gradientPattern = /\*\*\*([^*]+)\*\*\*/g;

  const processedContent = content.replace(gradientPattern, (match, text) => {
    const escapedText = escapeHtml(text.trim());
    return `<span class="gradient-text">${escapedText}</span>`;
  });

  // Convert markdown to HTML (the HTML spans will be preserved)
  return div
    ? marked.parse(processedContent)
    : marked.parseInline(processedContent);
};

// humanize
export const humanize = (content: string | undefined | null) => {
  if (!content) return "";
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/[-\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content: string) => {
  const parseMarkdown: any = marked.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string) => {
  const entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  const htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};
