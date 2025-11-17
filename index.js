
    var synth = window.speechSynthesis;
    var utter = new SpeechSynthesisUtterance();

    var textAreaField = document.getElementById('txtVoice');

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    var voicesList = [];

    let selectVoice = document.getElementById('voiceList');
    let stop = document.getElementById('stop')
    let pause = document.getElementById('pause')
    let play = document.getElementById('play')
    var btnText1 = document.getElementById('btntxt1');
    var btnText2 = document.getElementById('btntxt2');

    var inp = document.getElementById('textID');

    var btnVoice1 = document.getElementById('btnvoice1');
    var btnVoice2 = document.getElementById('btnvoice2');

    selectVoice.addEventListener('click', (e) => {
      console.log('------>', typeof e.target.value);
      console.log(voicesList[e.target.value] || voicesList[0]);
      utter.voice = voicesList[e.target.value] || voicesList[0];
      recognition.lang = voicesList[e.target.value].lang || voicesList[0].lang;
    })

    // if (recognition.onresult) {
    //   console.log('speechRecognition working');
    // } else {
    //   console.log('speechRecognition not working');
    // }


    stop.addEventListener('click', () => {
      synth.cancel();
      play.style.display = 'inline';
      pause.style.display = 'none';
      btnText1.style.display = 'inline';
      btnText2.style.display = 'none';
    })

    function funBtns(e) {
      if (e == 'pause') {
        synth.pause();
        play.style.display = 'inline';
        pause.style.display = 'none';
      } else {
        synth.resume();
        play.style.display = 'none';
        pause.style.display = 'inline';
      }
    }

    //Voice to Text
    if (!recognition) {
      alert('not working speech API')
    }
    else {
      recognition.continuous = false; // Stop automatically after a phrase
      recognition.interimResults = true; // Get partial results as user speaks
    }
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      textAreaField.textContent = "You said: " + transcript;
      console.log("Transcript:", transcript);
      console.log("Confidence:", event.results[0][0].confidence);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err.error);
    };

    function toggleVoice(e) {
      console.log(e)
      if (e == 'on') {
        recognition.start();
        textAreaField.innerText = "Listing...!!"

      }
      else {
        recognition.abort();
        textAreaField.innerText += "\nStopped Listening."
      }
      e == 'on' ? btnVoice2.style.display = 'inline' : btnVoice2.style.display = 'none';
      e == 'on' ? btnVoice1.style.display = 'none' : btnVoice1.style.display = 'inline';

    }

    //Text to Voice

    synth.onvoiceschanged = () => {
      voicesList = synth.getVoices();
      // console.log(voices);
      for (let obj in voicesList) {
        let options = document.createElement('option');
        options.value = obj;
        options.innerText = `${voicesList[obj].name}`;
        selectVoice.appendChild(options);
      }


      synth.speak(utter);
      play.style.display = 'none';
      pause.style.display = 'inline';
    };

    function toggleText(e) {
      if (e == 'on') {
        utter.text = inp.value;
        synth.speak(utter);
        btnText2.style.display = 'inline';
        btnText1.style.display = 'none';
        pause.style.display = 'inline';
        play.style.display = 'none';
      }
      else {
        synth.cancel();
        btnText2.style.display = 'none';
        btnText1.style.display = 'inline';
        pause.style.display = 'none';
        play.style.display = 'inline';
      }

    }

  