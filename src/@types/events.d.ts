import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Event {
    id: number;
    name: string;
    slug: string;
    type?: string;
    date?: string;
    entry?: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    events: Event;
    events_composite: Knex.CompositeTableType<
      Event,
      Pick<Event, 'name' | 'slug'> & Partial<Pick<Event, 'created_at' | 'updated_at'>>,
      Partial<Omit<Event, 'id'>>
    >;
  }
}
