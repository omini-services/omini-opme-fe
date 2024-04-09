import axios from 'axios';

export const callMsGraph = async (props: any) => {
  const { url, accessToken } = props;
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append('Authorization', bearer);

  const config = {
    method: 'GET',
    headers,
  };

  try {
    return fetch(url, config)
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

// eslint-disable-next-line consistent-return
export const callApi = async ({
  url,
  accessToken,
  method,
  body = {},
  customHeaders = {},
}: ICallApi) => {
  const headers = {
    'Content-Type': 'application/json', // Garanta que este cabeçalho esteja definido se for utilizar JSON
    Authorization: `Bearer ${accessToken}`,
    ...customHeaders,
  };

  // Configuração para axios, incluindo o corpo da requisição se necessário
  const config = {
    method,
    headers,
    ...(Object.keys(body).length > 0 && { data: body }), // Inclui o corpo se não estiver vazio
    url,
  };

  try {
    // Realiza a chamada de API utilizando axios diretamente com a configuração
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    // Dependendo da necessidade, você pode querer tratar o erro de maneiras específicas aqui
    throw error;
  }
};
