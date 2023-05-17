import knex from 'knex';
import { mysql as mysqlConfig } from '../config.js';

export default knex.knex({
  client: 'mysql2',
  connection: mysqlConfig,
})