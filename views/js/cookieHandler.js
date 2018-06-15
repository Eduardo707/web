//window.onload = function () {
		
		function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
        //alert(xhr.response);
      } else {
        callback(status, xhr.response);
        
      }
    };
    xhr.send();
}

//dados do user que está logado

function lerDadosLogin(err, data) {
    
    var token = data.token;
 //   console.log(token + '-111111111111111111111111111');
    return token;
    }

//dados do user que está logado

function fetchLoginData(){
    var result = getJSON("/user", function(err,data) {
    	
  //  	console.log(data.token);
    	return result;
    });
}
//}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}