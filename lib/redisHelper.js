const redis = require("redis");
const _APP = process.env.APP_NAME;

let client;

const getAppHostPromise = function(app) {
  return new Promise((resolve, reject) => {
    if(!client) reject('Redis not connected.');
    client.get(`${_APP}:${app}`, (err, host) => {
      if(err || host === null ) {
        reject('Host not found.');
      } else {
        resolve(JSON.parse(host));
      }
    });
  });
};

const setAppHostPromise = function(app, host) {
  return new Promise((resolve, reject) => {
    if(!client) reject('Redis not connected.');
    client.set(`${_APP}:${app}`, JSON.stringify([host]), 'EX', '360000',
      (err, reply) => {
        if(err) {
          reject(err);
        } else {
          resolve(reply);
        }
    });
  });
};

module.exports = exports = {
  init: _ => {
    client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    });
    client.on('error', console.log);
    client.on('connect', _ => console.log('Redis connected.'));
  },
  getAppHost: getAppHostPromise,
  setAppHost: setAppHostPromise
};
