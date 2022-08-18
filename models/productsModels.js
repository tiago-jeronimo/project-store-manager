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

// getProducts().then((data) => {
//   console.log(data);
// });
const getProductById = async (id) => {
  const [result] = await connection.execute(`
    SELECT id, name 
    FROM StoreManager.products
    WHERE id=?;
    `, [id]);
  
  if (!result.length) return { message: 'Product not found', code: 404 };
  return result[0];
};

// getProductById(10).then((data) => {
//   console.log(data);
// });

const postProduct = async ({ name: product }) => {
  const [result] = await connection.execute(`
  INSERT INTO StoreManager.products (name) VALUES (?);`, [product]);
  return {
    id: result.insertId,
    name: product,
  };
};

// postProduct({ name: 'Robocop' }).then((data) => {
//   console.log(data);
// });

const updateProduct = async (id, name) => {
  const q = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  await connection.execute(q, [name, id]);
  return {
    id,
    name,
  };
};

module.exports = { getProducts, getProductById, postProduct, updateProduct };
