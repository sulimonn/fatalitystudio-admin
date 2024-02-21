// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://79.174.82.88:8000',
      changeOrigin: true
    })
  );
  app.use(
    '/admin/api',
    createProxyMiddleware({
      pathRewrite: { '/admin/api': '/api' },
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',

      target: 'http://79.174.82.88:8000',
      onProxyReq: function (proxyReq, req, res) {
        proxyReq.setHeader('accept-encoding', 'identity');
      }
    })
  );
};
