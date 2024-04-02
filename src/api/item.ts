import { IPublicClientApplication, AccountInfo } from '@azure/msal-browser';

import { callApi } from '@/configs/api';
import { API_CONFIG } from '@/configs/authConfig';

type IDelete = {
  instance: IPublicClientApplication;
  accounts: AccountInfo[];
  model: string;
  id: string;
};

export const deleteApiRequest = async ({
  instance,
  accounts,
  model,
  id,
}: IDelete) => {
  const token = await instance.acquireTokenSilent({
    scopes: API_CONFIG.scopes,
    account: accounts[0],
  });

  return callApi({
    url: `${API_CONFIG.endpoint}/${model}/${id}`,
    accessToken: token.accessToken,
    method: 'DELETE',
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  }).then((result) => ({ ...result, id }));
};
