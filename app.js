//app.js file is the entry point of our application which fires first when app starts
var express=require('express');
var todocontroller=require('./controllers/todocontroller');
var app=express();
app.set('view engine','ejs');
//built in middleware to set up static files
app.use(express.static('./public'));

todocontroller(app);

app.listen(3000);
