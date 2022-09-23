import { Client, Owner } from "../../models"

export type ClientByEmailRespose = {
  data: {
    clientByEmail: {
      items: Client[]
    }
  }
}

export type ListOwnersRespose = {
  data: {
    ownersByClientID: {
      items: Owner[]
    }
  }
}