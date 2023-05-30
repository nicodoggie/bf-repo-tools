import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

export type EventFrontmatter = {
  title: string;
  slug?: string;
  extra: {
    date_started?: string;
    date_ended?: string;

  }
  taxonomies: {
    event_id?: string[];
    event_type?: string[];
    parent_event_id?: string[];
  };
}

export function create(title: string) {
  return {
    dir: 'events',
    data: <EventFrontmatter>{
      title,
      extra: {
        date_started: "",
        date_ended: "",
      },
      taxonomies: {
        event_type: [],
      }
    }
  }
}

export default async () => {
  const events = await knex('events')
    .select('*');

  return events.map((event) => {
    const frontmatter = <EventFrontmatter>{
      title: event.name,
      slug: slugify(event.name),
      extra: {
        date_started: event.date ?? '',
      },
      taxonomies: {
        event_id: [event.id.toString()]
      }
    };

    if (event.type) {
      frontmatter.taxonomies['event_type'] = [event.type];
    }

    if (event.event_id) {
      frontmatter.taxonomies['parent_event_id'] = [event.type];
    }

    return {
      frontmatter,
      html: event.entry ?? ''
    };
  })
}