const { db } = require("../cnn")  

//consultas
const getClientes = async (req, res) => {
    const consulta = "SELECT * FROM clientes;"
    const response = await db.query(consulta)
    res.json(response)
    
}

const getClientesByCedula = async (req,res) =>{
    const consulta = "SELECT * from clientes WHERE cli_cedula :: int8 = $1;"
    try {
        const cedula = req.params.cedula
        const response = await db.one(consulta,[cedula])
        res.status(200).json({
            response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un cliente con la cedula: ("
                + req.params.cedula + ")."
        })
    }
}

const postClientes = async (req,res) =>{
    const consulta = "INSERT INTO public.clientes("+
        "cli_cedula, cli_nombre, cli_direccion, cli_telefono, cli_correo)"+
        "VALUES ($1, $2, $3,$4, $5) RETURNING *;"
    try {
      const clientes = req.body;
      const response = await db.one(consulta, [
        clientes.cedula,        
        clientes.nombre,        
        clientes.direccion,
        clientes.telefono,
        clientes.correo

      ]);
      res.status(201).json({
        message: "Cliente ingresado correctamente",
        body: response,
      });
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }    
}   

const putClientes = async (req,res) => {
    const consulta = "UPDATE clientes SET  cli_nombre = $2, cli_direccion=$3, cli_telefono=$4, "+
        "cli_correo =$5 where cli_cedula :: INTEGER = $1 RETURNING * ;"
    try {
      const clientes = req.body;
      const response = await db.one(consulta, [
        clientes.cedula,        
        clientes.nombre,        
        clientes.direccion,
        clientes.telefono,
        clientes.correo
      ]);
      res.status(200).json({
        message: "Cliente actualizado correctamente",
        body: response,
      });
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

const deleteClientes = async (req,res) =>{
    
    const consulta = "DELETE from clientes WHERE cli_cedula :: INTEGER = $1;"
    try {
        const cedula = req.params.cedula
        const response = await db.query(consulta,[cedula])
        res.status(200).json({
            message: "El cliente con cedula " + cedula + " se ha eliminado " +
                "correctamente."
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un estudiante con cedula ("
                + req.params.cedula + ")."
        })
    }
}




module.exports = {
    getClientes,getClientesByCedula, deleteClientes, postClientes,
    putClientes
}
