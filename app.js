const express=require('express');
const path = require('path'); 
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog = require('./models/blog');

const app=express();

const URI="mongodb+srv://ManemYamani:GwbmKn6NtAgi0Zea@yamini.51bwdnr.mongodb.net/my_practice?retryWrites=true&w=majority";
mongoose.connect(URI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'..','views','basic.html'));
// });
// app.get('/about',(req,res)=>{
//     res.sendFile(path.join(__dirname,'..','views','about.html'));
// });
// app.get('/about-me',(req,res)=>{
//     res.redirect('/about');
// });
app.set('view engine', 'ejs');

app.use(express.static('public'));
// customized middileware
// app.use((req,res,next)=>{
//     console.log('request made');
//     console.log(req.path);
//     next()
// })
//built-in middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
      title: 'new blog',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
  
    blog.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.get('/single-blog', (req, res) => {
    Blog.findById('5ea99b49b8531f40c0fde689')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
app.get('/',(req,res)=>{
    res.redirect('/blogs');
});
app.get('/about',(req,res)=>{
    res.render('about',{title:'about'});
});
app.get('/new',(req,res)=>{
    res.render('create',{title:'create new blog'});
});
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  app.post('/blogs',(req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
    .then((result) =>
        res.redirect('/blogs'))
    .catch((err)=>console.log(err))

    });

    app.get('/blogs/:id', (req, res) => {
      const id = req.params.id;
      Blog.findById(id)
        .then(result => {
          res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
          console.log(err);
        });
    });
    app.delete('/blogs/:id', (req, res) => {
      const id = req.params.id;
      
      Blog.findByIdAndDelete(id)
        .then(result => {
          res.json({ redirect: '/blogs' });
        })
        .catch(err => {
          console.log(err);
        });
    });
    
app.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'..','views','404.html'));
});