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
    // const response = await axios(config);
    // return response.data; // Retorna os dados diretamente

    return fetch(url, config)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    // Tratar ou relançar o erro conforme necessário
    throw error;
  }
}

export async function callApi(
  url: string | undefined,
  accessToken: string | undefined,
  method: string,
  body: object,
) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append('Authorization', bearer);

  const config = {
    method,
    headers,
    body,
  };

  try {
    // const response = await axios(config);
    // return response.data; // Retorna os dados diretamente

    return fetch(url, config)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    // Tratar ou relançar o erro conforme necessário
    throw error;
  }
}
