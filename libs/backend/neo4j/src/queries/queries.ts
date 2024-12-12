//queries

export const findAllTeachersInformatica =  `MATCH people=()-[:WorksIn]->(t:Team {name:'Informatica'}) RETURN people;`

export const FavoriteQuizAsUser = `MERGE (u:User {id: $userId}) MERGE (q:Quiz {id: $quizId}) MERGE (u)-[:FAVORITES]->(q)`

