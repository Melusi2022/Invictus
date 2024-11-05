const ProductController = {
  getAllProducts: async (req, res) => {
    res.json({ message: 'Get all products' });
  },
  createProduct: async (req, res) => {
    res.json({ message: 'Create product' });
  },
  getProductById: async (req, res) => {
    const productId = req.params.id;
    res.json({ message: `Get product ${productId}` });
  },
  updateProduct: async (req, res) => {
    const productId = req.params.id;
    res.json({ message: `Update product ${productId}` });
  },
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    res.json({ message: `Delete product ${productId}` });
  }
};

module.exports = ProductController;
