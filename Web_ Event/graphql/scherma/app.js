const { buildSchema} = require('graphql');

module.exports = buildSchema(`
type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
}

type User {
        _id: ID!
        Email: String!
        Password: String
        createdEvents: [Event!]  
}

input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
}

input UserInput {
        Email: String!
        Password: String! 
}

type RootQuery {
        events:[Event!]!
}

type RootMutation {
        CreateEvent(eventInput: EventInput): Event
        CreateUser(userInput: UserInput): User
}

schema {
        query: RootQuery
        mutation: RootMutation
}
`)