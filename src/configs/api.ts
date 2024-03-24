import axios from 'axios';

export async function callMsGraph(
  url: string | undefined,
  accessToken: string | undefined,
) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append('Authorization', bearer);

  const config = {
    method: 'GET',
    headers,
  };

  try {
    return fetch(url, config)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface ICallApi {
  url: string | undefined;
  accessToken: string | undefined;
  method: string;
  body?: object | undefined;
  customHeaders?: object | undefined;
}

export async function callApi(props: ICallApi) {
  const { url, accessToken, method, body = {}, customHeaders = {} } = props;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ...customHeaders,
  };

  const config = {
    method,
    headers,
  };

  try {
    if (method.toLowerCase() === 'post') {
      // Para uma solicitação POST
      return axios
        .post(url, body, config)
        .then((response) => response.data)
        .catch((error) => console.error(error));
    }
    if (method.toLowerCase() === 'get') {
      // Para uma solicitação GET (assumindo que 'body' não é necessário)
      return axios
        .get(url, config)
        .then((response) => response.data)
        .catch((error) => console.error(error));
    }
    // Adicione mais condicionais aqui para outros métodos HTTP se necessário
  } catch (error) {
    console.error(error);
    // Tratar ou relançar o erro conforme necessário
    throw error;
  }
}
