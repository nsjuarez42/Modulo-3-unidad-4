const express = require('express');
const mysql = require('mysql');
const {post}= require('./post');
const {get}  = require('./get');

const tableName = 'libros'
exports.tableName = tableName;

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded());

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tp_unidad_4_modulo_3'
})
connection.connect();
exports.connection = connection;

app.get('/books',get);
app.post('/books',post)

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})