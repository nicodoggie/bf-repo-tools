import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

export type LocationFrontmatter = {
  title: string;
  slug: string;
  location_id: string;
  taxonomies: {
    location_class?: Array<string>;
    parent_location_id?: Array<string>;
  };
}

export default async () => {
  const locations = await knex('locations')
    .select('*');
  return locations.map((location) => {
    const frontmatter = <LocationFrontmatter>{
      title: location.name,
      slug: slugify(location.name),
      location_id: location.id.toString(),
      taxonomies: {}
    };

    if (location.type) {
      frontmatter.taxonomies['location_class'] = [location.type.toLowerCase()];
    }
    if (location.parent_location_id) {
      frontmatter.taxonomies['parent_location_id'] = [location.parent_location_id.toString()];
    }

    return {
      frontmatter,
      html: location.entry ?? ''
    };
  })
}