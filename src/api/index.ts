import { Auth0ContextInterface } from '@auth0/auth0-react';

import { callApi } from '@/configs/api';
import { API_CONFIG, auth0Config } from '@/configs/auth0Config';

import { IAPICall } from './types';

const acquireToken = async (instance: Auth0ContextInterface) =>
  instance.getAccessTokenSilently({
    authorizationParams: {
      audience: auth0Config.audience,
      scope: auth0Config.scopes,
    },
  });

export const apiRequest = async ({
  instance,
  model,
  method = 'GET',
  id = '',
  url = '',
  body = {},
  customHeaders = {},
}: IAPICall) => {
  const accessToken = await acquireToken(instance);
  const apiUrl = url
    ? `${API_CONFIG.endpoint}/${url}`
    : `${API_CONFIG.endpoint}/${model}${id ? `/${id}` : ''}`;

  return callApi({
    url: apiUrl,
    accessToken,
    method,
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
      ...customHeaders,
    },
    body,

    // The return of this request is:
    // {
    //   config: {}, // network configs
    //   data: [], // data of the requested endpoint
    //   headers: {}, // response headers
    //   request: {}, // axios request
    //   status: 200, 300, 304, 404... // request status code
    //   statusText: "OK" // text of the status
    // }
  }).then((result) => result);
};
