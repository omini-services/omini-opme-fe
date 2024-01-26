import crypto from 'crypto';

// @ts-ignore
export const generateSecretHash = (username, clientId, clientSecret) =>
  crypto
    .createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64');
