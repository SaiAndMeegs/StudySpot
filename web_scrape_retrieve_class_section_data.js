//See server readme for endpoint documentation
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5432;
const { Pool } = require('pg')
const axios = require('axios')

const pool = new Pool({
    user: "kiyeotntjhtpfw",
    host: "ec2-34-202-127-5.compute-1.amazonaws.com",
    database: "d6h3vnqcknj7pb",
    password: "447b8c3b79b1f866e436495cafcc983b50bd0b76ba695eca6c851c4243d0ea99",
    port: `${PORT}`,
    ssl: {
        rejectUnauthorized: false
    }
})

//let jsonData = JSON.parse(result.json);

//const url = "./result.json";

let jsonData = require('./result.json');

// fetch("result.json")
//   .then(response => response.json())
//   .then(json => jsonData = json);

// $.getJSON("result.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
//     jsonData = json
// });

console.log(jsonData.length)

jsonData.forEach((classSection) => {
    console.log(classSection);

    pool.query(
        `INSERT INTO "course_meeting_scrape" ("course_spire_id", "course_title", "instructor_name", "days", "start_time", "end_time", "building_room_name", "course_subject")  
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [classSection.course_spire_id, classSection.course_title, classSection.instructor_name, classSection.days, classSection.start_time, classSection.end_time, classSection.building_room_name, classSection.course_subject]

    );
    pool.end   
});

// for (let i = 0; i < classSections in classSections) {
//     console.log(classSection);
//     // pool.query(
//     //     `INSERT INTO "course_meeting_scrape" ("course_spire_id", "course_title", "instructor_name", "days", "start_time", "end_time", "building_room_name", "course_subject")  
//     //                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [classSection.course_spire_id, classSection.course_title, classSection.instructor_name, classSection.days, classSection.start_time, classSection.end_time, classSection.building_room_name, classSection.course_subject]);

// }