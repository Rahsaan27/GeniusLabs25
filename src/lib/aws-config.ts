// OIDC configuration for AWS Cognito
export const oidcConfig = {
  authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY || 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_6LxsAjtRX',
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '4botmnmnknikbipc801vbsgvta',
  redirect_uri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI || 'http://localhost:3001/callback',
  post_logout_redirect_uri: process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI || 'http://localhost:3001',
  response_type: 'code',
  scope: 'phone openid email'
};


// https://d84l1y8p4kdic.cloudfront.net