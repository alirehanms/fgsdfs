import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 2400,
  username: 'postgres',
  password: '6777622',
  database: 'User',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migration_table',

  logging: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

//Comand of new migration creation
//typeorm  migration:create -- db/migrations/PostRefactoring
//add these lines in pakage.json
//      "typeorm":"npm run build && npx typeorm -d dist/db/data-source.js",
//     "migration:create":"npm run typeorm -- migration:create",
//     "migration:run":"npm run typeorm -- migration:run",
//     "migration:revert":"npm run typeorm -- migration:revert
