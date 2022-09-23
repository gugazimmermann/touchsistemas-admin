import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { normalizeWebsite } from "../helpers";
import { Client, Owner } from "../models";
import { UpdateClientRespose } from "../ts/types/mutations";

const createClient = async (email: string): Promise<void> => {
  await API.graphql(
    graphqlOperation(mutations.createClient, { input: { email } })
  );
};

export async function updateClient(
  id: string,
  client: Client
): Promise<Client[]> {
  const {
    data: {
      updateClient: { items },
    },
  } = await (API.graphql(
    graphqlOperation(mutations.updateClient, {
      input: {
        id,
        name: client.name || "",
        phone: `+55${(client.phone || "").replace(/[^\d]/g, "")}`,
        doctype: client.doctype || "",
        document: (client.document || "").replace(/[^\d]/g, ""),
        website: normalizeWebsite(client.website || ""),
        zipCode: (client.zipCode || "").replace(/[^\d]/g, ""),
        city: client.city,
        state: client.state,
        street: client.street,
        number: client.number,
        complement: client.complement,
      },
    })
  ) as Promise<UpdateClientRespose>);
  return items;
}

export async function updateClientLogoAndMap(
  id: string,
  logo: string | null | undefined,
  map: string | null | undefined
): Promise<Client[]> {
  const {
    data: {
      updateClient: { items },
    },
  } = await (API.graphql(
    graphqlOperation(mutations.updateClient, { input: { id, logo, map } })
  ) as Promise<UpdateClientRespose>);
  return items;
}

export async function createOwner(
  owner: Owner,
  clientID: string
): Promise<void> {
  await API.graphql(
    graphqlOperation(mutations.createOwner, {
      input: {
        name: owner.name,
        phone: `+55${owner.phone.replace(/[^\d]/g, "")}`,
        email: owner.email,
        ClientID: clientID,
      },
    })
  );
}

export async function updateOwner(owner: Owner): Promise<void> {
  await API.graphql(
    graphqlOperation(mutations.updateOwner, {
      input: {
        id: owner.id,
        name: owner.name,
        phone: `+55${owner.phone.replace(/[^\d]/g, "")}`,
        email: owner.email,
      },
    })
  );
}

export async function deleteOwner(id: string): Promise<void> {
  await API.graphql(graphqlOperation(mutations.deleteOwner, { input: { id } }));
}

const Mutations = {
  createClient,
  updateClient,
  updateClientLogoAndMap,
  createOwner,
  updateOwner,
  deleteOwner,
};

export default Mutations;
