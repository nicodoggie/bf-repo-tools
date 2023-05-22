import { Command } from "commander";
import markdown from "../lib/markdown.ts";
import { writeFile } from "fs/promises";

const migrate = new Command('migrate');
migrate
  .argument("<type>", "Type of entity to migrate")
  .argument("<target>", "Target direction to output the ts.")
  .description('Migrates kanka database entities into .md files with frontmatter compatible with Zola.')
  .action(async (type, target) => {
    const entity = await import(`./entities/${type}.js`)

    const entities = <Array<any>>await entity.default(target);
    Promise.all(entities.map(async (item) => {
      const { frontmatter, html } = item;
      const data = markdown(frontmatter, html);
      await writeFile(`${target}/${frontmatter.slug}.md`, data);
    }));
  });

export default migrate;