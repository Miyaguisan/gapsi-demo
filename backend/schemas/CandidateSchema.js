const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Candidate {
        id: ID!
        name: String!
        lastName: String!
        maidenName: String!
        email: String!
    }
    
    type Query {
        listCandidates: [Candidate]
        viewCandidate(id: ID!): Candidate
    }
`);

module.exports = schema;
