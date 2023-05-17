import knex from "../lib/knex.js";

export default async () => {
  const orgs = await knex('characters')
    .select('*');
}