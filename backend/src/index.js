// Removed for ESLint reasons
// const debug = require('debug',)('weathermap',);

const serve = require('koa-static',);
const Koa = require('koa',);
const router = require('koa-router',)();
const fetch = require('node-fetch',);
const cors = require('kcors',);

// Get environment data into variables
const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

// Serve front end production build
// through static files located in ./build
app.use(serve('build',),);

// Cross origin resource sharing
app.use(cors(),);

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;
  const response = await fetch(endpoint,);

  return response ? response.json() : {};
};

// Can't run with dangling comma, disabled ESLint for following line
router.get('/api/weather', async ctx => { // eslint-disable-line comma-dangle
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
},
);

app.use(router.routes(),);
app.use(router.allowedMethods(),);

app.listen(port,);

console.log(`App listening on port ${port}`,);
