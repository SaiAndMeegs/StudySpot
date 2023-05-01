//See server readme for endpoint documentation
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5432;
const {Pool} = require('pg')
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

const insertBuilding = async (building_id, building_name, building_address) => {
    try {
        await pool.connect();           // gets connection
        await pool.query(
            `INSERT INTO "building" ("building_id", "building_name", "building_address")  
             VALUES ($1, $2, $3)`, [building_id, building_name, building_address]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        //await pool.end();               // closes connection
    }
};

const insertBuildingRoom = async (building_room_spire_id, building_room_name, building_room_meeting_information, building_id) => {
    try {
        await pool.connect();           // gets connection
        await pool.query(
            `INSERT INTO "building_room" ("building_room_id", "building_room_spire_id", "building_room_name", "building_room_meeting_information", "building_id")  
             VALUES ($1, $2, $3, $4)`, [building_room_spire_id, building_room_name, building_room_meeting_information, building_id]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await pool.end();               // closes connection
    }
};

const insertCourseMeeting = async (course_spire_id, course_title, instructor_name, description, days, start_time, end_time, building_room_id) => {
    try {
        await pool.connect();           // gets connection
        await pool.query(
            `INSERT INTO "course_meeting" ("course_spire_id", "course_title", "instructor_name", "description", "days", "start_time", "end_time", "building_room_id")  
             VALUES ($1, $2, $3, $4, $5)`, [course_spire_id, course_title, instructor_name, description, days, start_time, end_time, building_room_id]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await pool.end();               // closes connection
    }
};

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }

//GET REST APIS

//INSERT BUILDINGS
/*
for(let i = 1; i < 6; i++){
    axios.get("http://spire-api.melanson.dev/buildings/?page=" + i).then((resp) => {
            buildings = resp.data.results
            console.log(resp.data.results)

            for (let j = 0; j < buildings.length; j++) {
                pool.query(
                    `INSERT INTO "building" ("building_id", "building_name", "building_address")  
                    VALUES ($1, $2, $3)`, [buildings[j].id, buildings[j].name, buildings[j].address]);
            
                console.log(buildings[j].id)

            }
    })
}
*/

axios.get("http://spire-api.melanson.dev/sections/?page=" + 1).then((resp) => {
    console.log(resp);

})

//INSERT COURSE_MEETINGS
//axios.get("http://spire-api.melanson.dev/sections/?page=" + 1).then((resp) => {
//    console.log(resp.data.results[1].meeting_information[0])
//})
/*
for(let i = 500; i < 4500; i++){
    axios.get("http://spire-api.melanson.dev/sections/?page=" + i).then((resp) => {
        sections = resp.data.results
        console.log(i)

        for (let j = 0; j < sections.length; j++) {
            if(sections[j].meeting_information[0].schedule === null){
                pool.query(
                    `INSERT INTO "course_meeting" ("course_spire_id", "course_title", "instructor_name", "description", "days", "start_time", "end_time", "building_room_id")  
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [sections[j].spire_id, sections[j].offering.course.title, sections[j].meeting_information[0].instructors[0].name, sections[j].description, null, null, null, null]); // sends queries
            }
            else{
                pool.query(
                    `INSERT INTO "course_meeting" ("course_spire_id", "course_title", "instructor_name", "description", "days", "start_time", "end_time", "building_room_id")  
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [sections[j].spire_id, sections[j].offering.course.title, sections[j].meeting_information[0].instructors[0].name, sections[j].description, sections[j].meeting_information[0].schedule.days, sections[j].meeting_information[0].schedule.start_time, sections[j].meeting_information[0].schedule.end_time, sections[j].meeting_information[0].room.id]); // sends queries
        
            }

        }
    })
}
*/

//INSERT BUILDING_ROOMS
/*
for(let i = 1; i < 43; i++){
    axios.get("http://spire-api.melanson.dev/building-rooms/?page=" + i).then((resp) => {
        building_rooms = resp.data.results
        console.log(i)

        for (let j = 0; j < building_rooms.length; j++) {
            if(building_rooms[j].building === null){
                pool.query(
                    `INSERT INTO "building_room" ("building_room_id", "building_room_name", "building_id")  
                    VALUES ($1, $2, $3)`, [building_rooms[j].id, building_rooms[j].alt, null]); // sends queries
            }
            else{
                pool.query(
                    `INSERT INTO "building_room" ("building_room_id", "building_room_name", "building_id")  
                    VALUES ($1, $2, $3)`, [building_rooms[j].id, building_rooms[j].alt, building_rooms[j].building.id]); // sends queries
            }
           
            
        }

        
    })
}
*/


/*
for(let i = 1; i < 5; i++){

    axios.get("http://spire-api.melanson.dev/buildings/" + "?page=" + i).then((resp) => {
        buildings = resp.data.results
        console.log(resp.data.results)
    })

    for (let j = 0; j < buildings.length; j++) {
        pool.query(
            `INSERT INTO "building" ("building_id", "building_name", "building_address")  
            VALUES ($1, $2, $3)`, [buildings[j].id, buildings[j].name, buildings[j].address]);
    
        console.log(buildings[i].id)
            /*
            async () => 
            {
                //insertBuilding(buildings[i].id, buildings[i].name, buildings[i].address)
                
                let delayres = await delay(1000);
            }
            
    }
}
*/

/*
axios.get("http://spire-api.melanson.dev/buildings/").then(async (resp) => {
    let data = resp.data
    console.log(data)
    let buildings = data.results
    //console.log(buildings)

    //console.log(buildings.length)

    //insertBuilding(buildings[1].id, buildings[1].name, buildings[1].address)
    
    //let count = 0



    while(data.next !== null){
        for (let i = 0; i < buildings.length; i++) {
            pool.query(
                `INSERT INTO "building" ("building_id", "building_name", "building_address")  
                VALUES ($1, $2, $3)`, [buildings[i].id, buildings[i].name, buildings[i].address]);

            console.log(buildings[i].id)
                /*
                async () => 
                {
                    //insertBuilding(buildings[i].id, buildings[i].name, buildings[i].address)
                    
                    let delayres = await delay(1000);
                }
                
        }

        axios.get(data.next).then(async (res) => {
            data = res.data
            buildings = res.data.results
        })

        
    }

    console.log(data)
    */

    

    //buildings.forEach((building) => {
    //    insertBuilding(building.id, building.name, building.address)
    //    console.log(building.id)
    //})

    //while(resp.data.next != null){
    //    axios.get(resp.data.next).then((res) => {
    //    })
    //}

    //insertCourse(course.spire_id, course.offering.course.title, course.meeting_information[0].instructors[0].name, course.description, 123)

