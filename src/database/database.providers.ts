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
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });
            // try {
            //     if (!dataSource.isInitialized) {
            //         await dataSource.initialize();
            //     }
            // } catch (error) {
            //     console.error(error?.message);
            // }
            // return dataSource;

            return dataSource.initialize();
        },
    },
];