const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const application  = require('./src/application');
const app = express();
const multer = require('multer');
const upload = multer({dest:'/public/uploads/'});
const fs = require('fs');
const path =require('path');
const cloudinary  = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { log } = require('console');
require('dotenv').config();



cloudinary.config({ 
    cloud_name: "dko5ee27q", 
    api_key: '356363399211357', 
    api_secret: 'KG3e-DekmxFFxUG22EJHapdWNcY'
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 30, height: 30, crop: "limit" }]
});
const parser = multer({ storage: storage });

let transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: "bookrentaldtl@gmail.com",
        pass: "mqysmvewfgnfrocc"
    }

});
mongoose.connect("mongodb+srv://admin_suhas:todolist@cluster0.23we0r6.mongodb.net/Book_Rental?retryWrites=true");
const bookSchema = {
    bookName: String,
    class: String,
    Subject: String,
    ownerName: String,
    contactInfo:String,
    bookImage:String
    
}
const Book = mongoose.model("Book",bookSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/lendBook",(req,res)=>{
    res.render("lendBook");
});

app.post("/lendBook",parser.single('image'),(req,res)=>{
    const book = new Book({
        bookName :req.body.bookName,
        class: req.body.class,
        Subject:req.body.subject,
        ownerName:req.body.luserName,
        contactInfo: req.body.lemail,
        bookImage:req.file.path
    })
    book.save((err,post,numAffected)=>{
        if(err){
            console.log(err);
        }else{
            res.render("lendingSuccess",{
                book:book
            });
        }
    });
});

app.get("/rentBook",(req,res)=>{
    Book.find((err,books)=>{
        if(err){
            console.log(err);
        }
        else{

            if(books.length===0){
                res.render("successFailure",{
                    heading: "No books are available now",
                    subHeading:"We are sorry for the inconvenience. Please come back later to rent books"
                });
            }
            else{
                res.render("rentBook",{
                    books:books
                });
            }
        }
    })
    

});
app.get("/rentBook/:bookId",(req,res)=>{
    let bookId = req.params.bookId;
    Book.findById({_id:bookId},(err,book)=>{
        if(!err){
            res.render("rentApplication",{
                book:book
            });
        }
        else{
            console.log(err);
        }
    })
})
app.post("/rentBook/:bookId",(req,res)=>{
    let bookId = req.params.bookId;

    Book.findById({_id:bookId},(err,book)=>{
        if(!err){
            const message = {
                from:"bookrentaldtl@gmail.com",
                to: book.contactInfo,
                subject: `New Application submitted for ${book.bookName}`,
                html: application.formatHtmlBody(req.body,book.bookName)
            }

            transport.sendMail(message,(err,info)=>{
                if(err){
                    console.log("Couldn't send mail");
                    console.log(err);
                }else{
                    res.render("successFailure",{
                        heading:"You have successfully submitted application",
                        subHeading: "Lender will get in touch with you"
                    });
                    console.log(info);
                }
            })
            
            
  
        }
        else{
            console.log(err);
        }
    })
});
app.get("/deleteBook",(req,res)=>{
    res.render("deleteBook");
});
app.post("/deleteBook",(req,res)=>{
    let bookId = req.body.bookId;

    Book.findById(bookId,(err,result)=>{
        if(!result){
            res.render("successFailure",{
                heading:"Couldn't delete the book of given id",
                subHeading: "Please try again"
            });
        }
        else if(err){
            console.log(err);
        }
        else{
            Book.findByIdAndDelete(bookId,(err,docs)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.render("successFailure",{
                        heading:"Successfully deleted the book which you listed",
                        subHeading: "Thank you for using our website"

                    });
                }
            })
           
        }

    })
    
 
})


app.listen(process.env.PORT||3000, function () {
    console.log("Server started on port 3000");
  });