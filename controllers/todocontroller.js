var bodyparser=require('body-parser');
var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://Ayushi:Leva@123@cluster0.dimgh.mongodb.net/Todo?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

var todoschema=new mongoose.Schema({
  item: String
});
var Todo=mongoose.model('Todo',todoschema);
var urlencodedparser=bodyparser.urlencoded({extended: false});
module.exports=function(app){
  //setting up the routes (handlers) for different requests
  app.get('/todo', function(req,res){
    Todo.find({}, function(err,data){
      if(err) throw err;
      res.render('todo',{todos: data});
    });
  });

  app.post('/todo',urlencodedparser,function(req,res){
     var newitem=Todo(req.body).save(function(err,data){
       if (err) throw err;
       res.json(data);
     });
  });

  app.delete('/todo/:item', function(req,res){
      Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err,data){
        if (err) throw err;
        res.json(data);
      });
  });
};
