const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const score = require('./routes/score');
const bodyParser = require('body-parser');
const cors = require('cors');
const { DATABASE_URL } = require('./config');

const app = express();
// const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', user);
app.use('/api/score', score);

// app.listen(port, () => {
//     console.log(`http://localhost:${port}`)
// })

mongoose.connect(process.env.DATABASE_URL || DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.listen(process.env.PORT || 3000, () => console.log('server started'))