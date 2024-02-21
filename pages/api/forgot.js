import Forgot from "@/models/Forgot";
import User from "@/models/User";

export default async function handler(req, res) {
  // Check if the user is exists in the database
  // Send an email to the user
  if (req.body.sendMail) {
    let token = `jhcbsdfyfeyff785832753bbjdh44`;
    let forgot = new Forgot({
      email: req.body.email,
      token: token
    });
    let email = `To reset your password please follow the below link
    <a href="https://codeswear.com/forgot?token=${token}">Click here to reset the password</a>`;
  } else {
    //Reset User Password
  }
  res.status(200).json({ success: true });
}
