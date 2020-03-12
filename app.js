
const request = require("request")
const express = require("express");
const sendEmail = require("./email")
const expressHbs = require("express-handlebars")

const  AppError = require("./appError")
const path = require("path")



//Setup &Middleware 
const app = express();
app.use(express.urlencoded());
app.use(express.json()); 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });
app.engine('hbs' ,expressHbs({extname: '.hbs', defaultLayout:'index', layoutsDir:path.join(__dirname,'views')}))
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'hbs')


app.use(express.static(path.join(__dirname,"public")));

//Routes


app.post("/sub",  (req,res)=>{
  try{
      sendEmail({
         request: req.body,
      })
      res.status(200);
  }catch(err){
     console.log(err)
    // next(new AppError('There was an error sending the email. Try Again'),500)
    res.status(500).json({
       status: 'Unsuccessful ',
       message : "Please Contact System Administrator",
       data: err

    })
  }
  

})
app.get("/donwnloadFile", (req,res)=>{
   var file = path.join(__dirname, 'public','pdf','tourguide.pdf');

   res.download(file, (Error)=>{
      if(Error){
         console.log(Error)
         res.status(404);
      }else{
         res.status(200);
      }
   })
})
app.get("/", (req,res)=>{
   res.render("index");
})

app.all('*', (req,res,next) =>{
   const err = new AppError(`Cant find the Page: ${req.originalUrl} requested`,404)
   next(err)
})
app.use((err, req, res, next)=>{
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'ERROR'

   res.status(err.statusCode).json({
       status: err.status, 
       message: err.message
   })
})

app.listen(process.env.PORT || 3000, ()=>{
   console.log("Server Is Running")
})