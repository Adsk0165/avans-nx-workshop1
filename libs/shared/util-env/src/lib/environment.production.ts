import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nxworkshop.azurewebsites.net',
    dataApiUrl: 'https://dataappvoorindv-ajaqfmdzdwbbawf4.westeurope-01.azurewebsites.net/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://gamewatch123:wFg0OB1bINwjrsnJ@cluster0.ppnjhh5.mongodb.net/indvprojectclientside?retryWrites=true&w=majority&appName=Cluster0',

    RCMND_NEO4J_DB_HOST: '0d7b95a5.databases.neo4j.io',
    RCMND_NEO4J_DB_PORT: 7687,
    RCMND_NEO4J_DB_USER: 'neo4j',
    RCMND_NEO4J_DB_PASSWORD: 'NWI9GV2f9a5mHtfFiZFoAuLG--ofDQCddlYoyrn79v4'
};
