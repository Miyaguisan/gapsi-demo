const { buildSchema } = require("graphql");

const schema = buildSchema(`
	type System {
		version: String!
	}
	
	type Query {
		viewSystem(property: String!): String
	}`
);

module.exports = schema;
