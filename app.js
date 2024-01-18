let listaSorteados= [];
let limiteSorteio = 10;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function msgInicial(){
    exibirTextoNaTela('h1', 'Jogo do numero secreto!');
    exibirTextoNaTela('.texto__paragrafo', 'Escolha um número entre 1 e 10.');
}

msgInicial();

function verificarChute() {
    let chuteInput = document.querySelector('input').value;
    let tentativaPalavras = tentativas > 1 ? 'tentativas' : 'tentativa';
    console.log(numeroSecreto);
    if (chuteInput == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns, você acertou!');
        let mensagemFinal = 'Você descobriu o número secreto ('+numeroSecreto+') com '+tentativas+' '+tentativaPalavras+'.'
        exibirTextoNaTela('.texto__paragrafo', mensagemFinal);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        tentativas++;
        limparCampo();

        if (chuteInput > numeroSecreto){
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é menor que ' + chuteInput);
        } else {
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é maior que ' + chuteInput);
        }
    }
    
    
}

function numeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * limiteSorteio + 1);
   let quantidadeDeNumerosGerados = listaSorteados.length;
   if(quantidadeDeNumerosGerados == limiteSorteio){
        listaSorteados = [];
   }
   if(listaSorteados.includes(numeroEscolhido)) {
    return numeroAleatorio();
   } else {
        listaSorteados.push(numeroEscolhido);
        return numeroEscolhido;
   }
}

function limparCampo() {
    chuteInput = document.querySelector('input');
    chuteInput.value = '';
}

function resetar(){
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    msgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}