const SERVICE = require('../services/productsServices');
  
async function getProducts(_req, res) {
  const products = await SERVICE.getProducts();
  if (products.message) {
    return res.status(products.code).json({ message: products.message });
  }
  return res.status(200).json(products);
}

async function getProductById(req, res) {
  const { id } = req.params;
  const products = await SERVICE.getProductById(id);
  if (products.message) {
    return res.status(products.code).json({ message: products.message });
  }
  return res.status(200).json(products);
}

// getProducts().then((data) => {
//   console.log(data);
// });

async function postProduct(req, res) {
  const name = req.body;
  const response = await SERVICE.postProduct(name);
  res.status(201).json(response);
}

async function updateProduct(req, res) {
  const { name } = req.body;  
  const { id } = req.params;
  const result = await SERVICE.updateProduct(id, name);

  res.status(200).json(result);
}

module.exports = { getProducts, getProductById, postProduct, updateProduct };