import { Command } from "commander";
import markdown from "./lib/markdown.js";
import { writeFileSync } from "fs";

const app = new Command('db2md');

async function main() {
  app
    .command('migrate')
    .argument("<type>", "Type of entity to migrate")
    .argument("<target>", "Target direction to output the ts.")
    .description('Execute migration')
    .action(async (type, target) => {

      const entity = await import(`./entities/${type}.js`)

      const entities = <Array<any>>await entity.default(target);
      entities.forEach((item) => {
        const { frontmatter, html } = item;
        const data = markdown(frontmatter, html);
        writeFileSync(`${target}/${frontmatter.slug}.md`, data);
      });
    });

  await app.parseAsync();
}

main().then(() => {
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(e.code)
});
