const { db } = require("../cnn")  


//consultas
const getProductos = async (req, res) => {
    const consulta = "SELECT * FROM productos;"
    const response = await db.query(consulta)
    res.json(response)
    
}

const getProductosByCodigo = async (req,res) =>{
    const consulta = "SELECT * from productos WHERE pro_codigo :: int8 = $1;"
    try {
        const codigo = req.params.codigo
        const response = await db.one(consulta,[codigo])
        res.status(200).json({
            response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un producto con el codigo: ("
                + req.params.codigo + ")."
        })
    }
}

const postProductos = async (req,res) =>{
    const consulta = "INSERT INTO public.productos("+
        "pro_codigo, pro_nombre, pro_vencimiento, pro_contneto, pro_tipo, pro_precio)"+
        "VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;"
    try {
      const productos = req.body;
      const response = await db.one(consulta, [
        productos.codigo,        
        productos.nombre,        
        productos.vencimiento,
        productos.contneto,
        productos.pro_tipo,
        productos.pro_precio

      ]);
      res.status(201).json({
        message: "Producto ingresado correctamente",
        body: response,
      });
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }    
}   

const putProductos = async (req,res) => {
    const consulta = "UPDATE public.productos SET pro_nombre = $2, pro_vencimiento = $3,"+
    "pro_contneto = $4, pro_tipo = $5, pro_precio = $6 WHERE pro_codigo :: INTEGER = $1 RETURNING *;"
    try {
      const productos = req.body;
      const response = await db.one(consulta, [
        productos.codigo,        
        productos.nombre,        
        productos.vencimiento,
        productos.contneto,
        productos.pro_tipo,
        productos.pro_precio
      ]);
      res.status(200).json({
        message: "Producto actualizado correctamente",
        body: response,
      });
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

const deleteProductos = async (req,res) =>{
    
    const consulta = "DELETE from productos WHERE pro_codigo :: INTEGER = $1;"
    try {
        const codigo = req.params.codigo
        const response = await db.query(consulta,[codigo])
        res.status(200).json({
            message: "El producto " + codigo + " se ha eliminado " +
                "correctamente."
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un producto con el codigo: ("
                + req.params.codigo + ")."
        })
    }
}



module.exports = {
    getProductos, getProductosByCodigo, postProductos, putProductos,
    deleteProductos
}