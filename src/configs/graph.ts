// export async function callMsGraph(
//   url: string | undefined,
//   accessToken: string | undefined,
//   method: string,
//   body: object,
// ) {
//   const headers = new Headers();
//   const bearer = `Bearer ${accessToken}`;

//   headers.append('Authorization', bearer);

//   const options = {
//     method,
//     headers,
//     body,
//   };

//   console.log('fetch options => ', JSON.stringify(options));

//   return fetch(url, options)
//     .then((response) => response.json())
//     .catch((error) => console.log(error));
// }

import axios from 'axios';

export async function callMsGraph(
  url: string | undefined,
  accessToken: string | undefined,
  method: string,
  body: object,
) {
  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    data: body,
  };

  console.log('Axios config => ', config);

  try {
    const response = await axios(config);
    return response.data; // Retorna os dados diretamente
  } catch (error) {
    console.log(error);
    // Tratar ou relançar o erro conforme necessário
    throw error;
  }
}
