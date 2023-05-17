import { Event } from "knex/types/tables";
import knex from "../lib/knex";

export default async () => {
  const orgs = await knex<Event>('events')
    .select('*');
}