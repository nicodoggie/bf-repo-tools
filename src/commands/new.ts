import { Command } from "commander";
import * as frontmatter from "../lib/frontmatter.js";
import matter from "gray-matter";
import { OrganizationFrontmatter } from "../entities/organizations.js";
import slugify from "../lib/slugify.js";
import { writeFileSync } from "fs";
import path from "path";

const newFile = new Command('new');
newFile
  .argument('<type>')
  .argument('<title>')
  .action(async (type: string, title: string) => {
    let data = {};
    let dir = '';
    let slug = slugify(title);
    switch (type.trim().toLowerCase()) {
      case "organization":
      case "org":
        dir = 'organizations';
        data = <OrganizationFrontmatter>{
          title,
          slug,
          extra: {},
          taxonomies: {
            leaders: [],
            organization_type: [],
          },
        }
        break;
    }
    const content = matter.stringify("", data, frontmatter.options);

    writeFileSync(path.resolve(process.cwd(), 'content', dir, slug + ".md"), content);
  });

export default newFile;