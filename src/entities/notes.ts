import knex from "../lib/knex.js";
import slugify from "../lib/slugify.ts";

type NoteFrontmatter = {
  title: string;
  slug: string;
  note_id: string;
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