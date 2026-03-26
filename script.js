document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'https://crudcrud.com/api/74b13f599683409f9ac93d6a0e145723/clientes';

    // Função para cadastrar um cliente
    document.getElementById('btSalvar').addEventListener('click', async () => {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        if (!nome || !email) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email })
            });

            if (response.ok) {
                alert('Cliente cadastrado com sucesso!');
                document.getElementById('nome').value = '';
                document.getElementById('email').value = '';
            } else {
                alert('Erro ao cadastrar cliente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar cliente.');
        }
        listarClientes();
    });

    // Função para listar os clientes
    async function listarClientes() {
        try {
            const response = await fetch(API_URL);
            const clientes = await response.json();

            const listaClientes = document.getElementById('listaClientes');
            listaClientes.innerHTML = '';

            clientes.forEach(cliente => {
                const li = document.createElement('li');
                li.textContent = `${cliente.nome} - ${cliente.email} `;
                const button = document.createElement('button');
                button.id = 'delete';
                button.textContent = 'Deletar';
                button.onclick = () => deletarCliente(cliente._id);
                li.appendChild(button);
                listaClientes.appendChild(li);
            });
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao listar clientes.');
        }
    }

    // Listar clientes ao carregar a página
    window.onload = listarClientes;

    // Função para deletar um cliente
    async function deletarCliente(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Cliente deletado com sucesso!');
                listarClientes();
            } else {
                alert('Erro ao deletar cliente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar cliente.');
        }
    }
});