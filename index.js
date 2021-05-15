const express = require('express');
const mysql = require('mysql');
/*TODO:
dont allow overwriting
send html pages without writing them in
res.sendFile(path.join(__dirname + '/index.html'));
const path = require('path');


// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
*/

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

const tableName = 'libros';

//agregar un libro
app.post('/books',(req,res)=>{


var date = new Date(req.body.date);
var year= date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var fullDate =`${year}-${month}-${day}`
var author = req.body.author;
var genre = req.body.genre;
var title = req.body.title;
var sql = `INSERT INTO ${tableName} (Titulo, Fecha, Autor, Genero) VALUES ('${title}', '${fullDate}', '${author}', '${genre}')`;

connection.query(sql,(error,logs,fields)=>{
if(error){
    res.send('POST Error ' + error);
    return;
}else{
    console.log(fields);
    console.log(logs);
    res.send('el libro ha sido agregado correctamente')
}
})
})

//devolver table con todos los libros
app.get('/books',(req,res)=>{
connection.query(`SELECT * FROM  ${tableName}`,(error,result,fields)=>{
  if(error){
      res.send('GET error' + error);
      return;
  }else{
      var table="";

     result.forEach(element => {
      var date =new Date(element['Fecha'].toString());
      var dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
         table+=`<tr>
         <td>
           ${element['Titulo']}
      <td>
      ${dateString}
      </td>
      <td>
        ${element['Autor']}
      </td>
      <td>
      ${element['Genero']}
      </td>
      </tr>`
     }); 
     var html = `
     <html>
<head>
<link rel="stylesheet" href="response.css">
<title>TP Unidad 4 Modulo 3</title>
</head>

<body>
    <h1>Todos los libros</h1>
    <table>
    <thead>
    <tr>
    <th>Titulo</th>
    <th>Fecha de Publicacion</th>
    <th>Autor</th>
    <th>Genero</th>
    </tr>
    </thead>
    <tbody>
    ${table}
    </tbody>
    </table>
</body>
</html>`
res.send(html);
  }  
})
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})