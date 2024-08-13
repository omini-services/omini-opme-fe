import axios from 'axios';

export const callMsGraph = async (props: any) => {
  const { url, accessToken } = props;
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append('Authorization', bearer);

  try {
    return fetch(url, {
      method: 'GET',
      headers,
    })
      .then(async (response) => response.json())
      .catch((error) => console.log('error when getting msg => ', error));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface ICallApi {
  url: string;
  accessToken: string | undefined;
  method: string;
  body?: object | undefined;
  customHeaders?: object | undefined;
}

export const callApi = async ({
  url,
  accessToken,
  method,
  body = {},
  customHeaders = {},
}: ICallApi) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ...customHeaders,
  };
  try {
    return await axios({
      method,
      headers,
      ...(Object.keys(body).length > 0 && { data: body }),
      url,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
