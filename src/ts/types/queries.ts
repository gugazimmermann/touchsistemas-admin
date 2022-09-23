import { Client, Owner, Plan } from "../../models"

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

export type ListPlansRespose = {
  data: {
    planByActive: {
      items: Plan[]
    }
  }
}