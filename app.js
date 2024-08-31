const express=require('express');
const path = require('path'); 
const app=express();
app.listen(3000,()=>{
    console.log('server is running at portno:3000');
});
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
app.get('/',(req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
      res.render('index', { title: 'Home', blogs });
  
});
app.get('/about',(req,res)=>{
    res.render('about',{title:'about'});
});
app.get('/new',(req,res)=>{
    res.render('create',{title:'create new blog'});
})
app.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'..','views','404.html'));
});