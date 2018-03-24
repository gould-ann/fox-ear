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
