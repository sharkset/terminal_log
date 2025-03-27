import { Pool } from 'pg';

export const pgPool = new Pool({
    user: process.env.DBuser,
    host: process.env.DBhost,
    database: process.env.DBdatabase,
    password: process.env.DBpassword,
    port: 16751,
    ssl: {
        rejectUnauthorized: false
    },
    max: 5,              // número máximo de conexões simultâneas
    idleTimeoutMillis: 500000, // fecha conexões ociosas após 30s
    connectionTimeoutMillis: 10000 // timeout para nova conexão
});
//