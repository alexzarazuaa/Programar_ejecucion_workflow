const download = require("download");
const core = require("@actions/core");
const fs = require("fs");
//THE URL
let doc_url = "https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm";
//The sufix for the new file
let sufijo = ".ods";

// variables date
const fecha = new Date();
const year = fecha.getFullYear();
const dia = `${date.getDate()}`.padStart(2, "0");
const mes = `${date.getMonth() + 1}`.padStart(2, "0");



// final url doc
const url = `${doc_url}${year}${mes}${dia}${sufijo}`;

// final name doc
const docFileName = `${year}${mes}${dia}.ods`;


//function for download the file and upload in ./
download(url, "./", { docFileName });

//paht file
var filePath = "./view/index.html";

try {
  fs.readFile(filePath, "utf8", function (err, data) {
    var info = data.replace(
      /href=.* download/,
      'href="./' + docFileName + '"  download'
    );
    fs.writeFile(filePath, info, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
} catch (error) {
  console.log(error.message);
}

core.setOutput("Response Okey", "Archivo Modificado");
console.log("Response Okey", "Archivo Modificado");