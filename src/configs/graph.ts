/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(
  url: string | undefined,
  accessToken: string | undefined,
  method: string,
) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method,
    headers,
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
