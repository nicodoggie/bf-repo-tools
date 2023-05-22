import { Command } from "commander";
import { readdir, writeFile } from "fs/promises";
import * as lodash from "lodash-es";
import frontmatter, { options } from "../lib/frontmatter.ts";
import Bluebird from "bluebird";
import matter from "gray-matter";

const transformFrontmatter = new Command('transform');

transformFrontmatter
  .argument('<srcKey>')
  .argument('<targetKey>')
  .argument('<dir>')
  .argument('<targetdir>')
  .action(async (srcKey: string, targetKey: string, dir: string, targetdir: string) => {
    const files = <string[]>(await readdir(dir)).filter((file): boolean => file !== '_index.md');;
    const data = await Bluebird.map(files, async file => {
      const filename = `${dir}/${file}`
      const targetname = `${targetdir}/${file}`
      const item = await frontmatter(filename);
      const fetchedValue = lodash.get(item.data, srcKey);
      const movedValue = lodash.set(item.data, targetKey, [fetchedValue]);
      lodash.unset(item.data, srcKey);
      const rewritten = matter.stringify(item.content, item.data, options);

      await writeFile(targetname, rewritten);
    });
  });

export default transformFrontmatter;