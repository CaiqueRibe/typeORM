import express from "express"
import { Client } from "../Client"
import { createQueryBuilder } from "typeorm"

const router = express()

router.get("/api/clients", async (req, res) => {
   //    const client = await Client.find()
   const clients = await createQueryBuilder("client")
      //   .select("client")
      .select("client.first_name")
      .addSelect("client.last_name")
      .addSelect("client.balance")
      //   .addSelect("SUM(transaction)", "sum")
      .from(Client, "client")
      .leftJoinAndSelect("client.transactions", "teste")
      //   .where("client.id = :clientId", { clientId: 3 })
      .where("client.balance >= :balance", { balance: 3000 })
      //   .where("client.balance >= :minBalance AND client.balance <= :maxBalance", { minBalance: 3000, maxBalance: 30000 })
      //   .getOne()
      .getMany()

   return res.json(clients)
})

export { router as fetchClientRouter }
