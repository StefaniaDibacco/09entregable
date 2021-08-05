"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multer = require('multer');
/**En dest ponemos la carpeta donde vamos a guardar el archivo */


var upload = multer({
  dest: './uploads'
});
var app = (0, _express["default"])();
var puerto = 8080;
var server = app.listen(puerto, function () {
  return console.log('Server up en puerto', puerto);
});
/**Upload.single se usa para subir 1 solo archivo */

/**Recibe como parametro el nombre del param de la request */

app.post('/single', upload.single('imagen'), function (req, res) {
  try {
    console.log(req.file);
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
}); // /** OPCION 2
//  * Aca podemos guardar directamente el archivo con extension y todo
//  * en destionation ponemos la carpeta donde vamos a guardarlo
//  * en filename ponemos el nombre con el cual guardaremos el archivo.
//  * Al usar originalName (que viene desde el parametro file) guardamos el archivo con el nombre que viene
//  */

var folderName = './uploads';
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, folderName);
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});
var uploadMejorado = multer({
  storage: storage
});
app.post('/single-mejorado', uploadMejorado.single('imagen'), function (req, res) {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});
/**OPCION3 CARGAR MULTIPLES ARCHIVOS */

app.post('/multiple', uploadMejorado.array('imagenes', 3), function (req, res) {
  try {
    res.send(req.files);
  } catch (err) {
    res.send(400);
  }
});