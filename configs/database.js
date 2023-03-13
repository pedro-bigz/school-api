export default () => ({
    database: {
        conn: process.env.DB_CONNECTION,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 3306 // 5432
    }
});
