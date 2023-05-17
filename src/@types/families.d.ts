import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Family {
    id: number;
    name: string;
    slug: string;
    entry?: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    families: Family;
    families_composite: Knex.CompositeTableType<
      Family,
      Pick<Family, 'name' | 'slug'> & Partial<Pick<Family, 'created_at' | 'updated_at'>>,
      Partial<Omit<Family, 'id'>>
    >;
  }
}
