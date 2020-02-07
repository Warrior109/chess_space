import { toastr } from 'react-redux-toastr';

export const setError = errors => {
  if (errors.join) {
    toastr.error('Помилка!', errors.join('; '));
  } else {
    // eslint-disable-next-line
    console.log(errors);
  }
};
