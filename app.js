const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit:'50mb', extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profiles', require('./routes/profiles.routes'));
app.use('/api/posts', require('./routes/posts.routes'));
app.use('/api/comments', require('./routes/comments.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

if(process.env.NODE_ENV === 'production') {
  app.use('/',express.static(path.join(__dirname,'client','build')));

  app.get('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

const PORT = process.env.PORT || 7000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser:true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    const server = app.listen(PORT, () => {
      console.log(
        `Server is running PORT: ${PORT}... NODE_ENV: ${process.env.NODE_ENV}`);
    });
    server.setTimeout(10000);

  } catch (error) {
    console.log('Server error:', error.message);
    process.exit(1);
  }
}

start();
