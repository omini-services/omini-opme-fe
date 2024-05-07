import { IPublicClientApplication } from '@azure/msal-browser';

import { callApi } from '@/configs/api';
import { API_CONFIG } from '@/configs/authConfig';

import { IGET, IGETA, IDELETE, ICREATE, IUPDATE } from './types';

const acquireToken = async (
  instance: IPublicClientApplication,
  accounts: any[],
) =>
  instance.acquireTokenSilent({
    scopes: API_CONFIG.scopes,
    account: accounts[0],
  });

/**
 * GET ALL API
 */

export const getAllApiRequest = async ({
  instance,
  accounts,
  model,
}: IGETA) => {
  const token = await acquireToken(instance, accounts);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}`,
    accessToken: token.accessToken,
    method: 'GET',
  }).then((result) => result);
};

/**
 * GET API
 */

export const getApiRequest = async ({
  instance,
  accounts,
  model,
  id,
}: IGET) => {
  const token = await acquireToken(instance, accounts);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}/${id}`,
    accessToken: token.accessToken,
    method: 'GET',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  }).then((result) => ({ ...result, id }));
};

/**
 * DELETE API
 */

export const deleteApiRequest = async ({
  instance,
  accounts,
  model,
  id,
}: IDELETE) => {
  const token = await acquireToken(instance, accounts);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}/${id}`,
    accessToken: token.accessToken,
    method: 'DELETE',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  }).then((result) => ({ ...result, id }));
};

/**
 * CREATE API
 */

export const createApiRequest = async ({
  instance,
  accounts,
  model,
  body,
}: ICREATE) => {
  const token = await acquireToken(instance, accounts);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}`,
    accessToken: token.accessToken,
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
  accounts,
  model,
  body,
  id,
}: IUPDATE) => {
  const token = await acquireToken(instance, accounts);

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}/${id}`,
    accessToken: token.accessToken,
    method: 'PUT',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
    body,
  }).then((result) => ({ ...result }));
};
