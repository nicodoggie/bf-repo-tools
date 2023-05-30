import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

export type EventFrontmatter = {
  title: string;
  slug: string;
  ingame_date: string;
  event_id: string;
  taxonomies: {
    event_type?: string[];
    parent_event_id?: string[];
  };
}

export default async () => {
  const events = await knex('events')
    .select('*');

  return events.map((event) => {
    const frontmatter = <EventFrontmatter>{
      title: event.name,
      slug: slugify(event.name),
      ingame_date: event.date ?? '',
      event_id: event.id.toString(),
      taxonomies: {}
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