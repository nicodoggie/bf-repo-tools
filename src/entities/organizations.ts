import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

export type OrganizationFrontmatter = {
  title: string;
  slug?: string;
  extra: {
    date_established?: string;
    date_dissolved?: string;
  };
  taxonomies: {
    organization_id?: string[];
    leaders?: string[];
    organization_type?: string[];
  };
}

export function create(title: string) {
  const slug = slugify(title);

  return {
    dir: 'organizations',
    data: <OrganizationFrontmatter>{
      title,
      extra: {},
      taxonomies: {
        leaders: [],
        organization_type: [],
      },
    }
  }
}

export default async (targetDir: string) => {

  const orgs = await knex('organisations')
    .select('*');

  return orgs.map((org) => {
    const frontmatter = <OrganizationFrontmatter>{
      title: org.name,
      slug: slugify(org.name),
      taxonomies: {
        organization_id: [org.id.toString()],
      }
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