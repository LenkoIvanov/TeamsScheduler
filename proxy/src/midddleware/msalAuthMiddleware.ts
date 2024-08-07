import { Request, Response, NextFunction } from 'express';
import msal, { Configuration, AuthenticationResult } from '@azure/msal-node';
import { accessTokenRequest } from '../constants/msalConfig';
import { ExternalDependencyError } from '../constants/errors';
import createLogger from '../constants/logger';

const logger = createLogger('MsalAuthMiddleware');

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.MSAL_CLIENT_ID ?? '',
    authority: process.env.MSAL_AUTHORITY ?? '',
    clientSecret: process.env.MSAL_SECRET ?? ''
  }
};

let token: AuthenticationResult | null = null;
const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getToken() {
  const currentTime = new Date().getTime();
  if (!token || token.expiresOn === null || token.expiresOn.getTime() <= currentTime) {
    const response = await cca.acquireTokenByClientCredential(accessTokenRequest);
    if (response) {
      token = response;
    } else {
      throw new ExternalDependencyError('Failing external dependency');
    }
  }
  return token.accessToken;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = await getToken();
    req.query.msalAccessToken = accessToken;
    next();
  } catch (e) {
    logger.error(e);
    next(e);
  }
};
