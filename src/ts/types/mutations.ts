import { Client } from "../../models"

export type UpdateClientRespose = {
  data: {
    updateClient: {
      items: Client[]
    }
  }
}
