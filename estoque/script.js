document.getElementById("item-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Pega o valor do nome e quantidade do item
    const itemName = document.getElementById("item-name").value;
    const itemQuantity = document.getElementById("item-quantity").value;

    // Verifica se os campos estão preenchidos
    if (itemName === "" || itemQuantity === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Cria uma nova linha na tabela
    const tableBody = document.getElementById("inventory-table-body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${itemQuantity}</td>
        <td><button class="btn btn-danger btn-sm delete-btn">Remover</button></td>
    `;

    tableBody.appendChild(newRow);

    // Limpa os campos do formulário
    document.getElementById("item-name").value = "";
    document.getElementById("item-quantity").value = "";

    // Adiciona o evento para remover o item
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", function() {
            this.parentElement.parentElement.remove();
        });
    });
});
