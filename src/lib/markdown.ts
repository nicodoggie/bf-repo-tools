import TurndownService from "turndown";
import json2toml from "json2toml";

const turndown = new TurndownService();

export default function (frontmatterObject: Object, content: string) {
  const markdown = turndown.turndown(content);
  const frontmatter = json2toml(frontmatterObject)

  return `+++\n${frontmatter}\n+++\n\n${markdown}\n`;
}