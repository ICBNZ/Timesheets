// validation
import { isEmail } from "validator";
export const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export const validateEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Please enter a valid email
      </div>
    );
  }
};

export const validateName = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be 3 - 20 characters
      </div>
    );
  }
};

export const validatePassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be 6 - 40 characters
      </div>
    );
  }
};
