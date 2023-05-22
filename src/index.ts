import { Command } from "commander";
import migrate from "./commands/migrate.ts";
import transformFrontmatter from "./commands/transform-frontmatter.ts";

const app = new Command('repo-tools');


async function main() {
  app.addCommand(migrate);
  app.addCommand(transformFrontmatter);

  await app.parseAsync();
}

main().then(() => {
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(e.code)
});
