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
            <input type="number" class="form-control add-quantity" placeholder="Adicionar Estoque" min="1">
        </td>
        <td>
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

    // Adiciona o evento automático para vender o item quando o usuário aperta "Enter"
    const sellInputs = document.querySelectorAll(".sell-quantity");
    sellInputs.forEach((input) => {
        input.addEventListener("keydown", function(e) {
            if (e.key === "Enter") { // Verifica se a tecla pressionada foi "Enter"
                const row = this.parentElement.parentElement;
                const stockCell = row.querySelector(".stock");
                const sellQuantity = parseInt(this.value);

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
                this.value = "";

                // Se o estoque chegar a 0, o item não é removido, mas o estoque é atualizado para 0
                if (stock === 0) {
                    stockCell.innerText = 0;
                    // Desabilita o campo de venda, pois não há mais estoque
                    this.disabled = true;
                }

                // Previne o comportamento padrão da tecla Enter
                e.preventDefault();
            }
        });
    });

    // Adiciona o evento automático para adicionar mais ao estoque
    const addInputs = document.querySelectorAll(".add-quantity");
    addInputs.forEach((input) => {
        input.addEventListener("keydown", function(e) {
            if (e.key === "Enter") { // Verifica se a tecla pressionada foi "Enter"
                const row = this.parentElement.parentElement;
                const stockCell = row.querySelector(".stock");
                const addQuantity = parseInt(this.value);

                // Verifica se a quantidade adicional é válida
                if (isNaN(addQuantity) || addQuantity <= 0) {
                    alert("Insira uma quantidade válida para adicionar.");
                    return;
                }

                let stock = parseInt(stockCell.innerText);

                // Adiciona a quantidade ao estoque
                stock += addQuantity;
                stockCell.innerText = stock;

                // Habilita o campo de venda novamente, caso tenha sido desabilitado
                const sellInput = row.querySelector(".sell-quantity");
                sellInput.disabled = false;

                // Limpa o campo de adicionar estoque
                this.value = "";

                // Previne o comportamento padrão da tecla Enter
                e.preventDefault();
            }
        });
    });
});
