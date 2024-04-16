import { IPublicClientApplication, AccountInfo } from '@azure/msal-browser';

export type IGET = {
  instance: IPublicClientApplication;
  accounts: AccountInfo[];
  model: string;
  id: string;
};

export type IGETA = {
  instance: IPublicClientApplication;
  accounts: AccountInfo[];
  model: string;
};

export type IDELETE = {
  instance: IPublicClientApplication;
  accounts: AccountInfo[];
  model: string;
  id: string;
};

export type ICREATE = {
  instance: IPublicClientApplication;
  accounts: AccountInfo[];
  model: string;
  body?: object | undefined;
  customHeaders?: object | undefined;
};

export type IUPDATE = {
  instance: IPublicClientApplication;
  accounts: AccountInfo[];
  model: string;
  body?: object | undefined;
  customHeaders?: object | undefined;
  id: string;
};
