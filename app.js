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

      
      console.log(body)
      switch(json.msg){
          case "logged in":
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
app.get("/table", function(req, res){
   
res.render("table" ); 
});

app.get("/table1", function(req, res){
   
res.render("table1" ); 
});

app.get("/table2", function(req, res){
   
res.render("table2" ); 
});
app.get("/table3", function(req, res){
   
res.render("table3" ); 
});


app.get("/user", function(req, res){
    console.log(req.user.token);
   res.json({email: req.user.email, token: req.user.token, date: req.user.resetSessionExpires}); 
});


app.get("/register", function(req, res){
   
res.render("register", {page: 'register'}); 
});

app.get("/forgot", function(req, res){
   
res.render("forgot", {page: 'forgot'}); 
});



app.get("/charts", function(req, res){
//  chart.count1 ;

 
res.render("charts", {username: req.user.username}); 
});











app.get("/index",n_pacients,function(req, res){
  // console.log(n_pacients + '/////////////////////////////////////////////');
res.render("index", {username: req.user.username, number: 0}
); 
});



app.post('/login', passport.authenticate('local'), (req,res) => {


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
console.log(json);
    res.send('mail enviado');
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
    
 
  
var access = '?access_token=';
app.get('/paients/user' , function(req, res){

     
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
   
    
app.get('/readings_gli/user' , function(req, res,done){

const options= {  
   

url: 'https://ptsii.herokuapp.com/readings_gli/user' + access + req.user.token ,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
   form:{ email: req.body.email}
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
   console.log(json);
res.json(json);

});
});


function n_pacients(req,res,next){
    const options= {  
   

url: 'https://ptsii.herokuapp.com/pacients/all' ,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    }//,
 //  form:{ medicEmail : req.user.email}
    
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
//console.log(json);
 count = Object.keys(json).length ;
console.log(count);

 next();
 

});
  
};

function n_reads_over(req,res,json,next){
    const options= {  
   

url: 'https://ptsii.herokuapp.com/readings_gli/user' + access + req.user.token,
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Accept-Charset': 'utf-8',
        
    },
   form:{ email : req.user.email}
    
};

request(options, function(err, response, body) {  
let json= JSON.parse(body);
console.log(json);
return json
 next();
});
  
};




  

module.exports= app;
app.listen(process.env.PORT || 3000);



console.log('run');

