import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Character {
    id: number;
    name: string;
    slug: string;
    age?: string;
    sex?: string;
    entry?: string;
    pronouns?: string;
    title?: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    characters: Character;
    characters_composite: Knex.CompositeTableType<
      Character,
      Pick<Character, 'name' | 'slug'> & Partial<Pick<Character, 'created_at' | 'updated_at'>>,
      Partial<Omit<Character, 'id'>>
    >;
  }
}
