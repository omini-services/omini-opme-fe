import { LogLevel } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority:
      'https://ominiopme.b2clogin.com/ominiopme.onmicrosoft.com/B2C_1_SignUp_SignIn',
    knownAuthorities: ['ominiopme.b2clogin.com'],
    scope: [
      'openid',
      'https://ominiopme.onmicrosoft.com/ominiopme-api/api.access',
    ],
    // redirectUri: 'http://localhost:5173/',
    redirectUri: 'https://9000-idx-omini-opme-fe-1717780507351.cluster-kc2r6y3mtba5mswcmol45orivs.cloudworkstations.dev/'
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);

          default:
        }
      },
    },
  },
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const GRAPH_CONFIG = {
  endpoint: 'https://graph.microsoft.com/v1.0/me',
  scopes: [
    'openid',
    'https://ominiopme.onmicrosoft.com/ominiopme-api/api.access',
  ],
};

export const API_CONFIG = {
  // endpoint: 'http://localhost:6868/api',
  endpoint: 'https://omi-app-api-dev-useast-rg.azurewebsites.net/api',
  scopes: [
    'openid',
    'https://ominiopme.onmicrosoft.com/ominiopme-api/api.access',
  ],
};
