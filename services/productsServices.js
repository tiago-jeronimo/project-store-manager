const Model = require('../models/productsModels');

// const isValid = () => { };

async function getProducts() {
  const response = await Model.getProducts();
  if (response.message) {
    return response;
  }
  return response;
}

async function getProductById(id) {
  const response = await Model.getProductById(id);
  if (response.message) {
    return response;
  }
  return response;
}

// const getProducts = async () => {
//   const response = await Model.getProducts();
//     if (response.message) {
//       return response;
//     }
//     return response;
// };

// getProducts().then((data) => {
//   console.log(data);
// });
module.exports = { getProducts, getProductById };
