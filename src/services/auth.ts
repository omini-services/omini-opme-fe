import { v4 as uuid } from 'uuid';

const delay = (amount = 750) =>
  new Promise((resolve) => {
    setTimeout(resolve, amount);
  });

export async function signInRequest() {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'Guilherme Or',
      email: 'demon@zenko.tec.br',
      avatar_url:
        'https://avatars.githubusercontent.com/u/6473061?s=400&u=f9324cbc4d00a5fbce48393e3ec8ce5b5738cf66&v=4',
    },
  };
}

export async function recoverUserInformation() {
  await delay();

  return {
    user: {
      name: 'Guilherme Or',
      email: 'demon@zenko.tec.br',
      avatar_url:
        'https://avatars.githubusercontent.com/u/6473061?s=400&u=f9324cbc4d00a5fbce48393e3ec8ce5b5738cf66&v=4',
    },
  };
}
