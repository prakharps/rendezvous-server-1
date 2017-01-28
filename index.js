var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
// app.get('/', function(req, res) {
//   res.send('Hello World')
// });

MongoClient.connect("mongodb://Admin:admin@ds033259.mlab.com:33259/rendezvous",function(err,database){
  if(err){
    return console.log(err);
  }
  console.log("database connected");
  db=database;
  app.listen(3000, function() {
    console.log('listening on 3000')
  });
  app.post('/register',function(req,res){
    //console.log("Registered");
    db.collection('userdata').save(req.body,function(err,result){
      if(err) return console.log(err);
      console.log('User Registered');
    });
  });
  app.post('/login',function(req,res){
    var emailId=req.body.emailid;
    var password=req.body.password;
    db.collection('userdata').find({
      $and:[
        {"emailid":emailId},{"password":password}
      ]
    }).toArray(function(err,result){
      if(err){
        console.log(err);
      }
      else{
        console.log(result);
        //console.log(result[0].emailid);
        res.send({
          "emailId": result[0].emailid
        });
      }
    });
  });
  app.post('/update',function(req,res){
    db.collection('userdata').findOneAndUpdate
  });
});
