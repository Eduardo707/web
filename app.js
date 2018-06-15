var express= require('express');
var session= require('express-session');
var http= require("http");
var cookieParser = require('cookie-parser');
var app= express();
var flash = require('connect-flash');

var passport= require("passport");

const request= require('request');
var bodyParser= require('body-parser');
var path= require('path');
var LocalStrategy = require('passport-local').Strategy;

app.use(express.static(path.resolve(__dirname, 'views')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
secret:"Rusty is the best og in the world",
resave: false,
saveUninitialized: false
}));
 app.use(flash());
app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var access = '?access_token=';

passport.use(new LocalStrategy(
  function(username, password, done) {
   const options= {  
    
url: 'https://ptsii.herokuapp.com/login',
method: 'POST',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
form: {username: username,
password: password  }
};



request(options, function(err, response, body) {  
let json= JSON.parse(body);
//console.log(body);

      
    
      switch(json.msg){
          case "true":
              return done(null, json.user);
              break;
     }
          
      
      
    });
  }
));

app.get("/", function(req, res){
   
res.render("login", {page: 'login'}); 
});

app.get("/login", function(req, res){
   
res.render("login" ); 

});

app.get("/msgEmail", function(req, res){
   
res.render("msgEmail" ); 

});
app.get("/table", function(req, res){
   
res.render("table" ); 
});

app.get("/table1", function(req, res){
   
res.render("table1" ); 
});

app.get("/registo", function(req, res){
   
res.render("registo", {username: req.user.username} ); 
});
app.get("/table3", function(req, res){
   
res.render("table3" , {username: req.user.username}); 
});


app.get("/user", function(req, res){
   // console.log(req.user.token);
   res.json({email: req.user.email, token: req.user.token, date: req.user.resetSessionExpires}); 
});


app.get("/register", function(req, res){
   
res.render("register", {page: 'register'}); 
});

app.get("/forgot", function(req, res){
   
res.render("forgot", {page: 'forgot'}); 
});








    


app.get("/charts/:emails", function(req, res){
//  chart.count1 ;
//console.log(req.user.token + '666666666666666666666666666666666666666666666666');
	var minus100 = 0;
	var minus150 = 0;
	var above150 = 0;
	var total = 0;
	var teal = 0;
		var orange = 0;
		var red = 0;
	var emails= req.params.emails;
	console.log(emails);

const options= {  
   

url: 'https://ptsii.herokuapp.com/readings_gli/user' + access + req.user.token ,
credentials: 'include', 
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
   form:{ email: emails}
};
var nome;
var email;
request(options, function(err, response, body) {  
 
let data= JSON.parse(body);
   
         var keys = Object.keys(data);

   for ( var i = 0; i < keys.length; i++) {
		total ++;
	
		var paciente = data[keys[i]];
		
		nome = paciente.nome;
		email = paciente.email;
console.log(paciente.glicemia );
	if(paciente.glicemia <100){
		minus100 ++ ;
	}else if(paciente.glicemia>=100&&paciente.glicemia<150){
	minus150 ++;
	}else {
		above150 ++;}
       
       
     
   }
   
		
		 teal = Math.ceil((minus100/total)*100);
		 console.log(minus150  + ' teal');

		
	 orange = Math.ceil((minus150/total)*100);
	 console.log(nome + ' orange' );
	 red = Math.ceil((above150/total)*100);
	 		res.render('charts',{username: req.user.username, teal: teal , orange : orange, red : red, nome: nome, email: email}); 

});
    



 
});







var count = 0;


app.get("/index",n_pacients,function(req, res){
  // console.log(n_pacients + '/////////////////////////////////////////////');
  
  
  
  const options= {  
   

url: 'https://ptsii.herokuapp.com/medics/user' + access + req.user.token ,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
    form: { email: req.user.email}

    
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);

    var keys = Object.keys(json);
var medic = json[keys[0]];
   console.log(json);
   
res.render("index", {username: req.user.username, nome: medic.nome, number: count,num_tel: medic.num_tel, especialidade: medic.especialidade, morada: medic.morada, email: medic.email, data_nasc: medic.data_nasc, cedula: medic.cedula  }
); 
});
  
 
  

});



app.post('/login', passport.authenticate('local'), (req,res) => {
  //  failureRedirect: '/login';


res.redirect('/index');



});




  app.post('/register', function(req, res) {
      const options= {  
    
url: 'https://ptsii.herokuapp.com/users/new'  ,
method: 'POST',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
form: {username : req.body.username,
password: req.body.password,
email: req.body.email}
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);

 if (json== "user registered"){
res.redirect('/login');
 } else{
     
 }
    
    
    
});
  });
  app.post('/forgot', function(req, res) {
      
      const options= {  
    
url: 'https://ptsii.herokuapp.com/forgot'  ,

method: 'POST',

headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
form: {
    
email: req.body.email,
    hostt: 'web-eduardoferreira.c9users.io'}
};
console.log(req.headers.host);
request(options, function(err, response, body) {  
let json= JSON.parse(body);
if(json=="mail sent"){

    res.render('msgEmail');
}
 
    
    
    
});
  });
  
  
       app.post('/reset/:token', function(req, res) {  
           console.log(req.params.token);
      const options= {  
    
url: 'https://ptsii.herokuapp.com/reset/:token'  ,

method: 'POST',

headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
form: {
    
password: req.body.password,
confirm: req.body.confirm,
token: req.params.token
    }
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
console.log(json);
if(json=='reset successfull'){
    res.render('login');
}
 
    
    
    
});
  });
  
  
  app.get('/reset/:token' , function(req, res){
console.log(req.params.token + '////////////////');
        
       
         console.log(req.user);
     
const options= {  
   

url: 'https://ptsii.herokuapp.com/reset/:token' ,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    }

    
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
   console.log(json);
   //console.log(Object.keys(json).length);
if(json.msg=='reset'){
    res.render("reset", {token: req.params.token}); 

}
});
   res.render("reset", {token: req.params.token}); 
  });
    
    
    app.get('/medic/user' , function(req, res){

      
const options= {  
   

url: 'https://ptsii.herokuapp.com/medics/user'  + access + req.user.token ,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
form: {email: req.user.email}
    
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
   console.log(json);

});
  });
    
 
  
 
  

app.get('/pacients/user' , function(req, res){

     
const options= {  
   

url: 'https://ptsii.herokuapp.com/pacients' + access + req.user.token  ,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
form:{ email: req.user.email}
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
   console.log(json);
   //console.log(Object.keys(json).length);

});
  
  });
    


app.get('/readings_gli/medic' , function(req, res,done){

const options= {  
   

url: 'https://ptsii.herokuapp.com/readings_gli/medic' + access + req.user.token ,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
   form:{ medicEmail: req.user.email}
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
   console.log(json);
res.json(json);

});
});
   
    
app.get('/readings_gli/user/:email' , function(req, res,done){

const options= {  
   

url: 'https://ptsii.herokuapp.com/readings_gli/user' + access + req.user.token ,
credentials: 'include', 
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
   form:{ email: req.params.email}
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
   console.log(json);
res.json(json);

});
});


function n_pacients(req,res,next){
    const options= {  
   

url: 'https://ptsii.herokuapp.com/pacients/all' + access +  req.user.token ,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    }
 //  form:{ medicEmail : req.user.email}
    
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
//console.log(json);
 var keys = Object.keys(json) ;

  for ( var i = 0; i < keys.length; i++) {
	
		var paciente = json[keys[i]];
		
	

	if(paciente.medicEmail == req.user.email){
		count ++ ;
		console.log(count);
	}
       
     
   }

 next();
 
console.log(count);
});
  
};

function chart(req,res,emails,next){
    const options= {  
   

url: 'https://ptsii.herokuapp.com/readings_gli/user' + access + req.user.token,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
   form:{ email : emails}
    
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
console.log(json);
return json
 next();
});
  
};




  app.get("/logout", function(req, res){
   req.logout();
  
   res.redirect("/login");
});






/*app.post('/medics/:id', function(req, res) {
      const options= {  
    
url: 'https://ptsii.herokuapp.com/medics/:id'  ,
method: 'POST',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
form: {_id : req.user._id}
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);

 if (json== "user registered"){
res.redirect('/login');
 } else{
     
 }
    
    
    
});
  });*/
module.exports= app;
app.listen(process.env.PORT || 3000);



console.log('run');

