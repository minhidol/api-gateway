export default {
    env: 'development',
    db: 'mongodb://localhost:27017/TRACKING-FCAM',
    port: '',
    ACCESS_TOKEN_SECRET: "access-token-secret-0a6b944d-d2fb-46fc-a85e-0295c986cd9f",
    ACCESS_TOKEN_LIFE: '1h',

    // lấy tọa độ từ bên thứ 3.
    API_CUS:  "http://mapapistag.fpt.vn",
    // Map host: 172.20.18.252 inside-api-dev.opennet.com.kh, đồng bộ account từ inside về
    urlInside: "http://inside-api-dev.opennet.com.kh",

    url_product: "http://product-ms:8383",
    url_category: "http://category-ms:8282",
    url_inventory: "http://cart-inventory-ms:1115",
    url_account: "http://account-ms:1717",
    url_price_promo: "http://price-promo-ms:6666",
    url_payment: "http://payment-ms:7788"
 
}
