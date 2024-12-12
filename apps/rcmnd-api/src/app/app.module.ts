import { Neo4jBackendModule } from '@avans-nx-workshop/backend/neo4j';
import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j/dist';
import {environment} from '@avans-nx-workshop/shared/util-env'

@Module({
    imports: [
        Neo4jModule.forRoot({
            scheme: 'neo4j+s',
            host: environment.RCMND_NEO4J_DB_HOST,
            port: environment.RCMND_NEO4J_DB_PORT,
            username: environment.RCMND_NEO4J_DB_USER,
            password: environment.RCMND_NEO4J_DB_PASSWORD
        }),
        Neo4jBackendModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
