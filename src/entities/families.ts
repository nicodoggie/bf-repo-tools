import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

type FamilyFrontmatter = {
  title: string;
  slug?: string;

  taxonomies: {
    family_id?: string[];
    family_location_id?: string[];
    parent_family_id?: string[];
  };
}

export function create(title: string) {
  return {
    dir: 'families',
    data: <FamilyFrontmatter>{
      title,
      taxonomies: {}
    }
  }
}

export default async () => {
  const families = await knex('families')
    .select('*');

  return families.map((family) => {
    const frontmatter = <FamilyFrontmatter>{
      title: family.name,
      slug: slugify(family.name),
      taxonomies: {
        family_id: [family.id.toString()],
      }
    };

    if (family.location_id) {
      frontmatter.taxonomies['family_location_id'] = [family.location_id.toString()];
    }

    if (family.family_id) {
      frontmatter.taxonomies['parent_family_id'] = [family.family_id];
    }

    return {
      frontmatter,
      html: family.entry ?? ''
    };
  })
}