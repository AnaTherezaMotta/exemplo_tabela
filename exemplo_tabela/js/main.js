// var variavel global
// let variavel local
// const variavel 

const tableConteiner =  document.querySelector('#tabela-produtos')

const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

const CABECALHO_TABELA = ["ID","Nome","Preco","Categoria"];

let produtos=[];
let categoriaDosProdutos = [];

window.addEventListener('load',function(){

    criarTabela();
    fomatarCabecalho();
    carregarDados()


});

function criarTabela(){
    thead.setAttribute('id','cabecalho-tabela');
    tbody.setAttribute('id','corpo-tabela');

    table.appendChild(thead);
    table.appendChild(tbody);

    tableConteiner.appendChild(table);

};

function fomatarCabecalho(){

    let linha = thead.insertRow(0);

    for(let celula = 0; celula < CABECALHO_TABELA.length; celula++){
        let th = document.createElement('th');
        th.textContent = CABECALHO_TABELA[celula];
        linha.appendChild(th);
    };

};

function carregarDados(){
    fetch('data/produtos.json')
        .then(function(resposta){return resposta.json();})
        .then(function(dados){
            console.log(dados);
            adicionarLinhas(dados);
        }).catch(function(error){
            console.error("Não foi possivel carregar os dados!");
        });

};

function adicionarLinhas(dados){
    for(let i = 0; i<dados.length; i++){
        let linha = tbody.insertRow();
        linha.setAttribute('id','produto-' +dados[i].id);
        produtos.push(dados[i]);

        if(!categoriaDosProdutos.includes(dados[i].category)){
            categoriaDosProdutos.push(dados[i].category);
        };

        let registro = [
            dados[i].id,
            dados[i].title,
            dados[i].price,
            dados[i].category
        ]

        for(let j = 0;j < registro.length; j++){
            let celula = linha.insertCell();
            celula.innerText = registro[j];
            celula.setAttribute('title',registro[j]);
        }
    };

};

