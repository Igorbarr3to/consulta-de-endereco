const cep = document.querySelector('#cep');
const rua = document.querySelector('#rua');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade')
const uf = document.querySelector('#uf');
const mensagem = document.querySelector('#mensagem');

cep.addEventListener('focusout', async()=>{ 
  try{
    //verifica se o cep digitado contém apenas números e 8 caracteres
    const cepValido = /^[0-9]{8}$/;
    
    //se o cep não for válido, o erro é lançado
    if(!cepValido.test(cep.value)){
      throw {cep_error: 'CEP não encontrado'};
    };

    //busca o cep na api
    const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
    
    //converte a resposta da api para json
    const responseCep = await response.json();

    //preenche os campos do formulário com as respostas api
    rua.value = responseCep.logradouro;
    bairro.value = responseCep.bairro;
    cidade.value = responseCep.localidade;
    uf.value = responseCep.uf;
  }
  catch(err){
    if (err?.cep_error){
      mensagem.textContent = err.cep_error;

      setTimeout(()=>{
        mensagem.textContent = '';
        limpaFormulario();
      }, 2000);
    }
  }
});

//limpa o formulário
function limpaFormulario(){
  cep.value = "";
  rua.value = "";
  bairro.value = "";
  cidade.value = "";
  uf.value = "";
};
