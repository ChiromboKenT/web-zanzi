
const request = require("request")
const express = require("express");
const {google} = require("googleapis")
const nodemailer = require("nodemailer")
const expressHbs = require("express-handlebars")

const  AppError = require("./appError")
const path = require("path")

const getToken = function(req,res){
   var mail = nodemailer.createTransport({
     service: 'SendGrid',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: `Zanzibar Website <${req.body.email}>`,
      to: 'chirombokenny@outlook.com',
      subject: "RSVP: Zanzibar Holiday",
      generateTextFromHTML: true,
      html: `
      <div><h2>Dear Shorai Chirombo</h2></div><br>
      <div><b>You have received an email from ${req.body.name}</b></div>
      <div>
         <p>Preffered Options : ${req.body.option}</p>
         <p>Email      :  ${req.body.email}</p>
         <p> Message   :  ${req.body.message}</p>
         <p>HAPPY 50TH</>
      `,
   };

     
   mail.sendMail(mailOptions, function(error, info){
      if (error) {
      console.log(error);
      } else {
      console.log('Email sent: ' + info.response);
      }
   });

}

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


app.post("/sub", (req,res)=>{
  getToken(req, res);
  

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