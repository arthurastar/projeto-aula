let dados
let requisicao
let estrutura
let titulo_modal = document.getElementById('tituloModal')
const modalGeral = new bootstrap.Modal(document.getElementById('modal'))
const modalEstrutura = document.getElementById('modalBody')

function alerta() {
    alert("oi")
}

function deletePaciente() {
    // ira receber o id do paciente e remover o paciente
}

function confirmRemovePacient() {
    // exibe o modal, no modal você deve preencher com os dados do paciente
    // ao clicar no botao de confirmar, você chama o deletePaciente
}


init = () => {
    loadPacientes()

}

loadPacientes = async () => {
    try {
        let pacientes = document.getElementById('pacientes')
        dados = await listar('/pacientes')
        estrutura = ''
        dados.map((item) => {
            estrutura += `
            <div class="row">
            
          <div class="col-1 col-sm-3">${item.id}</div>
          <div class="col-4 col-sm-3">${item.nome}</div>
          <div class="col-3 col-sm-3 d-none d-sm-block">${item.cpf}</div>
          <div class="col-7 col-sm-3 d-none d-sm-block">
            <a href="#" data-bs-toggle="modal" data-bs-target="#modal" onclick="editPaciente(${item.id})">Editar</a>
            <a href="#"  data-bs-toggle="modal" data-bs-target="#modal" onclick="showPaciente(${item.id})">Visualizar</a>
            <a href="">Excluir</a>
          </div>

</div>
        `
        })
        pacientes.innerHTML = estrutura
    } catch (event) {
        console.log(event)
        console.log('algo deu errado')
    }
}

showPaciente = async (paciente) => {
    dados = await listar('/pacientes/' + paciente)
    console.log(dados)
    estrutura = ''
    estrutura += `
        <div class="row">
              <div class="col-12 col-sm-3">${dados.id}</div>
              <div class="col-12 col-sm-3">${dados.nome}</div>
              <div class="col-12 col-sm-3">${dados.cpf}</div>
              <form>
                  <input type="text" class="form-control">
                  <input type="text" class="form-control">
                  <input type="text" class="form-control">
                  <input type="text" class="form-control">
             </form>
        </div>

    `
    modalEstrutura.innerHTML = estrutura
    setTimeout(alerta, 1000)
    titulo_modal.innerText = 'Show Paciente'

}

editPaciente = async (paciente, disabled) => {
    dados = await listar('/pacientes/' + paciente)
    estrutura = ''
    estrutura += `
            <form id="editPaciente">
                <div class="row">
                <input type="hidden" id="id" value="${dados.id}">
                    <div class="col-sm-4">
                        <input name="nome" id="nome" class="form-control" value="${dados.nome}" >
                    </div>
                    <div class="col-sm-4">
                        <input name="cpf" id="cpf" class="form-control" value="${dados.cpf}">
                    </div>
                    <div class="col-sm-4">
                    </div>
                </div>
                <div class="row mt-3">
                    <hr>
                    <div class="col-12 col-sm-6">
                        <div class="texto">Meu <te></te>xto aqui</div>
                            <div class="col-12 col-sm-6 text-right">
                                <input type="reset" class="btn btn-light" value="Cancelar" >
                                <input type="submit" class="btn btn-success" value="Salvar" >
                            </div>
                       </div>
                   </div>
               </div>
        </form>
        
        `
    modalEstrutura.innerHTML = estrutura
    titulo_modal.innerText = 'Edit Form'

    if (disabled == 1) {
        document.getElementById('cpf').disabled = true
    }

    let formEditPaciente = document.getElementById('editPaciente')
    formEditPaciente.addEventListener('submit', updatePaciente)
}

updatePaciente = () => {
    event.preventDefault()
    let nome = document.getElementById('nome').value
    let cpf = document.getElementById('cpf').value
    let id = document.getElementById('id').value

    dados = {
        'nome': nome,
        'cpf': cpf
    }
    atualizar('/pacientes/' + id, dados)
    setTimeout(alerta, 1000)

}


init()

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(queryString);
let usuario = urlParams.get('usuario')
console.log(usuario);
console.log(urlParams.get('profissional'));
console.log(urlParams.get('cdprontuario'));

// console.log('teste');
