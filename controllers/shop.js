const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};
exports.getProductById = (req, res, next) => {
  Product.fetchAll((products) => {
    const prodId = req.params.productId;
    Product.findByID(prodId, (product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    });

    // console.log("pnisahnt", products[0]?.id);
    // res.render("shop/product-list", {
    //   prods: products,
    //   pageTitle: "All Products",
    //   path: "/products",
    // });
  });
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      //what it does above line
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};
exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    console.log("cartcheck", cart);
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod === product.id
        );

        if (cart.products.find(prod.id === product.id)) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }

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
