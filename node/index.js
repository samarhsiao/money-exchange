require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const app = express();
const axios = require('axios');
const server = http.createServer(app);

app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());
const corsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    // console.log(`origin: ${origin}`);
    cb(null, true);
  }
};

app.use(cors(corsOptions));

app.use(express.static('public'));

app.get('/',async(req,res)=>{

  const url = 'https://v6.exchangerate-api.com/v6/b5fc2d8056a71c6edcbeb4dd/latest/USD';
  res.header("Content-Type", "text/html; charset=utf-8");
  const r = await axios.get(url);
  const j = r.data;
  res.json(j);

})






let port = process.env.PORT || 3001;
const node_env = process.env.NODE_ENV || 'development';

server.listen(port, () => {
  console.log(`NODE_ENV: ${node_env}`);
  console.log(`啟動: ${port}`, new Date());
});