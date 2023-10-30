import express from "express"
import { Client } from "../Client"
import { Banker } from "../Banker"

const router = express.Router()

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
   const { bankerId, clientId } = req.params

   const client = await Client.findOne({ where: { id: parseInt(clientId) } })
   const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } })

   if (!banker && !client) {
      return res.json({
         msg: "Banker or client not found",
      })
   }

   if (banker !== null && client !== null) {
      banker.clients = [client]
   }

   await banker?.save()

   return res.json({
      msg: "banker connected to client",
   })
})

export { router as connectBankerToClientRouter }
