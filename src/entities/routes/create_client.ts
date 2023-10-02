import express from "express"
import { Client } from "../Client"

const router = express.Router()

router.post("/api/client", async (req, res) => {
   //    res.send("Hello World")
   const { id, firstName, lastName, email, cardNumber, balance, middleName } = req.body
   // constructing object in memory
   const client = Client.create({
      id,
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      email,
      card_number: cardNumber,
      balance,
   })

   await client.save()
   return res.json(client)
   //   await Client.save()
   //   .then((client) => {
   //      res.send(client)
   //   })
   //   .catch((error) => {
   //      console.log(error)
   //      res.status(500).send("Something went wrong")
   //   })
})

export { router as createClientRouter }
