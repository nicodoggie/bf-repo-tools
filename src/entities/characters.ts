import knex from "../lib/knex.js";
import slugify from "../lib/slugify.js";

export type CharacterFrontmatter = {
  title: string;
  slug?: string;
  extra: {
    age?: number;
    sex?: string;
    pronouns?: string;
    date_of_birth?: string;
    date_of_death?: string;
    mortality_status?: ['Alive', 'Dead', 'Unknown', 'Undead'];
    ddb?: string;
    married?: {
      to?: string;
      on?: string;
    }
  };
  taxonomies: {
    character_id: string[];
    family_id: string[];
    organization_type?: string[];
  };
}

export function create(title: string) {
  return {
    dir: 'characters',
    data: {
      title,
      extra: {
        age: 0,
        sex: '',
        pronouns: '',
        date_of_birth: '',
        date_of_death: '',
        mortality_status: "Dead|Alive|Unknown|Undead",
        ddb: '',
        married: {
          to: '',
          on: '',
        }
      }
    }
  }
}


export default async () => {
  const chars = await knex('characters')
    .select('*');

  return chars.map((char) => {
    const frontmatter = <CharacterFrontmatter>{
      title: char.name,
      slug: slugify(char.name),
      extra: {
        age: char.age || 0,
        sex: char.sex || '',
        pronouns: char.pronouns || '',
      },
      taxonomies: {
        character_id: [char.id.toString()],
      }
    };

    if (char.family_id) {
      frontmatter.taxonomies['family_id'] = [char.family_id.toString()];
    }

    return {
      frontmatter,
      html: char.entry ?? ''
    };
  });
}