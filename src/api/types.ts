import { Auth0ContextInterface } from '@auth0/auth0-react';

export type IGET = {
  instance: Auth0ContextInterface;
  method: string;
  body?: object | undefined;
  url?: string;
};

export type IGETA = {
  instance: Auth0ContextInterface;
  model: string;
};

export type IDELETE = {
  instance: Auth0ContextInterface;
  model?: string | undefined;
  id?: string | undefined;
  url?: string;
};

export type ICREATE = {
  instance: Auth0ContextInterface;
  model: string;
  body?: object | undefined;
  customHeaders?: object | undefined;
  url?: string;
};

export type IUPDATE = {
  instance: Auth0ContextInterface;
  model: string;
  body?: object | undefined;
  customHeaders?: object | undefined;
  id: string;
};

export interface IAPICall {
  instance: Auth0ContextInterface; // .............. Instância do Auth0 para autenticação
  model?: string; // ............................... Modelo ou recurso da API
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // ... Método HTTP
  id?: string; // .................................. ID do recurso para operações específicas
  url?: string; // ................................. URL customizada (sobrescreve model e id)
  body?: any; // ................................... Corpo da requisição para métodos POST/PUT
  customHeaders?: Record<string, string>; // ....... Cabeçalhos customizados
}
