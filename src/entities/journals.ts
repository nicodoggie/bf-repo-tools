import knex from "../lib/knex.js";
import slugify from "../lib/slugify.ts";

type JournalFrontmatter = {
  title: string;
  slug: string;
  ingame_date: string;
  journal_id: string;
  taxonomies: {
    journal_type?: string[];
    character_id?: string[];
    location_id?: string[];
  };
}

export default async () => {
  const journals = await knex('journals')
    .select('*');

  return journals.map((journal) => {
    const frontmatter = <JournalFrontmatter>{
      title: journal.name,
      slug: slugify(journal.name),
      journal_id: journal.id.toString(),
      taxonomies: {}
    };

    if (journal.calendar_year && journal.calendar_month && journal.calendar_day) {
      frontmatter.ingame_date = `${journal.calendar_year}-${journal.calendar_month}-${journal.calendar_day}`;
    } else {
      frontmatter.ingame_date = '';
    }

    if (journal.type) {
      frontmatter.taxonomies['journal_type'] = [journal.type.toLowerCase()];
    }
    if (journal.character_id) {
      frontmatter.taxonomies['character_id'] = [journal.character_id.toString()];
    }
    if (journal.location_id) {
      frontmatter.taxonomies['location_id'] = [journal.location_id.toString()];
    }

    return {
      frontmatter,
      html: journal.entry ?? ''
    };
  })
}