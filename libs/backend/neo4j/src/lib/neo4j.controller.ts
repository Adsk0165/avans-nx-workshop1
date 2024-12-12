import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Neo4JUserService } from './neo4j-users.service';
import { ParseMongoIdPipe } from './parsemongoidpipe';

@Controller('users')
export class Neo4JExampleController {
    constructor(private readonly neo4jService: Neo4JUserService) {}

    @Get('')
    async getAllUsers(): Promise<any> {
        const results = await this.neo4jService.findAll();
        return results;
    }

    @Post('/:userId/favorite/:quizId')
  async favoriteQuiz(
    @Param('userId', ParseMongoIdPipe) userId: string,
    @Param('quizId', ParseMongoIdPipe) quizId: string,
  ) {
    console.log(userId,quizId)
    const results = await this.neo4jService.FavourtieAQuiz(userId, quizId);
    return results;
  }
}
