import knex from "../lib/knex.js";
import slugify from "../lib/slugify.ts";

type FamilyFrontmatter = {
  title: string;
  slug: string;
  family_id: string;
  taxonomies: {
    family_location_id?: string[];
    parent_family_id?: string[];
  };
}

export default async () => {
  const families = await knex('families')
    .select('*');

  return families.map((family) => {
    const frontmatter = <FamilyFrontmatter>{
      title: family.name,
      slug: slugify(family.name),
      family_id: family.id.toString(),
      taxonomies: {}
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