const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  console.log("mohan", Product);
  Product.findAll()
    .then((result) => {
      res.render("shop/product-list", {
        prods: result,
        pageTitle: "All Products",
        path: "/products",
      });
      console.log("my response", result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProductById = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.status(404).render("404", {
          pageTitle: "Product Not Found",
          path: "/404",
        });
      }
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render("500", {
        pageTitle: "Error",
        path: "/500",
      });
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.render("shop/index", {
        prods: result,
        pageTitle: "Shop",
        path: "/",
      });
      console.log("my response", result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getCart = (req, res, next) => {
  console.log("mycart", req.user);
  req.user.getCart().then((cart) => {
    cart
      .getProducts()
      .then((product) => {
        console.log("mycartdata", product);
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "your Cart",
          products: product,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postCart = (req, res, next) => {
  console.log("mydata", req.body.productId);
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      console.log("checkid", prodId);
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      console.log("promiseproduct", products);
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        oldquantity = product.CartItem.quantity;
        newQuantity = oldquantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      console.log("checkplease", product);
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {});
};
exports.getOrder = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "your Cart",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "checkout",
  });
};
exports.deleteitemfromcart = (req, res, next) => {
  let newQuantity = 0;
  let fetchedCart;
  const prodId = req.body.productId;
  console.log("jsvdfg", req.user);
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;

      return cart.getProducts({ where: { id: prodId } });
    })
    .then((product) => {
      // console.log("mycartcheck", product);
      if (product[0].CartItem.quantity > 0) {
        oldquantity = product[0].CartItem.quantity;
        newQuantity = oldquantity - 1;
        return product;
      } else {
        console.log("hahahahaaa");
        res.redirect("/cart");
        return product[0].CartItem.destroy();
      }
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("nishant");
};
