import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'dummy',
    dataApiUrl: 'http://localhost:3000/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/shareameal',
    RCMND_NEO4J_DB_HOST: '0d7b95a5.databases.neo4j.io',
    RCMND_NEO4J_DB_PORT: 7687,
    RCMND_NEO4J_DB_USER: 'neo4j',
    RCMND_NEO4J_DB_PASSWORD: 'NWI9GV2f9a5mHtfFiZFoAuLG--ofDQCddlYoyrn79v4'
};
