function getOutput() {
  httpGetAsync(
      'http://www.unertech.com/fox_ears/get_location.php', // URL for the PHP file
       httpGetAsync,  // handle successful request
  );
  // return false;
}


// handles the click event for link 1, sends the query... goes every second
setInterval(getOutput, 1000);

// handles the response, adds the html
function drawOutput(responseText) {
  console.log(responseText);
    var container = document.getElementById('out');
    container.innerHTML = responseText;
}
// helper function for cross-browser request object

var x = document.getElementById("coordinates");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    window.setInterval(getLocation, 100);
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

  // Obtain a new *world-oriented* Full Tilt JS DeviceOrientation Promise
  function direction(){
    var promise = FULLTILT.getDeviceOrientation({ 'type': 'world' });
    // Wait for Promise result
    promise.then(function(deviceOrientation) { // Device Orientation Events are supported
      // Register a callback to run every time a new 
      // deviceorientation event is fired by the browser.
      deviceOrientation.listen(function() {
        // Get the current *screen-adjusted* device orientation angles
        var currentOrientation = deviceOrientation.getScreenAdjustedEuler();
        // Calculate the current compass heading that the user is 'looking at' (in degrees)
        var compassHeading = 360 - currentOrientation.alpha;
        document.getElementById("direction_out").innerHTML = json_encode(compassHeading);
        // Do something with `compassHeading` here...
      });
    }).catch(function(errorMessage) { // Device Orientation Events are not supported
      console.log(errorMessage);
      document.getElementById("direction_out").innerHTML = errorMessage;
      // Implement some fallback controls here...
    });    
  }
