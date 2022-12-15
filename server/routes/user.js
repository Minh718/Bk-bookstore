import express from "express";
const userRouter = express.Router();
import db from "../config/db.js";
userRouter.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  console.log(firstName, lastName, gender, phone, email, password);
  db.query(
    "INSERT INTO tbl_user (firstName, lastName, gender, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, gender, phone, email, password],
    (err, result) => {
      if (err) res.status(500).json("eror");
      else res.status(200).json("oke");
    }
  );
});
userRouter.post("/login", (req, res) => {
  const phoneEmail = req.body.phoneEmail;
  const password = req.body.password;
  console.log(phoneEmail);
  db.query(
    `SELECT * FROM tbl_user where email = ? or phone = ?`,
    [phoneEmail, phoneEmail],
    (err, result) => {
      if (err) {
        res.status(500).json("error");
      } else if (result.length === 0) {
        res.status(404).json({ phoneEmail: false });
      } else {
        const { password: passwordUser, ...rest } = result[0];
        if (password === passwordUser) {
          res.status(200).json(rest);
        } else {
          res.status(404).json({ phoneEmail: true });
        }
      }
    }
  );
});
export default userRouter;
