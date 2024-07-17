export const User = "user";
export const Tokens = "tokens";
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;
export const usernameRegex = /^[a-zA-Z0-9]{4,}$/;

export const setLocalUser = (user: any) => {
  localStorage.setItem(User, JSON.stringify(user));
};

export const getLocalUser = () => {
  try {
    return JSON.parse(localStorage.getItem(User) || "");
  } catch (error) {
    return {}
  }
};

export const removeLocalUser = () => {
  localStorage.removeItem(User);
};

export const setTokens = (tokens: any) => {
  localStorage.setItem(Tokens, JSON.stringify(tokens));
};

export const getTokens = () => {
  try {
    return localStorage.getItem(Tokens) || "";
  } catch (error) {
    return `{}`;
  }
};

export const removeTokens = () => {
  localStorage.removeItem(Tokens);
};
