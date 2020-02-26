const USERS = '/users';
const USERS_EDIT = `${USERS}/edit`;

export const paths = {
  ROOT: '/',
  USERS_MY_PROFILE: `${USERS}/my_profile`,

  USERS_EDIT,
  USERS_EDIT_COMMON: `${USERS_EDIT}/common`,
  USERS_EDIT_CONTACTS: `${USERS_EDIT}/contacts`,
  USERS_EDIT_SECURITY: `${USERS_EDIT}/security`,

  USERS_FORGOT_PASSWORD_EDIT: `${USERS}/password/edit`,

  USERS_OAUTH_GOOGLE_SIGN_UP: `${USERS}/auth/google_oauth2?type=signup`
};
