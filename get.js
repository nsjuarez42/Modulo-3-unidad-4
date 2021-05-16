

exports.get = function(req,res){

    const {connection, tableName} = require('./index');
    
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
      }
