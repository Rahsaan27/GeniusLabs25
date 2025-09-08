// OIDC configuration for AWS Cognito
export const oidcConfig = {
  authority: 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_6LxsAjtRX',
  client_id: '4botmnmnknikbipc801vbsgvta',
  redirect_uri: 'http://localhost:3001/callback',
  post_logout_redirect_uri: 'http://localhost:3001',
  response_type: 'code',
  scope: 'phone openid email',
  automaticSilentRenew: true,
  includeIdTokenInSilentRenew: true
};


// https://d84l1y8p4kdic.cloudfront.net