// Imports
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5001;
const axios = require('axios')
const Pool = require('pg').Pool
const bodyParser = require('body-parser');


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
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    res.render('buildings')
    //res.render('Rooms')
})

app.get('/rooms/', (req, res) => {
    res.render('rooms')
})

app.get('/rooms/:id/:name', (req, res) => {
    //console.log('rooms')
    res.render('rooms', {id: req.params.id, name: req.params.name})
})

app.get('/buildings/', (req, res) => {
    res.render('buildings')
})

app.get('/calendar/:id/:name', (req, res) => {
    res.render('calendar', {id: req.params.id, name: req.params.name})
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

//student_event endpoints

app.get('/course_meetings/range_of_days/:building_room_id/:start_date/:end_date', cors(), (req, res) => {
    let building_room_id = req.params.building_room_id;
    let start_date = req.params.start_date;
    let end_date = req.params.end_date;

    pool.query("SELECT * FROM student_event WHERE date" + search_query, (err, result) => {
        if (err) throw err
        res.status(200).json(result.rows)
  
        pool.end;
    })
})

app.post('/student_events', bodyParser.json(), (req, res) => {
    
    console.log('backend student events');

    //res.status(200).send("hi"); 
    console.log(req.body);

    const values = [req.body.date, req.body.start, req.body.end, req.body.type, req.body.building_room_id]
    
    
    pool.query("INSERT INTO student_event (date, start_time, end_time, study_type, building_room_id) VALUES ($1, $2, $3, $4, $5)", values, (error, results) => {
        if (error) throw error
        res.status(200).send("")
  
        pool.end;
    })
    
    

})


