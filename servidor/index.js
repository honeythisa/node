// npm init 
// npm install express cors
// express - biblioteca que permite que você crie um servidor node
// cors - permite acessos de diferentes origens
// multer - é um middleware node.js para lidar com dados multipart/form-data, que é usado principalmente para fazer upload de arquivos

let express = require("express")
let cors = require("cors") // Importando bibliotecas
let multer = require("multer")
let path = require("path")

// Configurando o servidor
let app = express() // Inicializando o servidor
let porta = 3000

app.use(cors())
app.use(express.json())

app.use("/fotos", express.static(path.join(__dirname,"fotos")))

// Banco de dados
let produtos = [
    {id: 1, nome: "Mouse", preco: 49.59, foto: "1.jpg"},
    {id: 2, nome: "Teclado", preco: 109.90, foto: "2.png"},
    {id: 3, nome: "Headset", preco: 399.90, foto: "3.jpg"},
]

// Upload / Multer
let storage_func = multer.diskStorage({  // callback
    destination:(req, file, cb) => {
        cb(null, "fotos/")
    },
    filename: (req, file, cb) => {
        let novo_id = pega_proximo_id()
        let novo_nome = novo_id + path.extname(file.originalname)
        cb(null, novo_nome)
    }
})

let upload = multer({storage:storage_func})  //definindo como será o armazenamento do arquivo enviado

function pega_proximo_id() {
    let novo_id = 0
    for(prod of produtos) {
        novo_id = prod.id
    }
    novo_id++

    return novo_id
}
// Configurando a rota
app.get("/", (req, res) => res.send("Olá! Sou a Melissa :)")) // Função simplificada 
// req = requisição; res = resposta; send = envia; "/" = caminho do servidor ( barra = home )

// http://127.0.0.1:3000/produtos
app.get("/produtos", (req, res) => {
    res.send(produtos)
})

// http://127.0.0.1:3000/produto/3
// /produto/:id = o ":id" é um parâmetro, logo espera um argumento, por exemplo o id 2.
app.get("/produto/:id", (req, res) => {
    // req.params armazena todos os parâmetros da rota
    let id = req.params.id

    for (let prod of produtos) {
        if (prod.id == id) {
            res.send(prod)
        }
    }
    res.send({mensagem: "Produto não encontrado"})
})

// Criar uma rota /produtos/preco_max/:preco
// Onde retorne os produtos que custem, no máximo, o preço informado
app.get("/produtos/preco_max/:preco", (req, res) => {
    let preco = Number(req.params.preco);
    let produtosFiltrados = []

    for (let prod of produtos) {
        if (prod.preco <= preco) {
            produtosFiltrados.push(prod)
        }
    }    
    res.send(produtosFiltrados)
})

app.post("/produtos", upload.single("foto"), (req, res) => {
    let nome = req.body.nome
    let preco = req.body.preco
    let foto = req.file.filename

    console.log(req.file)

    let novo_id = 0
    for(prod of produtos) {
        novo_id = prod.id
    }
    novo_id++

    let novo_produto = {id: novo_id, nome: nome, preco: preco, foto: foto}
    produtos.push(novo_produto)

    res.send(novo_produto)
})
    
// Cria a rota:
// PUT /produto/:id
app.put("/produto/:id", (req, res) => {
    let id = req.body.id
    let nome = req.body.nome
    let preco = req.body.preco
 

    // let prod = null
    // for(let p of produtos){
    //     if(p.id == id){
    //         prod = p
    //         break
    //     }
    // }

    let prod = produtos.find(p => p.id == id)

    if(prod == undefined){
        res.send({mensagem: "Produto nao existente"})
        return
    }
    
    prod.nome = nome
    prod.preco = preco

    res.send(prod)

})

app.delete('/produtos/:id', (req, res) => {
    let id = req.params.id;
    let index = produtos.findIndex(prod => prod.id == id);
    // caso não exista, retorna um erro
    if ( index == -1 ) {
        return res.status(400).send({ msg: "Produto não encontrado" });
    }

    produtos = produtos.filter(p => p.id != id);

    res.send(produtos);
})

// Subindo servidor 
app.listen(porta, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${porta}`)
})

// get -> pegar informações 
// post -> cria novas informações
// put -> alterar informações existentes
// delete -> apagar informações existentes

// get & delete -> não possuem corpo (body) #Não guarda nenhum tipo de informação na memória
// post & put -> possuem corpo (body) #Guardam informação na memória