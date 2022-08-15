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

module.exports = {
  getProducts,
};

module.exports = { getProducts, getProductById };