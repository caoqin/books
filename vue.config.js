module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        port: 3005,
        proxy: "http://localhost:1618"
    }
}