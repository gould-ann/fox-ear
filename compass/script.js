
// handles the click event for link 1, sends the query... goes every second
setInterval(function getOutput() {
  getRequest(
      'http://www.unertech.com/fox_ears/format_to_json.php', // URL for the PHP file
       drawOutput,  // handle successful request
  );
  return false;
} , 1000);

// handles the response, adds the html
function drawOutput(responseText) {
    var container = document.getElementById('out');
    container.innerHTML = responseText;
}
// helper function for cross-browser request object
function getRequest(url, success) {
    var req = false;
    req = new XMLHttpRequest();
    if (!req) return false;
    if (typeof success != 'function') success = function () {};

    req.open("GET", url, true);
    req.send(null);
    return req;
}