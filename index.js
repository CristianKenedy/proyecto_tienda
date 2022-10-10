//Paquetes
const express = require('express')
const app = express()
const cors = require('cors')

//Puerto
app.set("port",process.env.PORT || 3000)

//middlewears
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Rutas
app.use(require("./routes/routes"))

//Ejecucion del servidor web
app.get('/', function (req, res) {
  res.send('Proyecto Final Javascript\nIntegrantes:\nAngelo Vaca'+
  '\nKevin Calderon\nRafael Rosero\nCristian Castro')
  
})


app.listen(app.get("port"))
console.log("La direccion es: \nhttp://localhost:"+app.get("port"))

//Produccion
module.exports = app
