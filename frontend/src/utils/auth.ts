import Cookies from "js-cookie";

const USER_COOKIE_NAME = "user";

export function setUserCookie(
  user: { id?: number; email: string; name?: string },
  days = 1
) {
  Cookies.set(USER_COOKIE_NAME, JSON.stringify(user), { expires: days });
}

export function getUserCookie(): {
  id?: number;
  email: string;
  name: string;
} | null {
  const raw = Cookies.get(USER_COOKIE_NAME);
  if (!raw) return null;
  return JSON.parse(raw);
}

export function removeUserCookie() {
  Cookies.remove(USER_COOKIE_NAME);
}

export default {
  setUserCookie,
  getUserCookie,
  removeUserCookie,
};
