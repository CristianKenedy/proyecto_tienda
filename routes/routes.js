//Importaciones

const {Router } = require("express")
const { getClientes, getClientesByCedula, deleteClientes, postClientes, putClientes } = require("../controllers/clientes.controllers")
const { getProductos, getProductosByCodigo, postProductos, putProductos, deleteProductos } = require("../controllers/productos.controllers")
const router = Router()

const URLV1 = "/v1"

//Rutas Clientes
router.get(URLV1 + "/clientes", getClientes)
router.get(URLV1 + "/clientes/:cedula", getClientesByCedula)
router.post(URLV1 + "/clientes",postClientes)
router.put(URLV1 + "/clientes",putClientes)
router.delete(URLV1 + "/clientes/:cedula",deleteClientes)

//Rutas Productos
router.get(URLV1 + "/productos",getProductos)
router.get(URLV1 + "/productos/:codigo",getProductosByCodigo)
router.post(URLV1 + "/productos",postProductos)
router.put(URLV1 + "/productos",putProductos)
router.delete(URLV1 + "/productos/:codigo",deleteProductos)



module.exports = router