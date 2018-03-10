$( document ).ready(function() {
    logbuffer.log( "index ready!" );
});

$( window ).on('load', function() {
  logbuffer.log( "window ready!" );
});

var logbuffer = (function() {
  var logbuffer = [];

  function add(text) {
      logbuffer.push(text);
  };

  var publc = {};

  publc.log = function(text) {
    console.log(text);
    add(text);
  };
  publc.dump = function() {
    for (i = 0; i < logbuffer.length; i++) {
      console.log(logbuffer[i]);
    }
  };

  return publc;
})();

var app = {
    fileRoot: "",
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        logbuffer.log("Document URL: " + document.URL);
        logbuffer.log('onDeviceReady: ' + device.platform + ' : ' + device.model);
        var platform = device.platform.toLowerCase();
        if(platform == "android") {
          app.fileRoot = cordova.file.applicationDirectory + "www/";
        } else if(platform == "ios") {
          app.fileRoot = cordova.file.applicationDirectory + "www/";
        }
        logbuffer.log("fileRoot 1604: " + app.fileRoot);
        playAudio(app.fileRoot + "audio/JigsawDone.mp3");
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        logbuffer.log('Received Event: ' + id);
    }
};

app.initialize();

// Play audio
//
function playAudio(url) {
    // Play the audio file at url
    var my_media = new Media(url,
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
}
