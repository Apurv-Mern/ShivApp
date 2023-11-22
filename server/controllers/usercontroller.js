
const jwt = require('jsonwebtoken');
const { findUserByNumber, otpSignin } = require("./user");


module.exports.signwithOTP = async (req, res) => {
 
    const { number,otp } = req.body;
  
    try {
        const valid_number = await findUserByNumber(number);
        if(valid_number){
            return res.status(401).json({ error: "invalid number" });
        }
        const valid_otp= await otpSignin(otp);
        if(!valid_otp){
            return res.status(401).json({ error: "invalid otp" });
        }
        const accessToken = jwt.sign({ number }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 });
        const refreshToken = jwt.sign({ number }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
        res.status(200).json({ "msg": "signed in successufully", "accessToken:": accessToken, "refreshToken": refreshToken });
     
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  };