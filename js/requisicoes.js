const endereco = 'https://banco-de-dados-aula.onrender.com'

let algo

listar = async (rota) => {
    requisicao = await fetch(endereco + rota)
    dados = await requisicao.json()
    return dados
}

atualizar = async (rota, dados) => {
    await fetch(endereco + rota, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
}

apagar = async (id) => {

}

cadastrar = async (rota, dados) => {

}