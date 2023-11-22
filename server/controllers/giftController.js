const pool = require("../database/connection.js").pool;

// Create a new user gift
const createUserGift = async (req, res) => {
  try {
    const {
      user_id,
      guest_id,
      guest_name,
      gift_received,
      gift_type,
      gift_value,
      notes,
    } = req.body;
    const query =
      "INSERT INTO user_gifts (user_id, guest_id, guest_name, gift_received, gift_type, gift_value, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
    const values = [
      user_id,
      guest_id,
      guest_name,
      gift_received,
      gift_type,
      gift_value,
      notes,
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating user gift:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user gift." });
  }
};

// Get user gifts by user_id
const getUserGifts = async (req, res) => {
  try {
    console.log("0",Date.now());
    const user_id = req.params.user_id;
    const query = "SELECT * FROM user_gifts WHERE user_id = $1";
    const result = await pool.query(query, [user_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting user gifts:", error);
    res
    .status(500)
    .json({ error: "An error occurred while fetching user gifts." });
  }
};

const getAllUSerGifts = async (req, res) => {
  const a=Date.now();
  console.log("0",Date.now()-a);
  const user_id = req.params.id;
   const cid = req.params.cid;
   try{
    console.log("1",Date.now()-a);
const guests = await pool.query(`
SELECT gog.id,gog.gog_name as guest_name,gog.email,gog.mobile_number,g.group_name,
c.ceremony_name
FROM guest_of_guests as gog left join guests as g on g.id=gog.guest_id
LEFT JOIN ceremony_groups as cg on cg.group_id=g.group_id
LEFT JOIN ceremony as c on c.id = cg.ceremony_id
WHERE g.user_id=$1 and c.id=$2
union all
SELECT g.id, g.guest_name,g.email, g.mobile_number ,g.group_name ,
c.ceremony_name
FROM guests as g
LEFT JOIN ceremony_groups as cg on cg.group_id=g.group_id
LEFT JOIN ceremony as c on c.id = cg.ceremony_id
WHERE g.user_id=$3 and c.id=$4;`
,[parseInt(user_id),parseInt(cid),parseInt(user_id),parseInt(cid)]);
//    // console.log(guests.rows);
console.log("2",Date.now()-a);   
const guestlist= guests.rows;
   
   // console.log(guestlist);
   for (let index = 0; index < guestlist.length; index++) {
    const element = guestlist[index];
    // console.log(element.id);
    const isValue=await pool.query('SELECT id from user_gifts WHERE user_id=$1 AND guest_id=$2',[user_id,element.id])
    if(isValue.rowCount<1)
   {
   await pool.query(`INSERT INTO user_gifts (user_id, guest_id, guest_name,email,number,"group",ceremony) VALUES ($1, $2, $3, $4, $5, $6, $7)`,[parseInt(user_id),element.id,element.guest_name,element.email,element.mobile_number,element.group_name,element.ceremony_name]);

   }
   }
   console.log("3",Date.now()-a);
    const query = 'SELECT * FROM user_gifts WHERE user_id=$1';
    const result = await pool.query(query,[user_id]);
    console.log("4",Date.now()-a);
     res.status(200).json(result.rows);
     console.log(Date.now()-a);
  } catch (error) {
    console.error("Error getting user gifts:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user gifts." });
  }
};

// Update a user gift by id
const updateUserGift = async (req, res) => {
  try {
   
    const giftData =req.body;

    for (let index = 0; index < giftData.length; index++) {
      const element = giftData[index];
      // for (let innerindex = 0; innerindex < element.length; innerindex++) {
      //   const element = element[innerindex];
      //}
      const {
        user_id,
        id,
        guest_of,
        gift_received_data,
      } = element;
      const query =
        "UPDATE user_gifts SET guest_of=$1, gift_received = $2, gift_type = $3, gift_value = $4, notes = $5 WHERE id = $6 AND user_id=$7";
      const values = [
        guest_of,
        gift_received_data.gift_received,
        gift_received_data.gift_type,
        gift_received_data.gift_value,
        gift_received_data.notes,
        id,
        user_id
      ];
      await pool.query(query, values);
      
      
    }
    res.status(200).json({ message: "User gift updated successfully." });
  } catch (error) {
    console.error("Error updating user gift:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user gift." });
  }
};

// Delete a user gift by id
const deleteUserGift = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM user_gifts WHERE id = $1";
    await pool.query(query, [id]);
    res.status(200).json({ message: "User gift deleted successfully." });
  } catch (error) {
    console.error("Error deleting user gift:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user gift." });
  }
};

module.exports = {
  createUserGift,
  getUserGifts,
  updateUserGift,
  deleteUserGift,
  getAllUSerGifts,
};
