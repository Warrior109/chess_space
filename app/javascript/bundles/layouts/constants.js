const USERS = '/users';
const USERS_EDIT = `${USERS}/edit`;

export const GOOGLE_PROVIDER = 'google_oauth2';
const USERS_OAUTH_GOOGLE = `${USERS}/auth/${GOOGLE_PROVIDER}`;

export const paths = {
  ROOT: '/',
  USERS_MY_PROFILE: `${USERS}/my_profile`,

  USERS_EDIT,
  USERS_EDIT_COMMON: `${USERS_EDIT}/common`,
  USERS_EDIT_CONTACTS: `${USERS_EDIT}/contacts`,
  USERS_EDIT_SECURITY: `${USERS_EDIT}/security`,

  USERS_FORGOT_PASSWORD_EDIT: `${USERS}/password/edit`,

  USERS_OAUTH_GOOGLE_SIGN_UP: `${USERS_OAUTH_GOOGLE}?type=signup`,
  USERS_OAUTH_GOOGLE_SIGN_IN: `${USERS_OAUTH_GOOGLE}?type=signin`,
  USERS_OAUTH_GOOGLE_CONNECT: `${USERS_OAUTH_GOOGLE}?type=connect`
};
