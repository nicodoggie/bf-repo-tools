import knex from "../lib/knex";

export default async () => {
  const orgs = await knex('characters')
    .select('*');
}