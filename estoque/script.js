document.getElementById("item-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Pega o valor do nome e quantidade do item
    const itemName = document.getElementById("item-name").value;
    const itemQuantity = document.getElementById("item-quantity").value;

    // Verifica se os campos estão preenchidos
    if (itemName === "" || itemQuantity === "" || itemQuantity <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Cria uma nova linha na tabela
    const tableBody = document.getElementById("inventory-table-body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${itemName}</td>
        <td class="stock">${itemQuantity}</td>
        <td>
            <input type="number" class="form-control sell-quantity" placeholder="Quantidade" min="1">
        </td>
        <td>
            <button class="btn btn-success btn-sm sell-btn">Vender</button>
            <button class="btn btn-danger btn-sm delete-btn">Remover</button>
        </td>
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

    // Adiciona o evento para vender o item
    const sellButtons = document.querySelectorAll(".sell-btn");
    sellButtons.forEach((button) => {
        button.addEventListener("click", function() {
            const row = this.parentElement.parentElement;
            const stockCell = row.querySelector(".stock");
            const sellQuantityInput = row.querySelector(".sell-quantity");
            const sellQuantity = parseInt(sellQuantityInput.value);

            // Verifica se a quantidade de venda é válida
            if (isNaN(sellQuantity) || sellQuantity <= 0) {
                alert("Insira uma quantidade válida para vender.");
                return;
            }

            let stock = parseInt(stockCell.innerText);

            if (sellQuantity > stock) {
                alert("Quantidade de venda excede o estoque disponível!");
                return;
            }

            // Subtrai a quantidade vendida do estoque
            stock -= sellQuantity;
            stockCell.innerText = stock;

            // Limpa o campo de quantidade para vender
            sellQuantityInput.value = "";

            // Verifica se o estoque chegou a zero e remove a linha se for o caso
            if (stock === 0) {
                row.remove();
            }
        });
    });
});

