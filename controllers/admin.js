const Product = require("../models/product");
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
exports.postProduct = (req, res, next) => {
  console.log("comming", req);
  console.log("save");
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log("check", editMode);
  console.log("dad", Product);

  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByID(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      //what it does above line
      prods: products,
      pageTitle: "Admin Product",
      path: "/admin/products",
    });
  });
};
