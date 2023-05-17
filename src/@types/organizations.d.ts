import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Organization {
    id: number;
    name: string;
    slug: string;
    type: string;
    entry: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    organisations: Organization;
    organisations_composite: Knex.CompositeTableType<
      Organization,
      Pick<Organization, 'name' | 'slug'> & Partial<Pick<Organization, 'created_at' | 'updated_at'>>,
      Partial<Omit<Organization, 'id'>>
    >;
  }
}
