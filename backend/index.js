const dotenv = require( 'dotenv' );
const Koa = require( 'koa' );
const Router = require( '@koa/router' );
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { graphqlHTTP } = require( 'koa-graphql' );
const { makeExecutableSchema } = require( '@graphql-tools/schema' );
const { mergeTypeDefs, mergeResolvers } = require( '@graphql-tools/merge' );


const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `./.env.${env}` });

const CandidateSchema = require( './schemas/CandidateSchema' );
const ProviderSchema = require( './schemas/ProviderSchema' );
const SystemSchema = require( './schemas/SystemSchema' );

const CandidateResolver = require( './resolvers/CandidateResolver' );
const ProviderResolver = require( './resolvers/ProviderResolver' );
const SystemResolver = require( './resolvers/SystemResolver' );

const mixed_schemas = mergeTypeDefs( [CandidateSchema, ProviderSchema, SystemSchema] );
const mixed_resolvers = mergeResolvers( [CandidateResolver, ProviderResolver, SystemResolver] );

const schema = makeExecutableSchema({
	typeDefs: mixed_schemas,
	resolvers: mixed_resolvers
});

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

router.all('/api', graphqlHTTP({
	schema: schema,
	graphiql: true
}));

app.use( cors() );
app.use( bodyParser() );
app.use( router.routes() );
app.use( router.allowedMethods() );

app.listen( port, () => {
	console.log( `Server running on port ${port}` );
});