const { buildSchema } = require("graphql");


const schema = buildSchema(`
	type Provider {
		id: ID!
		name: String!
		businessName: String!
		address: String!
	}

	type Query {
        listProviders(limit: Int, offset: Int): [Provider]
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
	}`
);


module.exports = schema;