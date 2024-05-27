//Elementos do HTML
const html = document.querySelector('html');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

//Música e Audio
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
musica.volume = 0.3;
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');


//Botões de Seleção da Atividade
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');

//Botão do Timer
const iniciarBt = document.querySelector('.app__card-primary-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconeBt = document.querySelector('.app__card-primary-butto-icon');



//Valores do Timer
const duracaoFoco = 1500000; 
const duracaoDescansoCurto = 300000; 
const duracaoDescansoLongo = 900000;
tempoDecorridoEmSegundos = 5;
let intervaloId = null;



musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});


focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

function alterarContexto(contexto) {
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            
            break;

        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
             <strong class="app__title-strong">Faça uma pausa curta!</strong>
             `


            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        //audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();  
        zerar()
        return
    }
    audioPlay.play();  
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    iconeBt.setAttribute('src', '/imagens/pause.png')

};


function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBt.textContent = 'Começar'
    iconeBt.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null
};




