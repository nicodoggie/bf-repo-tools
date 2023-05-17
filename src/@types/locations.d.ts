import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Location {
    id: number;
    name: string;
    slug: string;
    type?: string;
    entry?: string;
    parent_location_id?: number;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    locations: Location;
    location_composite: Knex.CompositeTableType<
      Location,
      Pick<Location, 'name' | 'slug'> & Partial<Pick<Location, 'created_at' | 'updated_at'>>,
      Partial<Omit<Location, 'id'>>
    >;
  }
}
