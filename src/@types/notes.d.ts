import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Note {
    id: number;
    name: string;
    slug: string;
    type?: string;
    entry?: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    notes: Note;
    notes_composite: Knex.CompositeTableType<
      Note,
      Pick<Note, 'name' | 'slug'> & Partial<Pick<Note, 'created_at' | 'updated_at'>>,
      Partial<Omit<Note, 'id'>>
    >;
  }
}
