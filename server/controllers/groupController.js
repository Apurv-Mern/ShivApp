// controllers/groupController.js
const { body, validationResult } = require("express-validator");
const pool = require("../database/connection.js").pool;

const validateGroup = [
  body("groupname")
    .trim()
    .notEmpty()
    .withMessage("Group name must not be empty"),
  body("user_id")
    .isInt({ gt: 0 })
    .withMessage("Total members must be a positive integer"),
];

const getAllGroups = async (req, res) => {
  try {
    const groups = await pool.query("SELECT * FROM groups");
    res.json(groups.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGroup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { groupname, user_id } = req.body;
  try {
    const valid_group = await pool.query(
      'SELECT * FROM groups WHERE groupname = $1 AND user_id = $2',
      [groupname, user_id]
    );

    if (valid_group.rowCount > 0) {
      const result = await pool.query(
        'UPDATE groups SET groupname = $1,user_id=$2 WHERE groupname = $3 AND user_id = $4',
        [groupname, user_id, groupname, user_id]
      );
      res.status(201).json(result.rows[0]);
    } else {
      const newGroup = await pool.query(
        'INSERT INTO groups (user_id, groupname) VALUES ($1, $2) RETURNING *',
        [user_id, groupname]
        );
        const invitationCode=parseInt(user_id.toString()+newGroup.rows[0].id);
        const result = await pool.query(
          'UPDATE groups SET invitation_code = $1 WHERE id = $2',
          [invitationCode, newGroup.rows[0].id]
        );
        res.status(201).json(result.rows[0]);
      // res.status(201).json(newGroup.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGroupById = async (req, res) => {
  const user_id = req.params.id;
  try {
    const group = await pool.query("SELECT * FROM groups WHERE user_id = $1", [user_id]);
    if (group.rows.length > 0) {
      res.json(group.rows);
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGroup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { groupname, user_id } = req.body;
  try {
    await pool.query(
      "UPDATE groups SET groupname = $1, user_id = $2 WHERE id = $3",
      [groupname, user_id, id]
    );
    res.json({ message: "Group updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {

    const guestIdsQuery = `SELECT id as guest_id FROM guests WHERE group_id = $1`;
    const guestIdsResult = await pool.query(guestIdsQuery, [id]);
    const guestIds = guestIdsResult.rows.map(row => row.guest_id);

    console.log("Line 99 guestIds: ", guestIds);
    await pool.query(`DELETE FROM ceremony_attendance WHERE guest_id = ANY($1)`, [guestIds]);
    await pool.query(`DELETE FROM wedding_reminder_list WHERE guest_id = ANY($1)`, [guestIds]);
    await pool.query("DELETE FROM guests WHERE group_id = $1", [id]);
    await pool.query("DELETE FROM ceremony_groups WHERE group_id = $1", [id]);
    await pool.query("DELETE FROM ceremony_groups WHERE group_id = $1", [id]);
    await pool.query("DELETE FROM groups WHERE id = $1", [id]);
    res.json({ message: "Group deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//group invitation type

const insertOrUpdateGroupInvitationType = async (req, res) => {
  const { user_id, group_data } = req.body;
  try {

    for (const group of group_data) {

      // Check if the record exists for the given user_id and group_id
      const result = await pool.query(
        'SELECT  group_id FROM ceremony_groups WHERE group_id = $1 AND ceremony_id = $2',
        [group.group_id, ceremony_id]
      );
      if (result.rows.length > 0) {
        const singleGroup = group.invitation_type ? group.invitation_type : "you";
        //  console.log(singleGroup);
        await pool.query(
          'UPDATE ceremony_groups SET selected = $1, invitation_type =$2 WHERE group_id = $3 AND ceremony_id = $4',
          [group.selected, singleGroup, group.group_id, ceremony_id]
        );
      }
    }


    res.status(201).json('Success');
  } catch (error) {
    console.error('Error inserting/updating group_invitation_type:', error);
    throw error;
  }
};

const getGroupInvitationTypesByUserId = async (req, res) => {

  const { user_id } = req.params;
  console.log(req.params);
  try {
    // Retrieve the data based on user_id
    const result = await pool.query(
      'SELECT group_id, invitation_type FROM group_invitation_type WHERE user_id = $1',
      [user_id]
    );

    // Format the data
    const formattedData = {
      user_id,
      data: result.rows.map((row) => ({
        group_id: row.group_id,
        invitation_type: row.invitation_type,
      })),
    };

    res.json(formattedData);
  } catch (error) {
    console.error('Error retrieving group_invitation_type:', error);
    throw error;
  }
};

const getGuestCeremonyByCode = async (req,res)=> {
 const code = req.params.code;
 console.log("code");
 console.log(typeof code);
 try {
  if(!code) return res.status(400).json({"Msg":'no code was provided'});
 const ceremonyData= await pool.query(`
 select c.id,c.ceremony_name,c.ceremony_venue,c.ceremony_time
 from ceremony_groups as cg
 left join ceremony as c on c.id=cg.ceremony_id
 where cg.group_id in (
   select id from groups
 where invitation_code=$1
 );
 `,[code]);
 
 if (ceremonyData.rowCount<1) {
  return res.status(400).json({"Msg":`No ceremonies for this code - ${code}`});
 }
 res.json(ceremonyData.rows);
}
  catch (error) {
  console.log(error);
  res.status(500).send("some issues")
 }

}


module.exports = {
  validateGroup,
  getAllGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  insertOrUpdateGroupInvitationType,
  getGroupInvitationTypesByUserId,
  getGuestCeremonyByCode,
};
