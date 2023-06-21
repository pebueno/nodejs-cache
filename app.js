const express = require('express');
const redis = require('redis');
const fetch = require('node-fetch');

const app = express();

// Make request to GitHub for Data
async function getRepos(req, res, next) {
    try {
        console.log('Fetching Data...');

        const { username } = req.params;

        const response = await fetch(`https://api.github.com/users/${username}`);

        const data = await response.json();

        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
}

app.get('/repos/:username', getRepos);

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

app.listen(PORT, () => {
  console.log(`Access server on  http://localhost:${PORT}`);
});