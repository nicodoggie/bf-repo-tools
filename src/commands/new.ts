import { Command } from "commander";
import * as frontmatter from "../lib/frontmatter.js";
import matter from "gray-matter";
import { OrganizationFrontmatter } from "../entities/organizations.js";
import slugify from "../lib/slugify.js";
import { writeFileSync } from "fs";
import path from "path";

const entityMap = {
  org: "organizations",
  loc: "locations",
  fam: 'families',
  cha: 'characters',
  evt: 'events',
} as { [key: string]: string }

const newFile = new Command('new');
newFile
  .argument('<type>')
  .argument('<title>')
  .option('-o, --outDir <outDir>', "target output directory", "content")
  .action(async (type: string, title: string, options: any) => {
    let slug = slugify(title);
    let entity = `../entities/${type}.js`;
    if (type in entityMap) {
      entity = `../entities/${entityMap[type]}.js`;
    }
    const mod = await import(entity);
    const { dir, data } = mod.create(title);

    const content = matter.stringify("", data, frontmatter.options);

    writeFileSync(path.resolve(process.cwd(), options.outDir, dir, slug + ".md"), content);
  });

export default newFile;