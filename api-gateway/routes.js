const {config} = require('./config/env/index');

const ROUTES = [
    {
        url: '/free',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/free`]: '',
            }
        }
    },
    {
        url: '/product',
        auth: true,
        creditCheck: false,
        proxy: {
            target: config.url_product,
            changeOrigin: true,
            pathRewrite: {
                [`^/product`]: '',
            },
            onProxyReq: function onProxyReq(onProxyReq, req, res){
                onProxyReq.setHeader('userJwt', JSON.stringify(req.jwtDecode));
                
            }
        }
    },
    {
        url: '/category',
        auth: false,
        creditCheck: false,
        proxy: {
            target: config.url_category,
            changeOrigin: true,
            pathRewrite: {
                [`^/category`]: '',
            },
        }
    },
    {
        url: '/inventory-cart-ms',
        auth: true,
        creditCheck: false,
        proxy: {
            target: config.url_inventory,
            changeOrigin: true,
            pathRewrite: {
                [`^/inventory-cart-ms`]: '',
            },
            onProxyReq: function onProxyReq(onProxyReq, req, res){
                onProxyReq.setHeader('userJwt', JSON.stringify(req.jwtDecode));
                
            }
        }
    },
    {
        url: '/account',
        auth: true,
        creditCheck: false,
        //http://account-ms:1717
        proxy: {
            target: config.url_account,
            changeOrigin: true,
            pathRewrite: {
                [`^/account`]: '',
            },
            onProxyReq: function onProxyReq(onProxyReq, req, res){
                if(req.originalUrl.includes('log-in') || req.originalUrl.includes('create-user')){
                   
                }else{
                    onProxyReq.setHeader('userJwt', JSON.stringify(req.jwtDecode));
                }
                   
            }
        }
    },
    {
        url: '/price-promo',
        auth: true,
        creditCheck: false,
        proxy: {
            target: config.url_price_promo,
            changeOrigin: true,
            pathRewrite: {
                [`^/price-promo`]: '',
            },
        }
    },
    {
        url: '/payment',
        auth: true,
        creditCheck: false,
        proxy: {
            target: config.url_payment,
            changeOrigin: true,
            pathRewrite: {
                [`^/payment`]: '',
            },
            onProxyReq: function onProxyReq(onProxyReq, req, res){
                onProxyReq.setHeader('userJwt', JSON.stringify(req.jwtDecode));
                
            }
        }
    }




]

exports.ROUTES = ROUTES;