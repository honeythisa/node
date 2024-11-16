let sharp = require("sharp")

let args = process.argv

let img = args[2]
let largura = parseInt(args[3])
let altura = parseInt(args[4])

sharp(img)
    .resize(largura, altura)
    //.rotate(180)
    //.resize(150, 150)
    .toFile("little-foto.jpg")

// pegando os argumentos da linha de comando
//let args = process.argv
//console.log(args)

// let resultado = parseInt(args[2]) + parseInt(args[3])
// console.log(resultado)