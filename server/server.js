const mongoose = require('mongoose');
const fastify = require('fastify')();
const routes = require('./routes');
const path = require('path')
const {parsed : {MONGO_ATLAS_PW}} = require('dotenv').config();

//connect to mongodb atlas
mongoose.connect(`mongodb+srv://Janet:${MONGO_ATLAS_PW}@cluster0-lrdwo.mongodb.net/test?retryWrites=true&w=majority`, { useFindAndModify: false, useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(e => console.log('MongoDB could not be connected due to ', e));

fastify.get('/', async (request, reply) => {
  try {
    reply.sendFile('index.html')
  }
  catch (e) { console.log(e) }
});

routes.forEach(route => fastify.route(route))

fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`server running at ${fastify.server.address().port}`)
})

const DistPath = path.join(__dirname, '..', 'dist')
fastify.register(require('fastify-static'), {
  root: DistPath,
})
