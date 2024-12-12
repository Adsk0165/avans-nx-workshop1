import { Injectable, Logger, Query } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import * as queries from '../queries/queries'
import {User, UserDocument} from '@avans-nx-workshop/backend/user'
import { promises } from 'dns';

@Injectable()
export class Neo4JUserService {
    private readonly logger: Logger = new Logger(Neo4JUserService.name);

    constructor(private readonly neo4jService: Neo4jService) {}

    async findAll(): Promise<any> {
        this.logger.log('findAll users');
        const results = await this.neo4jService.read(
            queries.findAllTeachersInformatica
        );
        const users = results.records.map(
            (record: any) => record._fields[0].start.properties
        );
        return users;
    }

    async FavourtieAQuiz(userId: string, quizId: string): Promise<any>{
        this.logger.log('create favourite relationship')
        const results = await this.neo4jService.write(
            queries.FavoriteQuizAsUser, {userId, quizId}
        )
        return results
    }
}
