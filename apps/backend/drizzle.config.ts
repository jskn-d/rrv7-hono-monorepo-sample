import {Config} from 'drizzle-kit';

export default {
    out: './src/migrations',
    schema: './src/database/schema.ts',
    dialect: 'sqlite',
    driver: 'd1-http',
    // dbCredentials: {
    //     accountId: env<{ CLOUDFLARE_ACCOUNT_ID: string }>(Context),
    //     // databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    //     // token: process.env.CLOUDFLARE_D1_TOKEN!,
    // },
} satisfies Config;
