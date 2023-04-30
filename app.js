// Imports
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5001;
const axios = require('axios')
const Pool = require('pg').Pool

app.use(cors());

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

//  Listen
app.listen(process.env.PORT || PORT, () => {
    console.log('Listening on port ${process.env.PORT}')
})

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    res.render('index')
    //res.render('Rooms')
})

app.get('/rooms/', (req, res) => {
    res.render('rooms')
})

app.get('/rooms/:id/:name', (req, res) => {
    param_id = req.params.id
    param_name = req.params.name
    res.render('rooms', {id: param_id, name: param_name})
})

app.get('/buildings/', (req, res) => {
    res.render('buildings')
})

app.get('/calendar/:building_room_id', (req, res) => {
    res.render('calendar')
})

// Endpoints

//pool.connect() likely returning a promise asynchronously => might just have to wait for the promise (might just use await) => might not be connected by the time you hit the query
//look into when to connect to the pool, whether this is a promise
//every user has connection object in the pool

//buildings endpoints
app.get('/backend-buildings/', cors(), (req, res) => {

    pool.query("SELECT * FROM building", (err, result) => {
        if (err) throw err
        res.status(200).json(result.rows)
  
        pool.end;
    })

})

/*
app.get('/building_image/:search', cors(), (req, res) => {
    let url = "https://serpapi.com/search.json?q=${'umass " + req.params.search + "}&tbm=isch&ijn=0"
    axios.get(url).then((resp) => console.log(resp))
    
})
*/

//building_rooms endpoints
app.get('/building_rooms/:key', cors(), (req, res) => {

    search_query = req.params.key;

    pool.query("SELECT * FROM building_room WHERE building_id=" + search_query, (err, result) => {
        if (err) throw err
        res.status(200).json(result.rows)
  
        pool.end;
    })

})

//course_meetings endpoints
app.get('/course_meetings/building_room_id/:key', cors(), (req, res) => {
    search_query = req.params.key;

    pool.query("SELECT * FROM course_meeting WHERE building_room_id=" + search_query, (err, result) => {
        if (err) throw err
        res.status(200).json(result.rows)
  
        pool.end;
    })

})

app.get('/course_meetings/id/:id', cors(), (req, res) => {
    id = req.params.id;

    pool.query("SELECT * FROM course_meeting WHERE id=" + id, (err, result) => {
        if (err) throw err
        res.status(200).json(result.rows)
  
        pool.end;
    })

})


