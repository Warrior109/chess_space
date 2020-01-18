import CustomRouteSwitch, { createValidator } from 'custom_route_switch_react';

const authValidator = (child, props) => {
  const { currentUser } = props;
  const { auth } = child.props;
  if (auth) return !!(currentUser && currentUser.id);
  if (auth === false) return !(currentUser && currentUser.id);
  return true;
};

createValidator(authValidator);

export default CustomRouteSwitch;
