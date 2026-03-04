// Get the base URL dynamically based on environment
const getBaseUrl = () => {
  // In browser, use window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback to production URL for SSR
  return 'https://xpukycmsmg.us-west-2.awsapprunner.com';
};

// OIDC configuration for AWS Cognito
export const oidcConfig = {
  authority: 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_6LxsAjtRX',
  client_id: '4botmnmnknikbipc801vbsgvta',
  redirect_uri: `${getBaseUrl()}/callback`,
  post_logout_redirect_uri: getBaseUrl(),
  response_type: 'code',
  scope: 'phone openid email',
  // Automatically handle auth responses
  automaticSilentRenew: false,
  loadUserInfo: true,
};


// https://d84l1y8p4kdic.cloudfront.net