async function  carrearAnotacoes (){
    const url = `https://68378ec72c55e01d184a2bc6.mockapi.io/anotacoes`
    try {
        const resposta = await fetch(url)
        const arrayAnotacoes = await resposta.json()
        console.log(arrayAnotacoes)
       

        const listaNotas = document.getElementById('listaNotas')
        listaNotas.innerHTML = ''

        arrayAnotacoes.forEach(anotacao => {
            listaNotas.innerHTML +=`
            <div class="nota">
            <div>${anotacao.descricao}</div>
            <div class="data-nota">${anotacao.data}</div>
            <div class="acoes-nota">
            <button class="btn-editar" onclick="editarNota(this)">Editar</button>
            <button class="btn-excluir" onclick="deletarAnotacao('${anotacao.id}')">Excluir</button>
            </div>
        </div>`
     
        })
    }
    catch (erro) {
        console.erro('erro ao carregar as Anotações',erro)
    }
}

async function cadastrarAnotacao() {
    const url = `https://68378ec72c55e01d184a2bc6.mockapi.io/anotacoes`
    try {
        const descricaoDigitada = document.getElementById('descricao').value
        const dataDigitada = document.getElementById('data').value

        if (!descricaoDigitada || !dataDigitada) {
            alert('Você precisa digitar todos os campos')
            throw new Error('Você precisa preencher todos os campos')
        }

        const dadosAnotacao = {
            descricao: descricaoDigitada,
            date: dataDigitada
        }
        
        const resposta = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosAnotacao)
        })
        alert('Dados Cadastrados com Sucesso')
        
    }
    catch (erro) {
        console.error(erro)
    }
    carrearAnotacoes()
}

async function deletarAnotacao(id) {
    const url = `https://68378ec72c55e01d184a2bc6.mockapi.io/anotacoes/${id}`
    const resposta = await fetch(url, {
        method: 'DELETE'
    })
    alert('Anotação excluída com sucesso!')
    carrearAnotacoes()
}

carrearAnotacoes()