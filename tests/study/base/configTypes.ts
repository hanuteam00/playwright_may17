import { Browser, Page } from "playwright";
import dotenv from 'dotenv';

import fs from 'fs';
// import toml from 'toml';
// const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));

dotenv.config();

declare global {
    const page: Page;
    const browser: Browser;
    const browserName: string;
}

export default {
    // DIGITAL_OCEAN_URL: config.digital_ocean_url ?? '',
    DEV_URL: process.env.DEV_URL ?? '',
    HOTFIX_URL: process.env.HOTFIX_URL ?? '',
    EXP_URL: process.env.EXP_URL ?? '',
    POC_URL: process.env.POC_URL ?? '',
    PRODUCTION_URL: process.env.PRODUCTION_URL ?? '',
    BASE_URL: process.env.BASE_URL ?? '',
    API_KEY: process.env.API_KEY ?? '',
    DB_HOST: process.env.DB_HOST ?? '',
    DB_USER: process.env.DB_USER ?? '',
    DB_PASS: process.env.DB_PASS ?? '',
};