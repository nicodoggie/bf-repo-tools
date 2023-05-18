import knex from "../lib/knex.js";
import slugify from "../lib/slugify.ts";

type CharacterFrontmatter = {
  title: string;
  slug: string;
  age: number;
  sex: string;
  pronouns: string;
  character_id: string;
  taxonomies: {
    family_id: string[];
    organization_type?: string[];
  };
}

export default async () => {
  const chars = await knex('characters')
    .select('*');

  return chars.map((char) => {
    const frontmatter = <CharacterFrontmatter>{
      title: char.name,
      slug: slugify(char.name),
      age: char.age || 0,
      sex: char.sex || '',
      pronouns: char.pronouns || '',
      character_id: char.id.toString(),
      taxonomies: {}
    };

    if (char.family_id) {
      frontmatter.taxonomies['family_id'] = [char.family_id.toString()];
    }

    return {
      frontmatter,
      html: char.entry ?? ''
    };
  });
}