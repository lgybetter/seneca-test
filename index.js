const seneca = require('seneca')();
const plugin = require('./plugin');

seneca.use(plugin);
seneca.use('mongo-store', {
  uri: 'mongodb://120.0.0.1:27017/seneca'
}).use('entity');

seneca.ready((err) => {
  seneca.act('role: web', {
    use: {
      prefix: '/products',
      pin: { area: 'product', actions: '*'},
      map: {
        fetch: { GET: true },
        edit: { GET: false, POST: true },
        delete: { GET: false, DELETE: true }
      }
    }
  });
  const express = require('express');
  const app = express();
  app.use(require('body-parser').json());

  //Seneca与Express集成
  app.use(seneca.export('web'));

  app.listen(3000);
});