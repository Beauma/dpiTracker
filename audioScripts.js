window.AudioContext = window.AudioContext ||     window.webkitAudioContext;
var context = new AudioContext();

function playTunes() {
      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:3000/audio/", true);
      request.responseType = "arraybuffer";

      request.onload = function() {
        var Data = request.response;
        process(Data);
      };

      request.send();
    }

function process(Data) {
  source = context.createBufferSource(); // Create Sound Source
  context.decodeAudioData(Data, function(buffer) {
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime);
  });
}

function stopTunes(){
        if(source.stop){
            source.stop();
        }
    }
