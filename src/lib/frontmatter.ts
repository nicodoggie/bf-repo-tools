import { readFile } from "fs/promises";
import matter, { } from "gray-matter";
import json2toml from "json2toml";
import * as TOML from 'smol-toml';

export const options = {
  delimiters: '+++',
  language: 'toml',
  engines: {
    toml: {
      parse: (data: string) => {
        return TOML.parse(data)
      },
      stringify: (data: any) => {
        return json2toml(data);
      }
    }
  }
};

export default async (file: string) => {
  const content = await readFile(file);
  return matter(content, options);
};