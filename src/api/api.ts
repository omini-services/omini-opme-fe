import { Auth0ContextInterface } from '@auth0/auth0-react';

import { callApi } from '@/configs/api';
import { API_CONFIG, auth0Config } from '@/configs/auth0Config';

import { ICREATE, IDELETE, IGET, IGETA, IUPDATE } from './types';

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

export const getApiRequest = async ({ instance, model, id }: IGET) => {
  const accessToken = await acquireToken(instance);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}/${id}`,
    accessToken,
    method: 'GET',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  }).then((result) => ({ ...result, id }));
};

/**
 * DELETE API
 */

export const deleteApiRequest = async ({ instance, model, id }: IDELETE) => {
  const accessToken = await acquireToken(instance);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}/${id}`,
    accessToken,
    method: 'DELETE',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  }).then((result) => ({ ...result, id }));
};

/**
 * CREATE API
 */

export const createApiRequest = async ({ instance, model, body }: ICREATE) => {
  const accessToken = await acquireToken(instance);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}`,
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
