const { buildSchema} = require('graphql');

module.exports = buildSchema(`
type Booking{
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
}
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
        bookings: [Booking!]!
}

type RootMutation {
        CreateEvent(eventInput: EventInput): Event
        CreateUser(userInput: UserInput): User
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
}

schema {
        query: RootQuery
        mutation: RootMutation
}
`)