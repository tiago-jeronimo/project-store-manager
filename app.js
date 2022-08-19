const express = require('express');
const bodyParser = require('body-parser');
const CONTROLLER = require('./controllers/productsController');
const MIDDLEWARE = require('./middlewares/prodcuts.validation');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', CONTROLLER.getProducts);

app.get('/products/:id', CONTROLLER.getProductById); 

app.post('/products', MIDDLEWARE.productMiddleware, CONTROLLER.postProduct);

app.put('/products/:id', MIDDLEWARE.productMiddleware, MIDDLEWARE.exists, CONTROLLER.updateProduct);

app.delete('/products/:id', MIDDLEWARE.exists, CONTROLLER.deleteProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;