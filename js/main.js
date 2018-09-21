//initialization sspeechsynth API
const synth = window.speechSynthesis;

//DOM elements

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//initialise voices array

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();


  //loop through vices +set options 

  voices.forEach(voice => {

    //creeren optie element
    const option = document.createElement('option');

    //aanvullen lijst stem en taal
    option.textContent = voice.name + '(' + voice.lang + ')';

    //instellen modige optie attributes

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);


  });


};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;


}

//eigenlijke stemme 

const speak = () => {

  //check if speaking
  if (synth.speaking) {

    console.error('already speaking...');
    return;

  }
  if (textInput.value !== '') {

    //achterground golf

    body.style.background = '#141414 url(img/wave.gif )';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';
    // get speaktext
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //speak einde

    speakText.onend = e => {
      console.log('done speaking...');
      body.style.background = '#141414';

    };

    speakText.onerror = e => {
      console.error('Something went wrong...');
    }
    //toegewezen stem

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //loopthru voices

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;

      }




    });

    //set pitch aen rate

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //speak

    synth.speak(speakText);


  }


};

//eventlisteners

//invoer
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();


});

//rate verandering

rate.addEventListener('change', e => rateValue.textContent = rate.value)

//pitchverandering

pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)

//stemselectie verandering

voiceSelect.addEventListener('change', e => speak());