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
                    TO_TIMESTAMP(course.end_time, 'HH24:MI:SS'))`, (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
