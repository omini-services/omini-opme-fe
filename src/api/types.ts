import { Auth0ContextInterface } from '@auth0/auth0-react';

export interface IAPICall {
  instance: Auth0ContextInterface; // .............. Instância do Auth0 para autenticação
  model?: string; // ............................... Modelo ou recurso da API
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // ... Método HTTP
  id?: string; // .................................. ID do recurso para operações específicas
  url?: string; // ................................. URL customizada (sobrescreve model e id)
  body?: any; // ................................... Corpo da requisição para métodos POST/PUT
  customHeaders?: Record<string, string>; // ....... Cabeçalhos customizados
}
