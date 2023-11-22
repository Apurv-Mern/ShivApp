// controllers/ceremonyController.js


const pool = require('../database/connection.js').pool;

const getAllEventsceremonyByUserId = async (req, res) => {
    const { user_id  }= req.params;
    try {
        const events = await pool.query(
          `
        SELECT c.id,c.ceremony_name,c.ceremony_time,c.ceremony_venue,c.event_id,c.ceremony_invitaion_type,c.user_id,c.selected,ci.icon_link
        FROM ceremony as c LEFT JOIN ceremony_icons as ci ON ci.id=c.icon WHERE  user_id=$1 order by c.id;`,
          [user_id]
        );
        res.json(events.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllEventsceremonyByUserIdOrderByDate = async (req, res) => {
    const { user_id  }= req.params;
    try {
        const events = await pool.query(
          `
        SELECT c.id,c.ceremony_name,c.ceremony_time,c.ceremony_venue,c.event_id,c.ceremony_invitaion_type,c.user_id,c.selected,ci.icon_link
        FROM ceremony as c LEFT JOIN ceremony_icons as ci ON ci.id=c.icon WHERE  user_id=$1 order by c.ceremony_time;`,
          [user_id]
        );
        res.json(events.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createCeremony = async (req, res) => {
    const user_id = req.body.id; 
    const { event_id, ceremony_name, ceremony_time, ceremony_venue} = req.body;

    try {
       const valid_ceremony=await pool.query(`SELECT ceremony_name FROM ceremony WHERE ceremony_name= $1 AND event_id = $2`,[ceremony_name,event_id])
       //console.log(valid_ceremony.rows[0]);
       if(valid_ceremony.rows[0]){
        //console.log(valid_ceremony.rows[0]);
        const result = await pool.query("UPDATE ceremony SET ceremony_name=$1, ceremony_time=$2, ceremony_venue=$3  WHERE event_id = $4 AND ceremony_name LIKE $5 RETURNING *", [ceremony_name, ceremony_time, ceremony_venue, event_id,ceremony_name]);
      //  console.log(result.rows[0]);
        res.json({ message: 'ceremony updated',"data":result.rows[0] });
       }
    else{

        const query =
        "INSERT INTO ceremony (event_id, ceremony_name, ceremony_time, ceremony_venue, user_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [event_id, ceremony_name, ceremony_time, ceremony_venue, user_id];
        
        const result = await pool.query(query, values);
        
        res.status(201).json(result.rows[0]);
    }
    } catch (error) {
      console.error("Error creating user ceremony:", error);
      res
        .status(500)
        .json({ error: "Failed to create user ceremony", msg: error.detail });
    }
};

// insert into ceremony_groups table with following columns: user_id, ceremony_id, group_data and Selected. where group_data is a array of groupnames with corresponding array of "selected"
 const createCeremonyGroups = async (req, res) => {
    const {user_id }=req.params
    const {  ceremonies }= req.body;
    // console.log(req.body);
     
     try {
        for (const ceremony of ceremonies) {
         const { ceremony_id, group_data } = ceremony;
        for (const group of group_data) {
            //if group_id is already present in ceremony_groups table then update the selected column
            const result= await pool.query(
                'SELECT  group_id FROM ceremony_groups WHERE group_id = $1 AND ceremony_id = $2',
                [group.group_id,ceremony_id]
            );
            if(result.rows.length>0){
                const singleGroup = group.invitation_type ? group.invitation_type : "you";
              //  console.log(singleGroup);
                await pool.query(
                    'UPDATE ceremony_groups SET selected = $1, invitation_type =$2 WHERE group_id = $3 AND ceremony_id = $4',
                    [group.selected,singleGroup,group.group_id,ceremony_id]
                );
            }
            else{
            const { group_id, selected } = group;
            // console.log("inner loop",group_id,selected);
            // Insert a new entry into the ceremony_groups table
            await pool.query(
                'INSERT INTO ceremony_groups (user_id, ceremony_id, group_id, selected, invitation_type) VALUES ($1, $2, $3, $4 ,$5)',
                [user_id, ceremony_id, group.group_id, group.selected, group.invitation_type]
            );
            }
        }
    }
    res.json({ message: 'ceremony groups created/Updated' });
}
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message }).end();
    }
 }

 //get ceremony groups by user id
 const getCeremonyGroupsByUserId = async (req, res) => {
    const { user_id  }= req.params;
   // console.log(user_id);
    try {
        const groups = await pool.query(
            `SELECT c.user_id,cer.ceremony_time,cer.ceremony_venue,c.ceremony_id,cer.ceremony_name,c.group_id,c.selected,g.groupname,c.invitation_type,ci.icon_link
            FROM ceremony_groups as c
            LEFT JOIN groups as g ON c.group_id=g.id 
            LEFT JOIN ceremony as cer ON cer.id =c.ceremony_id
            LEFT JOIN ceremony_icons as ci ON ci.id=cer.icon
                        WHERE c.user_id =  $1`,
            [user_id]
        );

        const formattedData = formatData(groups.rows);

        // Send the formatted data as the response
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function formatData(rows) {
    const formattedData = {
        user_id: rows[0].user_id,
        Ceremonies: []
      };
    rows.forEach(item => {
        const {  ceremony_id, ceremony_name, group_id, selected, groupname, invitation_type, icon_link, ceremony_time,ceremony_venue} = item;
  
        formattedData.Ceremonies.push({
          
            ceremony_id,
            ceremony_name,
            ceremony_time,
            ceremony_venue,
            groups: [
                {
                    group_id,
                    selected,
                    groupname,
                    invitation_type,
                    icon_link
                },
            ],
        });
    });
   // console.log(formattedData);
    return formattedData;
  }

  //to update all ceremony with event_id for a userz
const addEventForCeremony=async (req,res) =>{
    const { user_id,event_id  }= req.params;
 try {
    
     await pool.query('UPDATE ceremony SET event_id=$1 WHERE  user_id=$2;',[event_id,user_id]);
     res.status(201).json({msg:"Inserted/Updated event_id for ceremony"});
 }catch (error) {
    res.status(500).json({ error: error.message });
}

};

///to update individual ceremony with event_id for a user
// const addEventForCeremony=async (req,res) =>{
//     const { user_id,event_id ,ceremony_id }= req.params;
//  try {
    
//      await pool.query('UPDATE ceremony SET event_id=$1 WHERE id=$2 AND user_id=$3;',[event_id,ceremony_id,user_id]);
//      res.status(201).json({msg:"Inserted/Updated event_id for ceremony"});
//  }catch (error) {
//     res.status(500).json({ error: error.message });
// }

// };


const getEventceremonyById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await pool.query('SELECT * FROM ceremony WHERE event_id = $1 order by id', [id]);
        if (event.rows.length === 0) {
            return res.status(404).json({ message: 'ceremony not found' });
        }
        res.json(event.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEventceremony = async (req, res) => {
    const { user_id } = req.params;
    const {ceremonies }=req.body;
    try {
    for (let index = 0; index < ceremonies.length; index++) {
        const element = ceremonies[index];

        const { ceremony_id, ceremony_time, ceremony_venue,selected ,event_id} = element;
        //console.log(ceremony_id, ceremony_time, ceremony_venue,selected);
        await pool.query('UPDATE ceremony SET selected=$1, ceremony_time=$2, ceremony_venue=$3 ,event_id=$4 WHERE id = $5 AND user_id=$6', [selected,ceremony_time, ceremony_venue,event_id, ceremony_id,user_id]);
    }
    // if (!ceremony_name) {
    //     return res.status(400).json({ error: 'ceremony name is required' });
    // }
        res.json({ message: 'ceremony updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEventceremonyName =async (req, res) => {    
    const { user_id,event_id } = req.params;
    const {ceremonies}=req.body;

    try {
        for (let index = 0; index < ceremonies.length; index++) {
            const element = ceremonies[index];

           const res= await pool.query('UPDATE ceremony SET ceremony_name=$1 WHERE user_id=$2 AND id= $3', [element.ceremony_name,user_id,element.ceremony_id]);
        }

            res.status(201).json({ message: 'ceremony name updated' });
     
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const deleteEventceremony = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM ceremony WHERE id = $1', [id]);
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllEventsceremonyByUserId,
    addEventForCeremony,
    createCeremonyGroups,
    getCeremonyGroupsByUserId,
    createCeremony,
    getEventceremonyById,
    updateEventceremony,
    updateEventceremonyName,
    deleteEventceremony,
    getAllEventsceremonyByUserIdOrderByDate
};
