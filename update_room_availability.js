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
      },
    sslmode: "require"
})

//Set appropriate time zone, make all classes available, then make classrooms with classes in session unavailable
pool.query(
    `SET time zone 'America/Montreal';

            UPDATE building_room SET curr_availability = 2;

            UPDATE building_room SET curr_availability = 0
                WHERE building_room_id IN 
                (SELECT course.building_room_id FROM course_meeting course 
                    WHERE array_to_string(course.days, ',') LIKE '%' || TRIM(INITCAP(to_char(now(), 'day'))) || '%' AND
                    TO_TIMESTAMP(to_char(now(), 'HH24:MI:SS'), 'HH24:MI:SS') BETWEEN TO_TIMESTAMP(course.start_time, 'HH24:MI:SS') AND 
                    TO_TIMESTAMP(course.end_time, 'HH24:MI:SS'));
                    
            UPDATE building set num_rooms_available = (SELECT COUNT(*) FROM building_room WHERE building_room.building_id = building.building_id AND building_room.curr_availability = 2);
            
            UPDATE building set num_rooms_with_class = (SELECT COUNT(*) FROM building_room WHERE building_room.building_id = building.building_id AND building_room.curr_availability = 0);

            UPDATE building set num_rooms_with_bookings = (SELECT COUNT(*) FROM building_room WHERE building_room.building_id = building.building_id AND building_room.curr_availability = 1);

            UPDATE building_room set curr_time_until_next_event = (SELECT min(TO_TIMESTAMP(course_meeting.start_time, 'HH24:MI:SS') - TO_TIMESTAMP(to_char(now(), 'HH24:MI:SS'), 'HH24:MI:SS')) FROM course_meeting WHERE array_to_string(course_meeting.days, ',') LIKE '%' || TRIM(INITCAP(to_char(now(), 'day'))) || '%' AND course_meeting.building_room_id = building_room.building_room_id);
            
                    `, (err, result) => {
    
    if (err) throw err

    pool.end;
})


/*
const connectDb = async () => {
        try {
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
    
            await pool.connect()
            const res = await pool.query(`SET time zone 'America/Montreal';

                                        UPDATE building_room SET curr_availability = 2;
                                        
                                        UPDATE building_room SET curr_availability = 0
                                            WHERE building_room_id IN 
                                            (SELECT course.building_room_id FROM course_meeting course 
                                                WHERE array_to_string(course.days, ',') LIKE '%' || TRIM(INITCAP(to_char(now(), 'day'))) || '%' AND
                                                TO_TIMESTAMP(to_char(now(), 'HH24:MI:SS'), 'HH24:MI:SS') BETWEEN TO_TIMESTAMP(course.start_time, 'HH24:MI:SS') AND 
                                                TO_TIMESTAMP(course.end_time, 'HH24:MI:SS'))`)
            console.log(res)
            await pool.end()
        } catch (error) {
    console.log(error)
    }
    }
    
connectDb()
*/


/*
//Make classrooms without classes in session as available
pool.query(
    `UPDATE building_room SET curr_availability = 2`);

//Make classrooms with classes in session as unavailable
pool.query(
    `UPDATE building_room SET curr_availability = 0
    WHERE building_room_id IN 
    (SELECT course.building_room_id FROM course_meeting course 
        WHERE array_to_string(course.days, ',') LIKE '%' || TRIM(INITCAP(to_char(now(), 'day'))) || '%' AND
        TO_TIMESTAMP(to_char(now(), 'HH24:MI:SS'), 'HH24:MI:SS') BETWEEN TO_TIMESTAMP(course.start_time, 'HH24:MI:SS') AND 
        TO_TIMESTAMP(course.end_time, 'HH24:MI:SS'))`);
*/