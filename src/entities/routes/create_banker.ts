import express from "express"
import { Banker } from "../Banker"

const router = express.Router()

router.post("/api/banker", async (req, res) => {
   //    res.send("Hello World")
   const { id, firstName, lastName, email, employeeNumber, balance, middleName, cardNumber } = req.body
   // constructing object in memory
   const banker = Banker.create({
      id,
      first_name: firstName,
      last_name: lastName,
      email,
      employee_number: employeeNumber,
      card_number: cardNumber,
      balance,
      middle_name: middleName,
   })

   await banker.save()
   return res.json(banker)
})

export { router as createBankerRouter }
