const USERS = '/users';
const USERS_EDIT = `${USERS}/edit`;

const USERS_OAUTH = `${USERS}/auth`;
export const GOOGLE_PROVIDER = 'google_oauth2';
const USERS_OAUTH_GOOGLE = `${USERS_OAUTH}/${GOOGLE_PROVIDER}`;

export const FACEBOOK_PROVIDER = 'facebook';
const USERS_OAUTH_FACEBOOK = `${USERS_OAUTH}/${FACEBOOK_PROVIDER}`;

export const paths = {
  ROOT: '/',
  USERS_MY_PROFILE: `${USERS}/my_profile`,

  USERS_EDIT,
  USERS_EDIT_COMMON: `${USERS_EDIT}/common`,
  USERS_EDIT_CONTACTS: `${USERS_EDIT}/contacts`,
  USERS_EDIT_SECURITY: `${USERS_EDIT}/security`,

  USERS_FORGOT_PASSWORD_EDIT: `${USERS}/password/edit`,

  // OAUTH

  // GOOGLE
  USERS_OAUTH_GOOGLE_SIGN_UP: `${USERS_OAUTH_GOOGLE}?type=signup`,
  USERS_OAUTH_GOOGLE_SIGN_IN: `${USERS_OAUTH_GOOGLE}?type=signin`,
  USERS_OAUTH_GOOGLE_CONNECT: `${USERS_OAUTH_GOOGLE}?type=connect`,

  //FACEBOOK
  USERS_OAUTH_FACEBOOK_SIGN_UP: `${USERS_OAUTH_FACEBOOK}?type=signup`,
  USERS_OAUTH_FACEBOOK_SIGN_IN: `${USERS_OAUTH_FACEBOOK}?type=signin`,
  USERS_OAUTH_FACEBOOK_CONNECT: `${USERS_OAUTH_FACEBOOK}?type=connect`
};
