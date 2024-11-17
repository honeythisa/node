let produtos = []

pegarProdutos()

async function pegarProdutos() {
    let resposta = await fetch("http://127.0.0.1:3000/produtos")
    produtos = await resposta.json()

    listarProdutos()
}

function listarProdutos(){
    let listagem = document.querySelector("#listagem")
    listagem.innerHTML = ""
    let html = `
        <table class="table-auto w-full mt-4">
            <tr>
                <th>ID<th/>
                <th>FOTO<th/>
                <th>NOME<th/>
                <th>PREÇO<th/>
            <tr/>  
    `
    for(let prod of produtos) {
        html += `
            <tr>
                <td class="border">${prod.id}<td/>
                <td class="border w-24 text-center">
                    <img src="http://127.0.0.1:3000/fotos/${prod.foto}" class="h-20"/>
                <td/>
                <td class="border">${prod.nome}<td/>
                <td class="border text-right">R$${prod.preco}<td/>
            <tr/>
        `
    }
    html += `<table/>`
    listagem.innerHTML = html
}