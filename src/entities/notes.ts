import { Note } from "knex/types/tables";
import knex from "../lib/knex";

export default async () => {
  const orgs = await knex<Note>('notes')
    .select('*');
}