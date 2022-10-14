export const validateUsername = (username) => {
  const match = username.match(/^[a-z0-9!@#$%_]+$/);
  return match ? true : false;
};

export const validatePassword = (password) => {
  const match = password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  );
  return match ? true : false;
};

export const validateEmail = (email) => {
  const match = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return match ? true : false;
};
