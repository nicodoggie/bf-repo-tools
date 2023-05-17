import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Journal {
    id: number;
    name: string;
    slug: string;
    type?: string;
    entry?: string;
    calendar_year?: string;
    calendar_month?: string;
    calendar_day?: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    journals: Journal;
    journals_composite: Knex.CompositeTableType<
      Journal,
      Pick<Journal, 'name' | 'slug'> & Partial<Pick<Journal, 'created_at' | 'updated_at'>>,
      Partial<Omit<Journal, 'id'>>
    >;
  }
}
