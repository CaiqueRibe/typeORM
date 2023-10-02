// console.log("Test hello")

import { createConnection } from "typeorm"
import { Client } from "./entities/Client"
import { Banker } from "./entities/Banker"
import { Transactions } from "./entities/Transaction"
import express from "express"
import { create } from "ts-node"
import { createClientRouter } from "./entities/routes/create_client"
import { createBankerRouter } from "./entities/routes/create_banker"
import { createTransactionRouter } from "./entities/routes/create_transaction"
import { connectBankerToClientRouter } from "./entities/routes/connect_banker_to_client"
import { deleteClientRouter } from "./entities/routes/delete_client"
import { fetchClientRouter } from "./entities/routes/fetch_clients"

const app = express()

const main = async () => {
   try {
      await createConnection({
         type: "postgres",
         host: "localhost",
         port: 5432,
         username: "postgres",
         password: "postgres2023",
         database: "postgres",
         entities: [Client, Banker, Transactions],
         synchronize: true,
      })
      console.log("Connected to Postgres with TypeORM")
      app.use(express.json())
      app.use(createClientRouter)
      app.use(createBankerRouter)
      app.use(createTransactionRouter)
      app.use(connectBankerToClientRouter)
      app.use(deleteClientRouter)
      app.use(fetchClientRouter)

      app.listen(8080, () => {
         console.log("Server started on localhost:8080")
      })
   } catch (error) {
      console.log(error)
      throw new Error("Unable to connect to Postgres with TypeORM")
   }
}

main()
