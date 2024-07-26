module.exports = {
    apps: [
        {
            name: 'my-page-api',
            script: 'dist/main.js',
            env: {
                NODE_ENV: 'production',
                DATABASE_URL: process.env.DATABASE_URL
            }
        },
        {
            name: 'metrics-server',
            script: './metrics.js'
        }
    ]
}