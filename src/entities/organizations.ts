import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

type OrganizationFrontmatter = {
  title: string;
  slug: string;
  organization_id: string[];
  taxonomies: {
    organization_type?: string[];
  };
}

export default async (targetDir: string) => {

  const orgs = await knex('organisations')
    .select('*');

  return orgs.map((org) => {
    const frontmatter = <OrganizationFrontmatter>{
      title: org.name,
      slug: slugify(org.name),
      organization_id: [org.id.toString()],
      taxonomies: {}
    };

    if (org.type) {
      frontmatter.taxonomies['organization_type'] = [org.type];
    }

    return {
      frontmatter,
      html: org.entry ?? ''
    };
  })
}