export default {
    env: 'development',
    db: 'mongodb://localhost:27017/TRACKING-FCAM',
    port: '',
    ACCESS_TOKEN_SECRET: "access-token-secret-0a6b944d-d2fb-46fc-a85e-0295c986cd9f",
    ACCESS_TOKEN_LIFE: '1h',


    url_product: "http://localhost:8001/product",
    url_category: "http://localhost:8001/category",
    url_cart_inventory: "http://localhost:8001/inventory-cart-ms",
   url_price_promo: "http://localhost:8001/price-promo",
    url_payment: "http://localhost:8001/payment"
// url_product: "http://service_proxy/product",
//     url_payment: "http://service_proxy/payment",
//     url_category: "http://service_proxy/category",
//     url_cart_inventory: "http://service_proxy/inventory-cart-ms",
//     url_price_promo: "http://service_proxy/price-promo"
}
