export default () => ({
    port: parseInt(process.env.DB_PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        driver: "mysql",
        charset: "utf8mb4",
        collation: "utf8mb4_unicode_ci",
        prefix: "",
        prefix_indexes: true,
        strict: true,
        engine: null
    }
});