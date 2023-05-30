import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

export type JournalFrontmatter = {
  title: string;
  slug?: string;
  extra: {
    date?: string;
    ingame_date?: string;
  },
  taxonomies: {
    type: ["journal"];
    journal_type: string[];
    journal_id: string[];
    character_id?: string[];
    location_id?: string[];
  };
}

export function create(title: string) {
  const slug = slugify(title);

  return {
    dir: 'misc',
    data: <JournalFrontmatter>{
      title,
      extra: {
        date: '',
        ingame_date: '',
      },
      taxonomies: {
        type: ["journal"],
      },
    }
  }
}

export default async () => {
  const journals = await knex('journals')
    .select('*');

  return journals.map((journal) => {
    const frontmatter = <JournalFrontmatter>{
      title: journal.name,
      slug: slugify(journal.name),
      extra: {},
      taxonomies: {
        journal_id: [journal.id.toString()],
      }
    };

    if (journal.calendar_year && journal.calendar_month && journal.calendar_day) {
      frontmatter.extra.ingame_date = `${journal.calendar_year}-${journal.calendar_month}-${journal.calendar_day}`;
    } else {
      frontmatter.extra.ingame_date = '';
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