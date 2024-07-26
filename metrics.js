const express = require('express')
const client = require('prom-client')
const app = express();

const register = new client.Registry();

client.collectDefaultMetrics({ register });

app.get('/metrics', async(req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

const port = 9200;
app.listen(port, () => {
    console.log(`Metrics server listening on port ${port}`)
});