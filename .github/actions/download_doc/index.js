//Requeriments
const download = require("download");
const core = require("@actions/core");
const fs = require("fs");
var filePath = "./index.html";


//the url for download in file
//The sufix for the new file
let info_doc =[
  "https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm_",
  ".ods"
]
let info_docUrl=  info_doc[0];
let info_docSuffix = info_doc[1]

const date = new Date();
const year = date.getFullYear();
const dia = date.getDay();
const mes = date.getMonth();

console.log(year,dia,mes)

const fileUrl = `${info_docUrl}${dia}${mes}${year}${info_docSuffix}`;

const downloadfileName = `${dia}${mes}${year}${info_docSuffix}`;

download(fileUrl, "./files/", { downloadfileName });

console.log(filePath,fileUrl,downloadfileName)



try {
  fs.readFile(filePath, "utf8", function (err, data) {
    var result = data.replace(
      /href=.* download/,
      'href="./files/' + downloadfileName + '"  download'
    );
    fs.writeFile(filePath, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
} catch (error) {
  console.log(error.message);
}

core.setOutput(" Okey", "Archivo Modificado");
console.log(" Okey", "Archivo Modificado");