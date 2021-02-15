const express = require("express");
const dotenv = require("dotenv");
const cassandra = require("cassandra-driver");
const bodyParser = require("body-parser");
const cors = require("cors");

//Load Enviroment variables from .env.cms file
dotenv.config({path:"env.cms"});


//Connect with Cassandra db
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1'});
client.connect(function(error,result){
  console.log("Cassandra Connected Successfully...");
});


//API
var filer = require('./src/filerapi/filer');
var filers = require('./src/filerapi/filers');
var addfiler = require('./src/filerapi/addFiler');
var editfiler = require('./src/filerapi/editFiler');


const app = express();
const PORT = process.env.PORT || 5500


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/filer',filer);
app.use('/filers',filers);
app.use('/addfiler',addfiler);
app.use('/editfiler',editfiler);
//Set Response for requestUIR - /hello

app.get("/hello",(req,res)=>{
    console.log("Request for -/hello");
    return res.send("Hello Guys -- I am ready");
});


//Start Express server on port 5500

app.listen(PORT,()=>{
    console.log("Express server is running at http://localhost:%d", PORT);
    console.log("Press CTRL-C to stop \n");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;
