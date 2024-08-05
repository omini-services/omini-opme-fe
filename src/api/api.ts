import { Auth0ContextInterface } from '@auth0/auth0-react';

import { callApi } from '@/configs/api';
import { API_CONFIG, auth0Config } from '@/configs/auth0Config';

import { IAPICall, ICREATE, IDELETE, IGET, IGETA, IUPDATE } from './types';

const acquireToken = async (instance: Auth0ContextInterface) =>
  instance.getAccessTokenSilently({
    authorizationParams: {
      audience: auth0Config.audience,
      scope: auth0Config.scopes,
    },
  });

/**
 * GET ALL API
 */

export const getAllApiRequest = async ({ instance, model }: IGETA) => {
  const accessToken = await acquireToken(instance);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}`,
    accessToken,
    method: 'GET',
  }).then((result) => ({ ...result }));
};

/**
 * GET API
 */

export const getApiRequest = async ({
  instance,
  url,
  method,
  body = {},
}: IGET) => {
  const accessToken = await acquireToken(instance);

  return callApi({
    url: `${API_CONFIG.endpoint}/${url}`,
    accessToken,
    method: method || 'GET',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
    body,
  }).then((result) => ({ ...result }));
};

/**
 * DELETE API
 */

export const deleteApiRequest = async ({
  instance,
  model,
  id,
  url,
}: IDELETE) => {
  const accessToken = await acquireToken(instance);

  return callApi({
    url:
      `${API_CONFIG.endpoint}/${url}` ||
      `${API_CONFIG.endpoint}/${model}/${id}`,
    accessToken,
    method: 'DELETE',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  }).then((result) => ({ ...result }));
};

/**
 * CREATE API
 */

export const createApiRequest = async ({
  instance,
  model,
  body,
  url,
}: ICREATE) => {
  const accessToken = await acquireToken(instance);

  return callApi({
    url: url || `${API_CONFIG.endpoint}/${model}`,
    accessToken,
    method: 'POST',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
    body,
  }).then((result) => ({ ...result }));
};

/**
 * UPDATE API
 */

export const updateApiRequest = async ({
  instance,
  model,
  body,
  id,
}: IUPDATE) => {
  const accessToken = await acquireToken(instance);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}/${id}`,
    accessToken,
    method: 'PUT',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
    body,
  }).then((result) => ({ ...result }));
};

export const apiRequest = async ({
  instance,
  model,
  method = 'GET',
  id = '',
  url = '',
  body = {},
  customHeaders = {},
}: IAPICall) => {
  // Obtenha o token de acesso
  const accessToken = await acquireToken(instance);

  // Constroi a URL da requisição
  const apiUrl = url || `${API_CONFIG.endpoint}/${model}${id ? `/${id}` : ''}`;

  // Realiza a chamada da API
  return callApi({
    url: apiUrl,
    accessToken,
    method,
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
      ...customHeaders,
    },
    body,
  }).then((result) => ({ ...result }));
};
