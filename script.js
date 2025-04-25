function buscarCEP(event) {
  event.preventDefault();
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  const resultado = document.getElementById('resultado');

  // Validação do CEP
  if (cep.length !== 8) {
    resultado.innerHTML = '<p class="erro">CEP inválido. Use 8 dígitos.</p>';
    return;
  }
  resultado.innerHTML = '<p>Buscando...</p>';
//fetch API
  // API: https://brasilapi.com.br/docs#cep
  // Método: GET
  // URL: https://brasilapi.com.br/api/cep/v2/{cep}
  // Exemplo: https://brasilapi.com.br/api/cep/v2/01001-000
  // Retorno: JSON

  fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
    .then(res => {
      if (!res.ok) throw new Error('CEP não encontrado');
      return res.json();
    })
    .then(data => {
      resultado.innerHTML = `
        <p><strong>Rua:</strong> ${data.street}</p>
        <p><strong>Bairro:</strong> ${data.neighborhood}</p>
        <p><strong>Cidade:</strong> ${data.city}</p>
        <p><strong>Estado:</strong> ${data.state}</p>
      `;
    })
    // tratamento de erro
    .catch(err => {
      resultado.innerHTML = `<p class="erro">${err.message}</p>`;
    });
}