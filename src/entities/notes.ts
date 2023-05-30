import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

export type NoteFrontmatter = {
  title: string;
  slug?: string;
  extra: {
    date?: string;
    ingame_date?: string;
  };
  taxonomies: {
    type?: ["note"]
    note_id?: string[];
  }

}

export function create(title: string) {
  const slug = slugify(title);

  return {
    dir: 'misc',
    data: <NoteFrontmatter>{
      title,
      extra: {
        date: '',
        ingame_date: '',
      },
      taxonomies: {
        type: ["note"],
      },
    }
  }
}

export default async () => {
  const notes = await knex('notes')
    .select('*');

  return notes.map((note) => {
    const frontmatter = <NoteFrontmatter>{
      title: note.name,
      slug: slugify(note.name),
    };

    return {
      frontmatter,
      html: note.entry ?? ''
    };
  })
}