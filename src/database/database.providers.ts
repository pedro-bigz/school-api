import { DataSource } from 'typeorm';

// Temporario. Posteriormente passaremos a utilizar @nestjs/config (dotenv)
export const databaseProviders = [
    {
        provide: 'MYSQL_CONNECTION',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'didatikos',
                password: 'Didatikos@1010',
                database: 'school',
                entities: [
                    '@app/**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];