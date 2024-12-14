//queries

export const findAllTeachersInformatica =  `MATCH people=()-[:WorksIn]->(t:Team {name:'Informatica'}) RETURN people;`

export const FavoriteQuizAsUser = `MERGE (u:User {id: $userId}) MERGE (q:Quiz {id: $quizId}) MERGE (u)-[:FAVORITES]->(q)`

export const GetAllFavQuizzes = `MATCH (u:User {id: $userId})-[:FAVORITES]->(q:Quiz) RETURN u.id AS userId, q AS favoriteQuizzes`

export const DeleteFavouriteRelationship = `MATCH (u:User {id: $userId})-[r:FAVORITES]->(q:Quiz {id: $quizId}) DELETE r RETURN u, q`