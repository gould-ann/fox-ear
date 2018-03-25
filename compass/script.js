function getOutput() {
  httpGetAsync(
      'http://www.unertech.com/fox_ears/get_location.php', // URL for the PHP file
       drawOutput  // handle successful request
  );
  // return false;
}


// handles the click event for link 1, sends the query... goes every second
setInterval(getOutput, 1000);

// handles the response, adds the html
var location_of_loud = [0,0];
function drawOutput(responseText) {
  console.log(responseText);
    var container = document.getElementById('out');
    container.innerHTML = responseText;
    location_of_loud = json_decode(responseText);
}
// helper function for cross-browser request object
var x = document.getElementById("coordinates");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    
}
window.setInterval(getLocation, 100);


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
  var direction_num = 0;
  function direction(){
    try {
      // console.log("here 1");
      var promise = FULLTILT.getDeviceOrientation({ 'type': 'world' });
      // Wait for Promise result
      // console.log("here 2");
      promise.then(function(deviceOrientation) { // Device Orientation Events are supported
        // Register a callback to run every time a new 
        // deviceorientation event is fired by the browser.
        deviceOrientation.listen(function() {
          // Get the current *screen-adjusted* device orientation angles
          var currentOrientation = deviceOrientation.getScreenAdjustedEuler();
          // Calculate the current compass heading that the user is 'looking at' (in degrees)
          
          var compassHeading = 360 - currentOrientation.alpha;
          // window.alert(compassHeading);
          direction_num = compassHeading * Math.PI / 180.0;
          document.getElementById("direction_out").innerHTML = direction_num;
          // window.alert(compassHeading);
          // Do something with `compassHeading` here...
        });
      }).catch(function(errorMessage) { // Device Orientation Events are not supported
        console.log(errorMessage);
        document.getElementById("direction_out").innerHTML = errorMessage;
        return 0;
        // Implement some fallback controls here...
      });
    // setInterval(direction, 1000);  

    return 100;  
  } catch (err) {
    return 0;
  }
  }

  function foo_canvas(my_loc_x, my_loc_y, loud_x, loud_y){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 1000, 1000);
    //math stuff
    var pi = 3.14159;
    var inputX1 = 0;
    var inputY1 = 0;
    var inputX2 = 30;
    var inputY2 = 50;
    // window.alert("called canvas " + direction);
    var theta = Math.atan((inputY1-inputY2) / (inputX1-inputX2)) + direction_num;  //radian value of sound location
    var polA = theta - pi/3 + pi;
    var polB = polA + (2/3)*pi;
    var polC = 0;
    var polD = polB + (2/3)*pi;

    //calculating positions
    var a = [-125 * Math.cos(polA) + 250,125 * Math.sin(polA) + 250];
    var b = [-125 * Math.cos(polB) + 250,125 * Math.sin(polB) + 250];
    var c = [250,250];
    var d = [-125 * Math.cos(polA) + 250,125 * Math.sin(polA) + 250];
    //drawing the arrow

    ctx.beginPath();
    ctx.moveTo(a[0],a[1]);
    ctx.lineTo(b[0],b[1]);
    ctx.lineTo(c[0],c[1]);
    ctx.lineTo(d[0],d[1]);
    ctx.lineTo(a[0],a[1]);
    ctx.stroke();
    // setInterval(foo_canvas(39,1,20,2), 1000);
  }


direction();
setInterval(function() {foo_canvas(41.997619,-93.632238,location_of_loud[0],location_of_loud[1])}, 100);
