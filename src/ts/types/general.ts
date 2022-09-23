import { ALERT, MapTypes } from '../enums';

export type GenericObject = { [key: string]: any };

export type AlertType = {
  type?: ALERT;
  text?: string;
};

export type LocationType = {
  state: {
    email?: string;
    alert?: AlertType;
  }
};

export type AddressFromCEPType = {
  state: string;
  street: string;
  city: string;
}

export type FormatAddressType = {
  street: string;
  number?: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
}

export type CreateMapType = {
	type: MapTypes;
	id: string;
	name: string;
	street: string;
	number: string;
	city: string;
	state: string;
	zipCode: string;
}

export type SendPublicFileType = {
  type: string,
  id: string,
  file: File,
  setProgress: (progress: number) => void;
}