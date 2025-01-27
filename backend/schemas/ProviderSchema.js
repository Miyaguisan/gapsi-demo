const { buildSchema } = require("graphql");


const schema = buildSchema(`
    type Provider {
        id: ID!
        name: String!
        businessName: String!
        address: String!
    }

    type ProviderPagination {
        providers: [Provider]
        pages: Int
        items: Int
    }

    type Query {
        listProviders(limit: Int, offset: Int): ProviderPagination
        viewProvider(id: ID!): Provider
    }

    input ProviderInput {
        name: String
        businessName: String
        address: String
    }

    type Mutation {
        createProvider(input: ProviderInput!): Provider
        updateProvider(id: ID!, input: ProviderInput): Provider
        deleteProvider(id: ID!): Provider
    }
`);


module.exports = schema;