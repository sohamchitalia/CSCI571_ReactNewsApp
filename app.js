const got = require('got');
const cors = require('cors');

const express = require('express');
const app = express();

const guardianRoutes = require('./api/routes/guardian');
const nytimesRoutes = require('./api/routes/nytimes');

app.use('/guardian', guardianRoutes);
app.use('/nytimes', nytimesRoutes);

module.exports = app;
