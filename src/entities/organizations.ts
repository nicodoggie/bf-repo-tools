import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

type OrganizationFrontmatter = {
  title: string;
  slug: string;
  taxonomy: {
    organization_id: string;
    organization_type?: string;
  };
}

export default async (targetDir: string) => {

  const orgs = await knex('organisations')
    .select('*');

  return orgs.map((org) => {
    const frontmatter = <OrganizationFrontmatter>{
      title: org.name,
      slug: slugify(org.name),
      taxonomy: {
        organization_id: org.id.toString(),
      }
    };

    if (org.type) {
      frontmatter.taxonomy['organization_type'] = org.type;
    }

    return {
      frontmatter,
      html: org.entry ?? ''
    };
  })
}