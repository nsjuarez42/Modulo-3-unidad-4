


exports.post = function(req,res){

    const {connection, tableName} = require('./index');

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
    res.send('el libro ha sido agregado correctamente')
}
})
}
