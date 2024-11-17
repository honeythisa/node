let form = document.querySelector("#formulario")

form.addEventListener("submit", async(ev) => {
    ev.preventDefault()  //Impede o envio do formulario

    let nome = document.querySelector("#txtNome").value
    let preco = document.querySelector("#txtPreco").value
    let foto = document.querySelector("#txtFoto").files[0]  //pega a primeira foto da lista

    let dados = new FormData()
    dados.append("nome", nome)
    dados.append("preco", preco)
    dados.append("foto", foto)

    // let dados = {
    //     nome: nome,
    //     preco: preco
    // }
    // dados = JSON.stringify(dados)

    await fetch("http://127.0.0.1:3000/produtos", {
        method: "POST",
        // headers: {"Content-type": "application/json"},
        body: dados
    })

    alert("Dados salvos com sucesso!")
})