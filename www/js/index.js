$( document ).ready(function() {
    console.log( "index ready!" );
});

$( window ).on('load', function() {
  console.log( "window ready!" );
});

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

        console.log("Document URL: " + document.URL);
        console.log('onDeviceReady: ' + device.platform + ' : ' + device.model);
        var platform = device.platform.toLowerCase();
        if(platform == "android") {
          app.fileRoot = cordova.file.applicationDirectory + "www/";
        } else if(platform == "ios") {
          app.fileRoot = cordova.file.applicationDirectory + "www/";
        }
        console.log("fileRoot: " + app.fileRoot);
        playAudio(app.fileRoot + "audio/JigsawDone.mp3");
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
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
