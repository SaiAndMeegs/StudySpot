// Imports
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5001;
const axios = require('axios')
const {Pool} = require('pg')

const pool = new Pool({
    user: "kiyeotntjhtpfw",
    host: "ec2-34-202-127-5.compute-1.amazonaws.com",
    database: "d6h3vnqcknj7pb",
    password: "447b8c3b79b1f866e436495cafcc983b50bd0b76ba695eca6c851c4243d0ea99",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
      }
})

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    res.render('index')
    //res.render('Rooms')
})

app.get('/search-results/', (req, res) => {
    res.render('search-results')
})

app.get('/search-results/:id/:name', (req, res) => {
    param_id = req.params.id
    param_name = req.params.name
    res.render('search-results', {id: param_id, name: param_name})
})

app.get('/buildings', (req, res) => {
    res.render('buildings')
})

app.get('/backend-buildings/', cors(), (req, res) => {
    pool.connect();

    pool.query("SELECT * FROM building", (err, result) => {
        if (err) throw err
        res.status(200).json(result.rows)
  
        pool.end;
    })

})

app.get('/building_rooms/:key', cors(), (req, res) => {

    search_query = req.params.key;

    pool.connect();

    pool.query("SELECT * FROM building_room WHERE building_id=" + search_query, (err, result) => {
        if (err) throw err
        res.status(200).json(result.rows)
  
        pool.end;
    })

})

app.get('/course_meetings/:key', cors(), (req, res) => {
    search_query = req.params.key;

    pool.connect();

    pool.query("SELECT * FROM course_meeting WHERE building_room_id=" + search_query, (err, result) => {
        if (err) throw err
        res.status(200).json(result.rows)
  
        pool.end;
    })

})

//  Listen
app.listen(PORT, () => {
    console.log('Listening on port ${PORT}')
})
