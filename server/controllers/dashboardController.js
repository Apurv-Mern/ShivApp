const { response } = require('express');

const pool = require('../database/connection.js').pool;

const getTotalRsvpResponses = async (req, res) => {

    try {
        const { user_id} = req.params;
        // const { event_ids } = req.body;
        // console.log("1",user_id);
        const events = await pool.query("SELECT id FROM events WHERE user_id = $1",[user_id]);
        const event_ids = events.rows.map(event => event.id);
        // console.log("2",event_ids);
        //get total unique guest_id from response table
        for (const event_id of event_ids) {

            const total_rsvp_responses = await pool.query(`SELECT 
            (SELECT COUNT(DISTINCT guest_id) FROM responses WHERE user_id=$1 AND event_id=$2)+
            (SELECT COUNT(DISTINCT gog_id) FROM guest_of_guests_response_withohut_array WHERE user_id=$3 AND event_id=$4) as total_count;`, [user_id,event_id,user_id,event_id]);
            // console.log("3",total_rsvp_responses.rows[0].total_count);
            if (total_rsvp_responses.rowCount == 0) {
                res.status(400).json({ msg: "no guest response was found this guest", Yes_Count: 0 });
                return;
            }
    
            //if total_invition_sent and total_response_received already exist for user_id then update the them
            // else insert them into the "rsvp_attendance" table 
            const rsvp_attendance_count = await pool.query(`SELECT * FROM rsvp_attendance WHERE user_id=$1 AND event_id=$2`, [user_id,event_id]);
        //   console.log("4", rsvp_attendance_count.rows[0].total_invitation_sent);
            //if total_invition_sent is < total_response_received
            if (total_rsvp_responses.rows[0].total_count > rsvp_attendance_count.rows[0].total_invitation_sent) {
                res.status(400).json({ msg: "total invitations sent is less than total responses received" });
                return;
            }
    
            //  if (rsvp_attendance_count.rows.length > 0) {
            await pool.query(`UPDATE rsvp_attendance SET total_response_received=$1 WHERE user_id=$2 AND event_id=$3`, [total_rsvp_responses.rows[0].total_count, user_id,event_id]);
            // }
            // else {
            //     //insert the total responses into the "rsvp_attendance" table 
            //     await pool.query(`INSERT INTO rsvp_attendance (total_response_received,user_id) VALUES ($1, $2)`, [total_rsvp_responses.rows[0].count, user_id]);
            // }
        }


        const output = await pool.query(`SELECT ra.total_invitation_sent, ra.total_response_received,ra.event_id,e.event_name
        FROM rsvp_attendance as ra
        LEFT JOIN events as e ON e.id= ra.event_id
        WHERE ra.user_id=$1`, [user_id]);
        // console.log("5", output.rows);
        res.status(200).json({ data: output.rows});
    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();

    }


}

//************************************************** 1 ************************************************ */
const getTotalCeremony = async (req, res) => {

    const user_id = req.params.id;
    try {

        const rawResult = await pool.query(`SELECT response FROM responses WHERE user_id = $1 AND question_id =6;`, [user_id]);
        const rd = rawResult.rows;
        const rdArray = []
        rd.forEach(element => {
            rdArray.push(element.response)
            console.log(element.response);
        });
        console.log(rdArray);

        // Step 1: Remove the curly braces and split into an array of strings
        const modifiedArray = rdArray.map(element => element.replace(/[{}"]/g, '').split(','));

        // Step 2: Parse the string values as integers
        const parsedArray = modifiedArray.map(element => element.map(Number));

        // Step 3: Flatten the array
        const flattenedArray = parsedArray.flat();

        console.log(flattenedArray);

        // Create an object to store the frequency of each number
        const frequency = {};

        // Count the frequency of each number
        flattenedArray.forEach(num => {
            if (frequency[num]) {
                frequency[num]++;
            } else {
                frequency[num] = 1;
            }
        });
        const finalArray = []
        for (const num in frequency) {
            if (frequency.hasOwnProperty(num)) {
                const ceremony = await pool.query(`SELECT ceremony_name FROM ceremony WHERE id=$1`, [parseInt(num)]);
                //  console.log(user_id, parseInt(num), ceremony.rows[0].ceremony_name, frequency[num]);

                //user_id and event_id already exists then update the values
                const valueExists = await pool.query('SELECT id FROM user_event_count WHERE user_id=$1 AND event_id=$2', [user_id, parseInt(num)]);

                if (valueExists.rowCount > 0) {
                    await pool.query('UPDATE user_event_count SET count = $1 WHERE user_id=$2 AND event_id=$3', [frequency[num], user_id, parseInt(num)]);
                }

                else {

                    const result = await pool.query('INSERT INTO user_event_count (user_id,event_id,user_event_name,count) VALUES($1,$2,$3,$4)', [user_id, parseInt(num), ceremony.rows[0].ceremony_name, frequency[num]])
                }
                // console.log(`${ceremony.rows[0].ceremony_name} comes ${frequency[num]} times`);
                finalArray.push(`${ceremony.rows[0].ceremony_name} comes ${frequency[num]} times`);

            }
        }
        const output = await pool.query(`SELECT user_event_name,count FROM user_event_count WHERE user_id=$1;`, [user_id]);
        console.log(finalArray);
        res.status(200).send(output.rows).end();

    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();

    }

}
/*   original data with ids
93	205	"{""69"",""78""}"
91	68	"{""64"",""69""}"
*/
const getTotalCeremonyByText =async (req,res) =>{
    const { user_id } = req.params;
    try {

        const foodData = await pool.query("SELECT response FROM responses WHERE user_id=$1 AND question_id=6;", [user_id]);

        if (foodData.rowCount < 1) {
            res.status(404).json({ msg: "no data found for this field" });
            return;
        }
        const FD = foodData.rows;
        const combinedArray = [];

        FD.forEach(element => {
            const numberStrings = element.response.slice(1, -1).split(',').map(str => str.trim().replace(/"/g, ''));

            combinedArray.push(...numberStrings);
        });

        const frequency = {};

        // Loop through the array
        for (const element of combinedArray) {
            // Check if the element exists in the frequency object
            if (frequency[element]) {
                // If it exists, increment the count
                frequency[element]++;
            } else {
                // If it doesn't exist, initialize the count to 1
                frequency[element] = 1;
            }
        }

        // The 'frequency' object now contains the counts of each element
      
        console.log(combinedArray);
        console.log(frequency);

        res.status(200).send(frequency).end();

    
    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();
    }
}

// ************************************************** 1 ************************************************ */



//************************************************** 2 ************************************************ */
const getFoodCount = async (req, res) => {
    const user_id = req.params.id;

    try {
        const rawResult = await pool.query(`SELECT response FROM responses WHERE user_id = $1 AND question_id =7;`, [user_id]);
        const rd = rawResult.rows;
        const combinedArray = [];

        rd.forEach(element => {
            const numberStrings = element.response.slice(1, -1).split(',').map(str => str.trim().replace(/"/g, ''));
            const parsedArray = numberStrings.map(Number);
            combinedArray.push(...parsedArray);
        });

        console.log(combinedArray);

        // Create an object to store the frequency of each number
        const frequency = {};

        // Count the frequency of each number
        combinedArray.forEach(num => {
            if (frequency[num]) {
                frequency[num]++;
            } else {
                frequency[num] = 1;
            }
        });
        const finalArray = []
        for (const num in frequency) {
            if (frequency.hasOwnProperty(num)) {
                const food = await pool.query(`SELECT food_name FROM foods WHERE id=$1`, [parseInt(num)]);
                console.log(user_id, parseInt(num), food.rows[0].food_name, frequency[num]);

                //user_id and event_id already exists then update the values
                const valueExists = await pool.query('SELECT id FROM user_food_count WHERE user_id=$1 AND food_id=$2', [user_id, parseInt(num)]);

                if (valueExists.rowCount > 0) {
                    await pool.query('UPDATE user_food_count SET count = $1 WHERE user_id=$2 AND food_id=$3', [frequency[num], user_id, parseInt(num)]);
                }

                else {

                    const result = await pool.query('INSERT INTO user_food_count (user_id,food_id,user_food_name,count) VALUES($1,$2,$3,$4)', [user_id, parseInt(num), food.rows[0].food_name, frequency[num]])
                }
                // console.log(`${food.rows[0].food_name} comes ${frequency[num]} times`);
                finalArray.push(`${food.rows[0].food_name} comes ${frequency[num]} times`);

            }
            //    console.log(num," ",frequency[num]);
        }
        const output = await pool.query(`SELECT user_food_name,count FROM user_food_count WHERE user_id=$1;`, [user_id]);
        console.log(finalArray);
        res.status(200).send(output.rows).end();

    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();
    }
}
 

/** current data
// u_id-118  g_id-91 q_id-7 response-{"5","6","7","8","9","10","14"}
   u_id-118  g_id-95 q_id-7 response-{"5","6","7","8","9","10","14"}
*/

const getFoodCountWithTextResponse = async (req, res) => {
    const { user_id } = req.params;
    try {

        const foodData = await pool.query("SELECT response FROM responses WHERE user_id=$1 AND question_id=7;", [user_id]);

        if (foodData.rowCount < 1) {
            res.status(404).json({ msg: "no data found for this field" });
            return;
        }
        const FD = foodData.rows;
        const combinedArray = [];

        FD.forEach(element => {
            const numberStrings = element.response.slice(1, -1).split(',').map(str => str.trim().replace(/"/g, ''));

            combinedArray.push(...numberStrings);
        });

        const frequency = {};

        // Loop through the array
        for (const element of combinedArray) {
            // Check if the element exists in the frequency object
            if (frequency[element]) {
                // If it exists, increment the count
                frequency[element]++;
            } else {
                // If it doesn't exist, initialize the count to 1
                frequency[element] = 1;
            }
        }

        // The 'frequency' object now contains the counts of each element
      
        console.log(combinedArray);
        console.log(frequency);

        res.status(200).send(frequency).end();

    
    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();
    }

}
//************************************************** 2 ************************************************ */



const getAllergies = async (req, res) => {

    const user_id = req.params.id;
    try {
        const rawResult = await pool.query(`SELECT COUNT(*) AS yes_count
        FROM responses
        WHERE user_id = $1
          AND question_id = 8
          AND response = 'yes';`, [user_id]);
        const rd = rawResult.rows[0];

        console.log(rd);

        res.status(200).json({ "Yes_Count": parseInt(rd.yes_count) }).end();

    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();
    }

}


const getTotalPersonalAssistance = async (req, res) => {

    const user_id = req.params.id;
    try {
        const rawResult = await pool.query(`SELECT COUNT(*) AS yes_count
        FROM responses
        WHERE user_id = $1
          AND question_id = 9
          AND response = 'yes';`, [user_id]);
        const rd = rawResult.rows[0];

        console.log(rd);

        res.status(200).json({ "Yes_Count": parseInt(rd.yes_count) }).end();

    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();
    }

}


const getTotalMUA = async (req, res) => {

    const user_id = req.params.id;
    try {
        const rawResult = await pool.query(`SELECT COUNT(*) AS yes_count
        FROM responses
        WHERE user_id = $1
          AND question_id = 13
          AND response = 'yes';`, [user_id]);
        const rd = rawResult.rows[0];

        console.log(rd);

        res.status(200).json({ "Yes_Count": parseInt(rd.yes_count) }).end();

    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();
    }

}


const getTotalSareeAssistance = async (req, res) => {

    const user_id = req.params.id;
    try {
        const rawResult = await pool.query(`SELECT COUNT(*) AS yes_count
        FROM responses
        WHERE user_id = $1
          AND question_id = 15
          AND response = 'yes';`, [user_id]);
        const rd = rawResult.rows[0];

        console.log(rd);

        res.status(200).json({ "Yes_Count": parseInt(rd.yes_count) }).end();
    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();
    }

}


const getTotalTurbanAssistance = async (req, res) => {

    const user_id = req.params.id;
    try {
        const rawResult = await pool.query(`SELECT COUNT(*) AS yes_count
        FROM responses
        WHERE user_id = $1
          AND question_id = 16
          AND response = 'yes';`, [user_id]);
        const rd = rawResult.rows[0];

        console.log(rd);

        res.status(200).json({ "Yes_Count": parseInt(rd.yes_count) }).end();
    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();
    }

}


const getTotalDhotiAssistance = async (req, res) => {

    const user_id = req.params.id;
    try {
        const rawResult = await pool.query(`SELECT COUNT(*) AS yes_count
        FROM responses
        WHERE user_id = $1
          AND question_id = 17
          AND response = 'yes';`, [user_id]);
        const rd = rawResult.rows[0];

        console.log(rd);

        res.status(200).json({ "Yes_Count": parseInt(rd.yes_count) }).end();

    } catch (error) {
        res.status(500).json({
            message: error.message
        }).end();
    }

}


const getGuestListWithMembers = async (req, res) => {
    const user_id = req.params.id;
    try {
        // Query to select distinct guest_id values for the user_id
        const distinctGuestIdsQuery = `
            SELECT DISTINCT guest_id
            FROM responses
            WHERE user_id = $1
        `;

        const distinctGuestIdsResult = await pool.query(distinctGuestIdsQuery, [user_id]);

        if (distinctGuestIdsResult.rowCount < 1) {
            res.status(400).json({ msg: "no guest response was found this guest", Yes_Count: 0 });
            return;
        }

        // Extract the distinct guest_id values from the result
        const distinctGuestIds = distinctGuestIdsResult.rows.map(row => row.guest_id);
        console.log(distinctGuestIds);

        //get number of guests attending along with the guest 

        //console.log(getTotalGuestsOfGuest);

        // console.log(parseInt(getTotalGuestsOfGuest.rows[0].response));
        for (let index = 0; index < distinctGuestIds.length; index++) {
            const element = distinctGuestIds[index];

            const getTotalGuestsOfGuest = await pool.query(`SELECT response,guest_id,user_id FROM responses WHERE user_id=$1 AND guest_id=$2 AND question_id=29;`, [user_id, element]);
            if (getTotalGuestsOfGuest.rowCount > 0) {

                await pool.query(`UPDATE guests SET guests_of_guest =$1  WHERE user_id=$2 AND id=$3;`, [parseInt(getTotalGuestsOfGuest.rows[0].response), user_id, element]);
            }

        }
        // Query to select guest details based on the distinct guest_id values
        const guestDetailsQuery = `
            SELECT *
            FROM guests
            WHERE id = ANY($1::int[])
        `;

        const guestDetailsResult = await pool.query(guestDetailsQuery, [distinctGuestIds]);


        // Send the guest details as JSON response
        res.status(200).json(guestDetailsResult.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving guest details.' });
    }

}


const getGuestListByCeremony = async (req, res) => {
    const { user_id, ceremony_id } = req.params;
    console.log(user_id, ceremony_id );

    try {

      if (user_id === null || user_id === undefined || ceremony_id === null || ceremony_id == undefined) {
        res.status(400).json({ msg: "user_id or ceremony_id is missing" });
        return;
    }
    
        const groups = await pool.query(
            `SELECT c.user_id,c.ceremony_id,cer.ceremony_name,c.group_id,gst.id,gst.guest_name,
            gst.guests_of_guest,
            c.selected,g.groupname,c.invitation_type,ci.icon_link
            FROM ceremony_groups as c 
            JOIN groups as g ON c.group_id=g.id 
            JOIN guests as gst ON gst.group_id=g.id
            JOIN ceremony as cer ON cer.id =c.ceremony_id
		      	LEFT JOIN ceremony_icons as ci ON ci.id=cer.icon
            WHERE c.user_id =  $1 AND c.ceremony_id=$2`,
            [user_id, ceremony_id]
        );
  
        if (groups.rowCount < 1) {
            res.status(400).json({ msg: "no guest response was found "});
            return;
        }
        const formattedData = formatData(groups.rows);

        // Send the formatted data as the response
        res.status(200).json(formattedData);


    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving guest details.' });
    }

}


function formatData(rows) {
    console.log(rows);
    
    const formattedData = {
        user_id: rows[0].user_id,
        ceremony: rows[0].ceremony_name,
        ceremony_id: rows[0].ceremony_id,
        Groups: []
    };
    rows.forEach(item => {
        const { group_id, selected, groupname, invitation_type,id, guest_name, guests_of_guest,icon_link } = item;

        formattedData.Groups.push({

            group_id,
            selected,
            groupname,
            invitation_type,
            guests: [
                {   
                    id,
                    guest_name,
                    guests_of_guest
                }
            ],
            icon_link


        });
    });
    console.log(formattedData);
    return formattedData;
}


//************************************************** 3 ************************************************ */
const getDrinkPreference = async (req, res) => {
    const user_id = req.params.id;

    try {

        const distinctGuestIdsQuery = `
            SELECT DISTINCT guest_id
            FROM responses
            WHERE user_id = $1
        `;

        const distinctGuestIdsResult = await pool.query(distinctGuestIdsQuery, [user_id]);


        if (distinctGuestIdsResult.rowCount < 1) {
            res.status(400).json({ msg: "no guest response was found this guest", Yes_Count: 0 });
            return;
        }

        // const firstpreference = await pool.query("SELECT  guest_id,response FROM responses WHERE user_id=$1 AND question_id=10", [user_id]);

        // const fdrinkdata = firstpreference.rows;
        // console.log(fdrinkdata.length);
        // console.log(fdrinkdata[0]);
        // console.log(fdrinkdata[1]);
        // console.log(firstpreference.rowCount);
        // for (let index = 0; index < fdrinkdata.length; index++) {

        //     const drinknameFromDb = await pool.query("SELECT drink_name FROM drinks WHERE id=$1", [parseInt(fdrinkdata[index].response)]);
        //     console.log(drinknameFromDb.rows[0].drink_name);
        // }

        const query = `SELECT 
        r.guest_id,
        gst.guest_name,
        COALESCE(MAX(CASE WHEN r.question_id = 10 THEN d.drink_name ELSE '0' END), '0') as first_preference,
        COALESCE(MAX(CASE WHEN r.question_id = 11 THEN d.drink_name ELSE '0' END), '0') as second_preference
    FROM responses as r
    JOIN guests AS gst ON gst.id = r.guest_id
    LEFT JOIN drinks as d ON D.drink_name = r.response
    WHERE r.user_id = $1 AND (r.question_id = 10 OR r.question_id = 11)
    GROUP BY r.guest_id, gst.guest_name`;
        const result = await pool.query(query, [user_id]);

        res.status(200).json(result.rows);



    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving guest details.' });
    }

}

/* orignal data
96	113	"15"
95	98	"18"

    const query = `SELECT 
        r.guest_id,
        gst.guest_name,
        COALESCE(MAX(CASE WHEN r.question_id = 10 THEN d.drink_name ELSE '0' END), '0') as first_preference,
        COALESCE(MAX(CASE WHEN r.question_id = 11 THEN d.drink_name ELSE '0' END), '0') as second_preference
    FROM responses as r
    JOIN guests AS gst ON gst.id = r.guest_id
    LEFT JOIN drinks as d ON D.id = CAST(r.response AS integer)
    WHERE r.user_id = $1 AND (r.question_id = 10 OR r.question_id = 11)
    GROUP BY r.guest_id, gst.guest_name`;
*/


//************************************************** 3 ************************************************ */


const getAllResponseDataForGuest = async (req, res) => {
    const { user_id, guest_id } = req.params;
    try {
        const query = `
        SELECT r.user_id,r.guest_id,r.question_id,q.question_text,r.response 
        FROM responses as r LEFT JOIN questions as q ON q.question_id=r.question_id
        WHERE user_id=$1 AND guest_id=$2`;
        const result = await pool.query(query, [user_id, guest_id]);
        const formattedData = formatAllData(result.rows);
        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving guest details.' });
    }

}


function formatAllData(rows) {
    const formattedData = {
        user_id: rows[0].user_id,
        guest_id: rows[0].guest_id,
        Data: []
    };
    rows.forEach(item => {
        const { question_id,question_text, response } = item;

        formattedData.Data.push({

            question_id,
            question:question_text,
            response
            
        });
    });
   // console.log(formattedData);
    return formattedData;
}



const insertIntoCA = async (req, res) => {
    
    const {user_id, event_id, guest_id, invited_for, attending}=req.body;

    try {
         const insertQuery = `
            INSERT INTO ceremony_attendance (user_id, event_id, guest_id, ceremony_invited_for, ceremony_attending)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await pool.query(insertQuery, [user_id, event_id, guest_id, invited_for, attending]);
        const result = await pool.query(`SELECT * FROM ceremony_attendance WHERE user_id=$1 AND event_id=$2 AND guest_id=$3`, [user_id, event_id, guest_id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving guest details.' });
    
}
}


const getCeremonyAttendance = async (req, res) => {
    const { user_id ,event_id} = req.params;
    try {
      
        const Allceremony=await  pool.query('SELECT ceremony_invited_for,ceremony_attending FROM ceremony_attendance WHERE user_id=$1 AND event_id=$2',[user_id,event_id]);

        const combinedArray=Allceremony.rows;
        console.log(combinedArray);


// Use map to extract the nested arrays and flatten them
const flattenedData = combinedArray.map((item) => {
    const ceremony_invited_for = item.ceremony_invited_for || [];
    const ceremony_attending = item.ceremony_attending || [];
    return {
      ceremony_invited_for,
      ceremony_attending,
    };
  });
  
  // Use reduce to combine all objects into one
  const result = flattenedData.reduce(
    (acc, item) => {
      acc.ceremony_invited_for.push(...item.ceremony_invited_for);
      acc.ceremony_attending.push(...item.ceremony_attending);
      return acc;
    },
    { ceremony_invited_for: [], ceremony_attending: [] }
  );
  
  console.log(result);
  const resultArray =[]
  resultArray.push(result);
  const combinedArrays = resultArray.reduce(
    (acc, item) => {
      acc.ceremony_invited_for.push(...item.ceremony_invited_for);
      acc.ceremony_attending.push(...item.ceremony_attending);
      return acc;
    },
    { ceremony_invited_for: [], ceremony_attending: [] }
  );
  
  // Function to calculate the frequency of each element in an array
  function calculateFrequency(arr) {
    const frequency = {};
    for (const element of arr) {
      if (frequency[element]) {
        frequency[element]++;
      } else {
        frequency[element] = 1;
      }
    }
    return frequency;
  }
  
  // Calculate frequency for invited_for and attending
  const frequencyInvitedFor = calculateFrequency(combinedArrays.ceremony_invited_for);
  const frequencyAttending = calculateFrequency(combinedArrays.ceremony_attending);
  
//   console.log('Attendance for Ceremonies guest invited for:', frequencyInvitedFor);
//   console.log('Attendance for Ceremonies guests are attending:', frequencyAttending);
        
        res.json({"Invitations": frequencyInvitedFor,"Attendees": frequencyAttending});
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving guest details.' });
    }
    
}


const getGuestId= async (req, res) => {
    const {user_id, item } = req.params;
  
    try {
      // Query the database to get guest_ids
      const result = await pool.query(
        'SELECT DISTINCT guest_id FROM responses WHERE user_id = $1 AND $2 = ANY(string_to_array(response, \',\'))',
        [user_id,item]
      );
  
      const guestIds = result.rows.map((row) => row.guest_id);
      res.json({ guestIds });
    } catch (error) {
      console.error('Error querying the database:', error);
      res.status(500).json({ error: 'An error occurred while fetching guest_ids.' });
    }
  };


const allEventAttendance=async(req,res)=>{
    const {event_id}=req.params;
    try {
        const result=await pool.query(`
        SELECT DISTINCT
        guests.guest_name,
        guests.group_name,
        guests.mobile_number::text,
        guests.guest_name AS primary_guest,
        'Guest' AS attendee_type
    FROM
        responses
    JOIN
        guests ON guests.id = responses.guest_id
    WHERE
        responses.event_id = 69
    UNION
    SELECT DISTINCT
        gog.gog_name AS guest_name,
        guests.group_name,
        gog.mobile_number::text,
        guests.guest_name AS primary_guest,
        'Guest of Guest' AS attendee_type
    FROM
        responses AS r
    JOIN
        guests ON guests.id = r.guest_id
    JOIN
        guest_of_guests AS gog ON gog.guest_id = r.guest_id
    WHERE
        r.event_id = $1;
        `,[event_id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'No event attendance found for this event.' });
            return;
        }
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving event attendance.' });
    }
}


//get list of guests who said "yes" to question_id=9( personal assistance)
const getTotalPersonalAssistanceCombined=async(req,res)=>{
    const {user_id}=req.params;
    try {
        const result=await pool.query(`
        SELECT DISTINCT
    gog.gog_name AS gog_name,
    g.guest_name AS p_name,
    gog.mobile_number AS gog_mob,
    g.mobile_number AS PRI_MOB_NO,
    r.response,
    r.extra_details AS assistance,
    CASE
        WHEN gogr.question_id = 9 AND gogr.response = 'yes' THEN  gog.gog_name
        WHEN r.question_id = 9 AND r.response = 'yes' THEN g.guest_name
        ELSE 'No'
    END AS answered_by
FROM
    responses AS r
LEFT JOIN
    guests AS g ON g.id = r.guest_id
LEFT JOIN
    guest_of_guests AS gog ON gog.guest_id = r.guest_id
LEFT JOIN
    guest_of_guests_response_withohut_array AS gogr ON gogr.gog_id = gog.id
WHERE
    r.question_id = 9 AND r.user_id=$1;
        `,[user_id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'No event attendance found for this event.' });
            return;
        }
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving event attendance.' });
    }
}


//GET list of guests who said "yes" to question_id=13 and responded to question_id=14
const getTotalMUAList=async(req,res)=>{
    const {user_id}=req.params;
    try {
        const result=await pool.query(`
        SELECT DISTINCT
        gog.gog_name AS gog_name,
        g.guest_name as p_name,
        gog.mobile_number AS gog_mob,
        g.mobile_number as PRI_MOB_NO,
        r.response
        FROM responses AS r 
        LEFT JOIN guests AS g ON g.id=r.guest_id
        LEFT JOIN guest_of_guests AS gog ON gog.guest_id=r.guest_id
        LEFT JOIN guest_of_guests_response_withohut_array AS gogr
        ON gogr.gog_id=gog.id
        WHERE r.question_id = 14 AND r.user_id=$1;
        `,[user_id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'No event attendance found for this event.' });
            return;
        }
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving event attendance.' });
    }
}


//get list of guests who said yes to ethinic wear
const getTotalEthinicWearlist=async(req,res)=>{
    const {user_id}=req.params;
    try {
        const result=await pool.query(`
     

SELECT 
guests.guest_name,
guests.group_name,
guests.mobile_number::text,
MAX(CASE WHEN r.question_id = 15 AND r.response = 'yes' THEN 'yes' ELSE null END) AS saree,
MAX(CASE WHEN r.question_id = 16 AND r.response = 'yes' THEN 'yes' ELSE null END) AS turban,
MAX(CASE WHEN r.question_id = 17 AND r.response = 'yes' THEN 'yes' ELSE null END) AS dhoti
FROM
responses AS r
LEFT JOIN
guests ON guests.id = r.guest_id
WHERE
r.question_id IN (15, 16, 17)
AND r.response = 'yes'
AND r.user_id = $1
GROUP BY
guests.guest_name,
guests.group_name,
guests.mobile_number

UNION ALL
SELECT 
gog.gog_name,
g.group_name,
gog.mobile_number::text,
MAX(CASE WHEN gogr.question_id = 15 AND gogr.response = 'yes' THEN 'yes' ELSE null END) AS saree,
MAX(CASE WHEN gogr.question_id = 16 AND gogr.response = 'yes' THEN 'yes' ELSE null END) AS turban,
MAX(CASE WHEN gogr.question_id = 17 AND gogr.response = 'yes' THEN 'yes' ELSE null END) AS dhoti
FROM
guest_of_guests_response_withohut_array as gogr
LEFT JOIN guest_of_guests as gog ON gog.id =gogr.gog_id
LEFT JOIN guests as g on g.id =gog.guest_id
WHERE
gogr.question_id IN (15, 16, 17)
AND gogr.response = 'yes'
AND gogr.user_id = $2
GROUP BY
gog.gog_name,
g.group_name,
gog.mobile_number;	
        `,[user_id,user_id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'No event attendance found for this event.' });
            return;
        }
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving event attendance.' });
    }
}


const getFlightListReport =async (req,res) =>{
const { user_id } = req.params;
try {
  const result = await pool.query(
    `SELECT
    g.guest_name AS guest_name,
    g.mobile_number AS guest_mob,
    g.email AS guest_email,
    MAX(CASE WHEN r.question_id = 19 THEN r.response END) AS flight_arrival_date,
    MAX(CASE WHEN r.question_id = 20 THEN r.response END) AS flight_departure_date,
    MAX(CASE WHEN r.question_id = 21 THEN r.response END) AS couple_hotel_stay,
    MAX(CASE WHEN r.question_id = 22 THEN
        CASE WHEN r.response = 'yes' THEN r.extra_details ELSE 'no' END
    END) AS how_many_room_required,
    MAX(CASE WHEN r.question_id = 25 THEN
        CASE WHEN r.response = 'yes' THEN r.extra_details ELSE 'no' END
    END) AS self_hotel_stay
FROM
    responses AS r
LEFT JOIN
    guests AS g ON g.id = r.guest_id
WHERE
    r.user_id =$1
    AND r.question_id IN (19, 20, 21, 22, 25)
GROUP BY
    g.guest_name,
    g.mobile_number,
    g.email
	
UNION ALL

SELECT
    gog.gog_name AS guest_name,
    gog.mobile_number AS guest_mob,
    gog.email AS guest_email,
    MAX(CASE WHEN gogr.question_id = 19 THEN gogr.response END) AS flight_arrival_date,
    MAX(CASE WHEN gogr.question_id = 20 THEN gogr.response END) AS flight_departure_date,
    MAX(CASE WHEN gogr.question_id = 21 THEN gogr.response END) AS couple_hotel_stay,
    MAX(CASE WHEN gogr.question_id = 22 THEN
        CASE WHEN gogr.response = 'yes' THEN gogr.extra_details ELSE 'no' END
    END) AS how_many_room_required,
    MAX(CASE WHEN gogr.question_id = 25 THEN
        CASE WHEN gogr.response = 'yes' THEN gogr.extra_details ELSE 'no' END
    END) AS self_hotel_stay
FROM
    guest_of_guests_response_withohut_array AS gogr
LEFT JOIN
    guest_of_guests AS gog ON gog.id = gogr.gog_id
WHERE
    gogr.user_id = $2
    AND gogr.question_id IN (19, 20, 21, 22, 25)
GROUP BY
    gog.gog_name,
    gog.mobile_number,
    gog.email;
        `,
    [user_id,user_id]
  );
  if (result.rowCount === 0) {
    res
      .status(404)
      .json({ error: "No event attendance found for this event." });
    return;
  }

  res.json(result.rows);
} catch (error) {
  console.error("Error executing query:", error);
  res
    .status(500)
    .json({ error: "An error occurred while retrieving event attendance." });
}

}


const getFoodListReport = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT
    
    MAX(g.guest_name) AS guest_name,
    MAX(g.mobile_number) AS mobile_number,
    MAX(CASE WHEN r.question_id = 7 THEN r.response ELSE null END) AS food,
    MAX(CASE WHEN r.question_id = 10 THEN r.response ELSE null END) AS first_preference,
    MAX(CASE WHEN r.question_id = 11 THEN r.response ELSE null END) AS second_preference
FROM
    responses as r
LEFT JOIN
    guests as g ON g.id = r.guest_id
WHERE
    r.user_id = $1
    AND r.question_id IN (7, 10, 11)
GROUP BY
    r.guest_id

UNION ALL

SELECT
    
    MAX(gog.gog_name) AS guest_name,
    MAX(gog.mobile_number) AS mobile_number,
    MAX(CASE WHEN gogr.question_id = 7 THEN gogr.response ELSE null END) AS food,
    MAX(CASE WHEN gogr.question_id = 10 THEN gogr.response ELSE null END) AS first_preference,
    MAX(CASE WHEN gogr.question_id = 11 THEN gogr.response ELSE null END) AS second_preference
FROM
    guest_of_guests_response_withohut_array AS gogr
LEFT JOIN
    guest_of_guests AS gog ON gog.id = gogr.gog_id
WHERE
    gogr.user_id = $2
    AND gogr.question_id IN (7, 10, 11)
GROUP BY
    gog.id;

        `,
      [user_id, user_id]
    );
    if (result.rowCount === 0) {
      res
        .status(404)
        .json({ error: "No event attendance found for this event." });
      return;
    }

    const formatedData=formatFood1(result.rows);
    console.log(formatedData);
    res.json(formatedData);
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving event attendance." });
  }
};


// Function to format the "food" column
function formatFood1(foodList) {
  const formattedFoodList = [];

  for (let index = 0; index < foodList.length; index++) {
    const element = foodList[index].food;

    if (element) {
      // Remove the leading and trailing double quotes and curly braces
      const trimmedString = element.replace(/^[{"]+|["}]+$/g, "");

      // Split the string by commas and trim each item
      const foodArray = trimmedString.split('","').map((item) => item.trim());

      // Add "Food" to the beginning of the array
      const formattedFood = ["Food", ...foodArray];

      // Push the formatted object into the result array
      formattedFoodList.push({
        guest_name: foodList[index].guest_name || "",
        mobile_number: foodList[index].mobile_number || "",
        food: formattedFood,
        first_preference: foodList[index].first_preference || "",
        second_preference: foodList[index].second_preference || "",
      });
    }
  }

  return formattedFoodList;
}



const getMehndiList = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      `
     WITH PrimaryGuest AS (
    SELECT
        g.id AS guest_id,
        g.guest_name AS name,
        g.mobile_number AS mobile_no,
        r30.response AS no_of_hands,
        r31.response AS palm_details
    FROM
        responses AS r12
    JOIN
        guests AS g
    ON
        r12.guest_id = g.id
    LEFT JOIN
        responses AS r30
    ON
        r12.guest_id = r30.guest_id
        AND r30.question_id = 30
    LEFT JOIN
        responses AS r31
    ON
        r12.guest_id = r31.guest_id
        AND r31.question_id = 31
    WHERE
        r12.question_id = 12
        AND r12.response = 'yes'
	AND r12.user_id = $1
),
SecondaryGuest AS (
    SELECT
        gog.guest_id AS guest_id,
        gog.gog_name AS name,
        gog.mobile_number AS mobile_no,
        gog_response30.response AS no_of_hands,
        gog_response31.response AS palm_details
    FROM
        PrimaryGuest AS pg
    JOIN
        guest_of_guests AS gog
    ON
        pg.guest_id = gog.guest_id
    JOIN
        guest_of_guests_response_withohut_array AS gog_response30
    ON
        gog.id = gog_response30.gog_id
        AND gog_response30.question_id = 30
    JOIN
        guest_of_guests_response_withohut_array AS gog_response31
    ON
        gog.id = gog_response31.gog_id
        AND gog_response31.question_id = 31
	WHERE gog_response31.user_id = $2
)
SELECT
    name,
    mobile_no,
    no_of_hands,
    palm_details
FROM
    PrimaryGuest
UNION ALL
SELECT
    name,
    mobile_no,
    no_of_hands,
    palm_details
FROM
    SecondaryGuest;


        `,
      [user_id, user_id]
    );
    if (result.rowCount === 0) {
      res
        .status(404)
        .json({ error: "No event attendance found for this event." });
      return;
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving event attendance." });
  }
};


const getGuestListByFnD =async (req,res) =>{
   const { user_id,ford } = req.params;
   try {



   } catch (error) {
     console.error("Error executing query:", error);
     res
       .status(500)
       .json({ error: "An error occurred while retrieving event attendance." });
   }

}



/*
const getResponseData = async (req, res) => {
  const { user_id,word } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT
      r.guest_id,
		g.guest_name,
		g.mobile_number,
      r.question_id,
      r.response
      FROM
        responses as r
	 LEFT JOIN 	guests as g  on g.id=r.guest_id
      WHERE
     r.user_id =$1
        AND  r.question_id IN (7, 10, 11)
 UNION ALL

  SELECT
        gog.id as guest_id,
		gog.gog_name as guest_name,
		gog.mobile_number as mobile_number,
        gogr.question_id as qestion_id,
        gogr.response as response
      FROM
        guest_of_guests_response_withohut_array as gogr
   	  LEFT JOIN guest_of_guests as gog ON gog.id =gogr.gog_id
      WHERE
        gogr.user_id =$2
        AND gogr.question_id IN (7, 10, 11);
      `,
      [user_id,user_id]
    );
    if (result.rowCount === 0) {
      res
        .status(404)
        .json({ error: "No event attendance found for this event." });
      return;
    }

    // Process the response data into the desired object structure
    const responseData = processResponseData(result.rows);

  //  console.log(result.rows);
  //  console.log(responseData);
    const matchingGuestIds = searchForWordInResponseData(responseData, word);

    res.json(matchingGuestIds);
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving event attendance." });
  }
};

// Function to process the response data
// Function to search for the given word in responseData and return matching guest_ids
// Function to search for the given word in responseData and return matching guest_ids
function searchForWordInResponseData(responseData, word) {
    const matchingGuests = [];
  
    for (const guestData of responseData) {
      const guestId = Object.keys(guestData)[0]; // Get the guest_id
      const responseArray = guestData[guestId]; // Get the responses array
  
      // Check if the word exists in the responseArray
      if (responseArray.includes(word)) {
        matchingGuests.push({
          guest_id: guestId,
          responses: responseArray,
          guest_name: guestData["guest_name"],
          mobile_number: guestData["mobile_number"],
        });
      }
    }
  
    return matchingGuests;
  }
  


// Function to process the response data
function processResponseData(responseList) {
    const responseData = [];
  
    for (let index = 0; index < responseList.length; index++) {
      const guestId = responseList[index].guest_id;
      const guestName = responseList[index].guest_name;
      const mobileNumber = responseList[index].mobile_number;
      const questionId = responseList[index].question_id;
      const response = responseList[index].response;
  
      // Find the guest object in responseData or create a new one
      let guestObject = responseData.find((guest) => guest[guestId]);
  
      if (!guestObject) {
        guestObject = {};
        guestObject[guestId] = [];
        guestObject["guest_name"] = guestName;
        guestObject["mobile_number"] = mobileNumber;
        responseData.push(guestObject);
      }
  
      // Process the "food" response (question 7)
      if (questionId === 7) {
        const formattedFood = formatFood(response);
        guestObject[guestId].push(...formattedFood);
      } else if (questionId === 10 || questionId === 11) {
        // Process the responses for questions 10 and 11
        guestObject[guestId].push(response);
      }
    }
  
    return responseData;
  }
  


// Function to format the "food" response
function formatFood(foodResponse) {
  if (foodResponse) {
    // Remove leading and trailing double quotes and curly braces
    const trimmedString = foodResponse.replace(/^[{"]+|["}]+$/g, "");
    // Split the string by commas and trim each item
    const foodArray = trimmedString.split('","').map((item) => item.trim());
    // Return the formatted array
    return [ ...foodArray];
  } else {
    // If foodResponse is null, return an empty array
    return [];
  }
}
*/
const getResponseData = async (req, res) => {
  const { user_id, word } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT
        r.guest_id,
        g.guest_name,
        g.mobile_number,
        r.question_id,
        r.response
      FROM
        responses as r
      LEFT JOIN guests as g ON g.id = r.guest_id
      WHERE
        r.user_id = $1
        AND r.question_id IN (7, 10, 11)
      UNION ALL
      SELECT
        gog.id as guest_id,
        gog.gog_name as guest_name,
        gog.mobile_number as mobile_number,
        gogr.question_id as question_id,
        gogr.response as response
      FROM
        guest_of_guests_response_withohut_array as gogr
      LEFT JOIN guest_of_guests as gog ON gog.id = gogr.gog_id
      WHERE
        gogr.user_id = $2
        AND gogr.question_id IN (7, 10, 11);
      `,
      [user_id, user_id]
    );
    if (result.rowCount === 0) {
      res
        .status(404)
        .json({ error: "No event attendance found for this event." });
      return;
    }

    // Process the response data into the desired object structure
    const responseData = processResponseData(result.rows);
    const matchingGuestIds = searchForWordInResponseData(responseData, word);

    res.json(matchingGuestIds);
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving event attendance." });
  }
};

// Function to process the response data
function processResponseData(responseList) {
  const responseData = [];

  for (let index = 0; index < responseList.length; index++) {
    const guestId = responseList[index].guest_id;
    const guestName = responseList[index].guest_name;
    const mobileNumber = responseList[index].mobile_number;
    const questionId = responseList[index].question_id;
    const response = responseList[index].response;

    // Find the guest object in responseData or create a new one
    let guestObject = responseData.find((guest) => guest[guestId]);

    if (!guestObject) {
      guestObject = {};
      guestObject[guestId] = {
        guest_name: guestName,
        mobile_number: mobileNumber,
        food: [],
        first_preference: null,
        second_preference: null,
      };
      responseData.push(guestObject);
    }

    // Process the "food" response (question 7)
    if (questionId === 7) {
      const formattedFood = formatFood(response);
      guestObject[guestId].food.push(...formattedFood);
    } else if (questionId === 10) {
      // Process the first_preference response (question 10)
      guestObject[guestId].first_preference = response;
    } else if (questionId === 11) {
      // Process the second_preference response (question 11)
      guestObject[guestId].second_preference = response;
    }
  }

  return responseData;
}

// Function to search for the given word in responseData and return matching guest_ids
function searchForWordInResponseData(responseData, word) {
  const matchingGuests = [];

  for (const guestData of responseData) {
    const guestId = Object.keys(guestData)[0]; // Get the guest_id
    const guestInfo = guestData[guestId]; // Get guest info object

    // Check if the word exists in the responses
    if (
      guestInfo.food.includes(word) ||
      guestInfo.first_preference === word ||
      guestInfo.second_preference === word
    ) {
      matchingGuests.push({
        guest_id: guestId,
        guest_name: guestInfo.guest_name,
        mobile_number: guestInfo.mobile_number,
        food: guestInfo.food,
        first_preference: guestInfo.first_preference,
        second_preference: guestInfo.second_preference,
      });
    }
  }

  return matchingGuests;
}

// Function to format the "food" response
function formatFood(foodResponse) {
  if (foodResponse) {
    // Remove leading and trailing double quotes and curly braces
    const trimmedString = foodResponse.replace(/^[{"]+|["}]+$/g, "");
    // Split the string by commas and trim each item
    const foodArray = trimmedString.split('","').map((item) => item.trim());
    // Return the formatted array
    return [...foodArray];
  } else {
    // If foodResponse is null, return an empty array
    return [];
  }
}



/*
const getResponseData = async (req, res) => {
    const { user_id, word } = req.params;
    try {
      const result = await pool.query(
        `
        SELECT
          guest_id,
          question_id,
          response
        FROM
          responses
        WHERE
          user_id = $1
          AND question_id IN (7, 10, 11)
        UNION ALL
        SELECT
          gog.guest_id as guest_id,
          gogr.question_id as qestion_id,
          gogr.response as response
        FROM
          guest_of_guests_response_withohut_array as gogr
        LEFT JOIN guest_of_guests as gog ON gog.id =gogr.gog_id
        WHERE
          gogr.user_id =$2
          AND gogr.question_id IN (7, 10, 11);
        `,
        [user_id, user_id]
      );
      if (result.rowCount === 0) {
        res
          .status(404)
          .json({ error: "No event attendance found for this event." });
        return;
      }
  
      // Process the response data into the desired object structure
      const responseData = processResponseData(result.rows);
      console.log(responseData);
      const matchingGuestIds = searchForWordInResponseData(responseData, word);
  
      res.json(matchingGuestIds);
    } catch (error) {
      console.error("Error executing query:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving event attendance." });
    }
  };
  
  // Function to process the response data
  // Function to process the response data
function processResponseData(responseList) {
    const responseData = {};
  
    for (let index = 0; index < responseList.length; index++) {
      const guestId = responseList[index].guest_id;
      const questionId = responseList[index].question_id;
      const response = responseList[index].response;
  
      // If the guestId is not in the responseData object, create an array for it
      if (!responseData[guestId]) {
        responseData[guestId] = ['Food'];
      }
  
      // Process the "food" response (question 7)
      if (questionId === 7) {
        const formattedFood = formatFood(response);
        responseData[guestId] = [
          ...responseData[guestId],
          ...formattedFood,
        ];
      } else if (questionId === 10 || questionId === 11) {
        // Process the responses for questions 10 and 11
        responseData[guestId].push(response);
      }
    }
  
    return responseData;
  }
  
  
  // Function to search for the given word in responseData and return matching guest_ids
  function searchForWordInResponseData(responseData, word) {
    const matchingGuestIds = [];
  
    for (const guestId in responseData) {
      const { food, preferences } = responseData[guestId];
      const allResponses = [...food, ...preferences];
  
      // Check if the word exists in any of the responses
      if (allResponses.includes(word)) {
        matchingGuestIds.push(guestId);
      }
    }
  
    return matchingGuestIds;
  }
  
  // Function to format the "food" response
  function formatFood(foodResponse) {
    if (foodResponse) {
      // Remove leading and trailing double quotes and curly braces
      const trimmedString = foodResponse.replace(/^[{"]+|["}]+$/g, "");
      // Split the string by commas and trim each item
      const foodArray = trimmedString.split('","').map((item) => item.trim());
      // Return the formatted array
      return [...foodArray];
    } else {
      // If foodResponse is null, return an empty array
      return [];
    }
  }
  
*/

module.exports = {
  getTotalRsvpResponses,
  getAllergies,
  getTotalPersonalAssistance,
  getTotalMUA,
  getTotalSareeAssistance,
  getTotalTurbanAssistance,
  getTotalDhotiAssistance,
  getDrinkPreference,
  getGuestListWithMembers,
  getGuestListByCeremony,
  getFoodCount,
  getTotalCeremony,
  getAllResponseDataForGuest,
  getFoodCountWithTextResponse,
  getTotalCeremonyByText,
  insertIntoCA,
  getCeremonyAttendance,
  getGuestId,
  allEventAttendance,
  getTotalPersonalAssistanceCombined,
  getTotalMUAList,
  getTotalEthinicWearlist,
  getFlightListReport,
  getFoodListReport,
  getMehndiList,
  getGuestListByFnD,
  getResponseData,
};

