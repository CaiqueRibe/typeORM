import express from "express"
import { Transactions, TransactionTypes } from "../Transaction"
import { Client } from "../Client"

const router = express.Router()

router.post("/api/client/:clientId/transaction", async (req, res) => {
   const { clientId } = req.params
   const { amount, description, type } = req.body

   const client = await Client.findOne({ where: { id: parseInt(clientId) } })

   if (!client) {
      return res.status(404).json({ message: "Client not found" })
   }

   const transaction = Transactions.create({
      amount,
      type,
      client,
   })

   await transaction.save()

   if (type === TransactionTypes.DEPOSIT) {
      client.balance += amount
   } else if (type === TransactionTypes.WITHDRAW) {
      client.balance = client.balance - amount
      // client.balance -= amount
   }

   await client.save()
   return res.json({
      message: "transaction added",
   })
})

export { router as createTransactionRouter }
