// Koa router for get candidates
const Router = require('@koa/router');
const router = new Router();


router.get('/candidates', async (ctx) => {
    ctx.body = 'Candidates list';
});


module.exports = router.routes();