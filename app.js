// npm init - init package manager
// npm install express - install express library 
// npm install nodemon 

const express = require('express'); // load express library 
const app = express();
const path = require('path');
const morgan = require('morgan');

const {Pool} = require('pg');
const { release } = require('os');
require('dotenv').config(); // ext config file 

let pool = new Pool();
const port = process.env.port; // pull port from config file 

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use((request,response,next)=>{
//     console.log('ran inbetween server call');
//     next();
// })

app.get('/',(request,response)=>{
    //response.send('hello');
    response.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/info/get',(request,response)=>{
    try {
    
        pool.connect(async (error,client,release)=>{
            let resp = await client.query(`SELECT * FROM test`);
            release();
            response.send(resp.rows);
        })
 } catch (error) {
        console.log(error);
    }
    
});

app.post('/info/add',(request,response)=>{
    // response.send(request.body);
    console.log(request.body.add);
    try {
    
        pool.connect(async (error,client,release)=>{
            let resp = await client.query(`INSERT INTO test (name) VALUES ('${request.body.add}')`);
            release();
            response.redirect('/info/get');
        })
 } catch (error) {
        console.log(error);
    }
    
});



app.post('/info/delete',(request,response)=>{
    // response.send(request.body);
    console.log(request.body.add);
    try {
    
        pool.connect(async (error,client,release)=>{
            let resp = await client.query(`DELETE FROM TEST WHERE NAME = '${request.body.delete}'`);
            release();
            response.redirect('/info/get');
        })
 } catch (error) {
        console.log(error);
    }
    
});
//

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})


