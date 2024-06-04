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
  Cart.getCart((cart) => {
    console.log("cartcheck", cart);
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );

        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      console.log("cartProducts", cartProducts);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByID(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  console.log(prodId);
  res.redirect("/cart");
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
  const prodId = req.body.productId;
  // console.log("price", Product);
  Product.findByID(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });

  // res.render("shop/checkout", {
  //   path: "/checkout",
  //   pageTitle: "checkout",
  // });
  console.log("nishant");
};
