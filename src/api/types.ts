import { Auth0ContextInterface } from '@auth0/auth0-react';

export type IGET = {
  instance: Auth0ContextInterface;
  model: string;
  id: string;
};

export type IGETA = {
  instance: Auth0ContextInterface;
  model: string;
};

export type IDELETE = {
  instance: Auth0ContextInterface;
  model: string;
  id: string;
};

export type ICREATE = {
  instance: Auth0ContextInterface;
  model: string;
  body?: object | undefined;
  customHeaders?: object | undefined;
};

export type IUPDATE = {
  instance: Auth0ContextInterface;
  model: string;
  body?: object | undefined;
  customHeaders?: object | undefined;
  id: string;
};
