// OIDC configuration for AWS Cognito
export const oidcConfig = {
  authority: 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_G034p1mkN',
  client_id: '497h4oam89ovabtcsec4evuu94',
  redirect_uri: 'http://localhost:3002/callback',
  post_logout_redirect_uri: 'http://localhost:3002',
  response_type: 'code',
  scope: 'openid email profile',
  automaticSilentRenew: true,
  includeIdTokenInSilentRenew: true,
  // Override the authorization endpoint to use hosted UI
  metadata: {
    authorization_endpoint: 'https://us-west-2g034p1mkn.auth.us-west-2.amazoncognito.com/oauth2/authorize',
    end_session_endpoint: 'https://us-west-2g034p1mkn.auth.us-west-2.amazoncognito.com/logout'
  }
};