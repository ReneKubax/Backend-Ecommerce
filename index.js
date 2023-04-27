const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://backend-ecommerce-production-0f53.up.railway.app', 'https://backend-ecommerce-production-0f53.up.railway.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});


