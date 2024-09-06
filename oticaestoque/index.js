const produtoForm = document.getElementById('produtoForm');
const listaProdutos = document.getElementById('listaProdutos');

// Array para armazenar os produtos
let produtos = [];

// Função para adicionar produto
produtoForm.addEventListener('submit', function (e) {
    e.preventDefault();

  // Coletar os valores do formulário
const nome = document.getElementById('nomeProduto').value;
const quantidade = document.getElementById('quantidadeProduto').value;
const preco = document.getElementById('precoProduto').value;

  // Adicionar o produto ao array
const produto = { nome, quantidade, preco };
produtos.push(produto);

  // Atualizar a lista de produtos
atualizarLista();

  // Limpar formulário
produtoForm.reset();
});

// Função para atualizar a lista de produtos na tabela
function atualizarLista() {
    listaProdutos.innerHTML = '';

produtos.forEach((produto, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${produto.nome}</td>
    <td>${produto.quantidade}</td>
    <td>${produto.preco}</td>
    <td>
    <button class="btn btn-warning btn-sm" onclick="editarProduto(${index})">Editar</button>
    <button class="btn btn-danger btn-sm" onclick="removerProduto(${index})">Excluir</button>
    </td>
    `;
    listaProdutos.appendChild(row);
    });
}

// Função para remover um produto
function removerProduto(index) {
    produtos.splice(index, 1);
    atualizarLista();
}

// Função para editar um produto
function editarProduto(index) {
    const produto = produtos[index];
    document.getElementById('nomeProduto').value = produto.nome;
    document.getElementById('quantidadeProduto').value = produto.quantidade;
    document.getElementById('precoProduto').value = produto.preco;

  removerProduto(index); // Remove o produto antigo antes de editar
}