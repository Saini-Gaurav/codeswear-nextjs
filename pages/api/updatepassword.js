import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    let decreptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (
      decreptedPass == req.body.password &&
      req.body.password == req.body.cpassword
    ) {
      let dbuser = await User.findOneAndUpdate(
        { email: user.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.AES_SECRET
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
    }
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
