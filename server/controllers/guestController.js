const { body, validationResult } = require("express-validator");
const pool = require('../database/connection.js').pool;
const multer = require("multer");
const XLSX = require("xlsx");

const validateGuest = [
  body("guest_name").trim().notEmpty().withMessage("Name must not be empty"),
  body("mobile_number")
    .isLength({ min: 10, max: 10 })
    .withMessage("Number must be exactly 10 digits"),
  body("email").isEmail().withMessage("Email must be a valid email address"),
  //body("gender").trim().notEmpty().withMessage("Gender dal bsdk"),

];


const getAllGuests = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const guests = await pool.query('SELECT * FROM guests');

    if (guests.rows[0] === 0) {
      res.end("no guest available")
    }
    res.json(guests.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createGuest = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });

  // }
  const user_id = req.params.id
  const { guest_name, mobile_number, email, group } = req.body;
  console.log(guest_name, mobile_number, email, group);

  try {

    const valid_group = await pool.query('SELECT groupname, id FROM groups WHERE groupname = $1 AND user_id=$2 ', [group, user_id])
    //console.log(valid_group.rows[0]);
    if (valid_group.rows.length < 1) {
      const groupresult = await pool.query('SELECT  id FROM groups WHERE groupname = $1 AND user_id=$2 ', ["Unassigned", user_id])
      const group_id = groupresult.rows[0].id;
      const groupname = "Unassigned";
      // Validate each field as per your requirements here

      await pool.query(
        "INSERT INTO guests (guest_name, mobile_number, email, group_name,group_id,user_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [guest_name, mobile_number, email, groupname, group_id, user_id]
      );
      return res.status(201).json({ msg: `Guest added to unassigned as "group" not mentioned or "group" ${group} does not exists ` });
    }
    else {
      const { id, groupname } = valid_group.rows[0];
      // Validate each field as per your requirements here
      //console.log(id);

      const newGuest = await pool.query(
        "INSERT INTO guests (guest_name, mobile_number, email, group_name,group_id,user_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [guest_name, mobile_number, email, groupname, id, user_id]
      );
      //   console.log(newGuest.rows[0]);
      res.status(201).json({ Msg: "Guest added successfully" });

    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGuestById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  try {
    const guest = await pool.query('SELECT * FROM guests WHERE id = $1', [id]);
    if (guest.rows.length > 0) {
      res.json(guest.rows[0]);
    } else {
      res.status(404).json({ message: 'Guest not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGuestsByGroup = async (req, res) => {
  const { user_id, groupname } = req.params;

  // console.log(user_id, groupname);
  try {
    const query = `
      SELECT id as guest_id, guest_name, mobile_number, email, group_name
      FROM guests
      WHERE user_id = $1 AND group_name = $2
      ORDER BY guest_name
    `;

    const result = await pool.query(query, [user_id, groupname]);
    res.json(result.rows);
  } catch (error) {
    // console.error('Error retrieving guests by group:', error);
    res.status(500).json({ error: 'Failed to retrieve guests by group' });
  }
};

const getAllGuestsForUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    //console.log(user_id);
    const query = `
      SELECT id, guest_name, mobile_number, email, group_name, guests_of_guest
      FROM guests
      WHERE user_id = $1
      ORDER BY guest_name
    `;

    const result = await pool.query(query, [user_id]);
    // console.log(result.rows[0]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving all guests for user:', error);
    res.status(500).json({ error: 'Failed to retrieve all guests for user' });
  }
};


const updateGuest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { guestId } = req.params;
  const { guest_name, mobile_number, email, group_name ,group_id} = req.body;
  // console.log(guest_name, mobile_number, email, group_name);
  try {
    await pool.query(
      "UPDATE guests SET guest_name = $1, mobile_number = $2, email = $3 ,group_name = $4 ,group_id=$5 WHERE id = $6",
      [guest_name, mobile_number, email, group_name,group_id, guestId]
    );
    res.json({ message: "Guest updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGuest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } ``
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM guests WHERE id = $1', [id]);
    res.json({ message: 'Guest deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//bulk upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const importGuests = async (req, res) => {

  const {user_id} = req.params;
 console.log("1",user_id);
  try {
 
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);
   console.log(2);
   console.log(data);
    for (let row of data) {
      const {
        guest_name,
        mobile_number,
        email,
        group} = row;
        console.log( guest_name,
          mobile_number,
          email,
          group);
      
      if (!guest_name && (!email || !mobile_number)) {
        res.status(400).json({ message: "Invalid data format" });
        return;
      }
     console.log(3);

      const valid_group = await pool.query('SELECT groupname, id FROM groups WHERE groupname = $1 AND user_id=$2', [group,user_id])
     console.log("212: ",valid_group.rowCount);
      if (valid_group.rowCount >0) {
       console.log(4);
        const group_id = valid_group.rows[0].id;
        const groupname =group;
        // Validate each field as per your requirements here
         console.log(groupname,group_id);
       console.log(5);

        await pool.query(
          "INSERT INTO guests (guest_name, mobile_number, email, group_name,group_id,user_id) VALUES ($1, $2, $3, $4, $5, $6)",
          [guest_name, mobile_number, email, groupname, group_id,user_id]
        );
        //return res.status(201).json({msg:`group ${group} does not exits`,validgrp:valid_group.rows[0]});
      }
      if(!group){
        console.log(6);
 
        const result = await pool.query("SELECT id FROM groups WHERE groupname = $1 AND user_id=$2", ["Unassigned",user_id]);
        const id = result.rows[0].id;
        console.log(id);
        console.log(7);
  
         await pool.query(
           "INSERT INTO guests (guest_name, mobile_number, email, group_name,group_id,user_id) VALUES ($1, $2, $3, $4, $5, $6)",
           [guest_name, mobile_number, email, "Unassigned", id,user_id]
         );
      }
     if(valid_group.rowCount <1)
      {
       console.log(8);

        // create a new group 
        const newGroup = await pool.query(
          'INSERT INTO groups (user_id, groupname) VALUES ($1, $2) RETURNING *',
          [user_id, group]
        );       
         const group_id=newGroup.rows[0].id;
         const groupname=newGroup.rows[0].groupname;
         await pool.query(
          "INSERT INTO guests (guest_name, mobile_number, email, group_name,group_id,user_id) VALUES ($1, $2, $3, $4, $5, $6)",
          [guest_name, mobile_number, email, groupname, group_id,user_id]
        );
          
       console.log(9);
       //  console.log(6);
        // Validate each field as per your requirements here
      }

    }
    console.log(10);

    res.status(201).json({ message: "Guests imported successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  validateGuest, // Export the validation middleware
  getAllGuests,
  getGuestsByGroup,
  getAllGuestsForUser,
  createGuest,
  getGuestById,
  updateGuest,
  deleteGuest,
  importGuests,
  upload,
};

