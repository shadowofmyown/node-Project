const Product = require("../models/product");
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
exports.postProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("/");
    });
  // Product.res.redirect("/");
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log("checkedit", req.query.edit);
  console.log("dad", Product);
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  req.user
    .getProducts({ where: { id: prodId } })
    .then((results) => {
      const result = results[0];
      if (!result) {
        return res.redirect("/");
      }
      console.log("nishantprodid", result);
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: result,
      });
    })
    .catch((err) => {});
  // Product.findByID(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  //   res.render("admin/edit-product", {
  //     pageTitle: "Edit Product",
  //     path: "/admin/edit-product",
  //     editing: editMode,
  //     product: product,
  //   });
  // });
};
exports.deleteProduct = (req, res, next) => {
  console.log("logid", req.body.productId);
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.redirect("/admin/products");
      return product.destroy();
    })
    .then((result) => {
      console.log("DISTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
exports.postEditProduct = (req, res, next) => {
  // const prodId = req.body.productId;
  console.log("postdata");
  console.log("logtitle", req.body.title);
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then((result) => {
      console.log("editresult", result);
      result.title = updatedTitle;
      result.price = updatedPrice;
      result.description = updatedDesc;
      result.imageUrl = updatedImageUrl;
      return result.save();
    })
    .then((result) => {
      console.log("updated Product!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/products");
    });
};
//in promise chainning if we are returning something from one promise untill its not completed next promise will be not executed?
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((result) => {
      res.render("admin/products", {
        //what it does above line
        prods: result,
        pageTitle: "Admin Product",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
