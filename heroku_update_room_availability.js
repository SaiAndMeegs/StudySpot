const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query(`SET time zone 'America/Montreal';

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
            
                    `, (err, res) => {
  if (err) throw err;

  client.end();
});
