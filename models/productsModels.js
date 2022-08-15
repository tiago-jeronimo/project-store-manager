const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute(`
    SELECT id, name 
    FROM StoreManager.products
    ORDER BY id;
    `);
  if (!result.length) return { message: 'Product not found', code: 404 };
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(`
    SELECT id, name 
    FROM StoreManager.products
    WHERE id=?;
    `, [id]);
  
  if (!result.length) return { message: 'Product not found', code: 404 };
  return result[0];
};

// getProducts().then((data) => {
//   console.log(data);
// });

// getProductById(2).then((data) => {
//   console.log(data);
// });json.message

module.exports = { getProducts, getProductById };
