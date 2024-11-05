const ProductController = {
  getAllProducts: async (req, res) => {
    // Dummy product data to send to the frontend
    const products = [
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' },
      { id: 3, name: 'Product C' }
    ];
    res.json(products); // Send the list of products to the frontend
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
