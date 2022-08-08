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

    url_product: "http://localhost:8383",
    url_category: "http://localhost:8282",
    url_inventory: "http://localhost:1115",
    url_account: "http://localhost:1717",
    url_price_promo: "http://localhost:6666",
    url_payment: "http://localhost:7788"
}
