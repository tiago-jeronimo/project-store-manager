const MODEL = require('../models/productsModels');

const productMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
 return res.status(422)
  .json({ message: '"name" length must be at least 5 characters long' }); 
  }
  next();
};

const exists = async (req, res, next) => {
  const { id } = req.params;
  const IsExists = await MODEL.getProductById(id);
  if (IsExists.code) {
     return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = { productMiddleware, exists };
