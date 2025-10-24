import Cookies from 'js-cookie';

// Cookie name to store a small user object { email: string, id?: number }
const USER_COOKIE_NAME = 'user';

export function setUserCookie(user: { email: string; id?: number }, days = 1) {
  try {
    Cookies.set(USER_COOKIE_NAME, JSON.stringify(user), { expires: days });
  } catch (e) {
    // ignore
  }
}

export function getUserCookie(): { email: string; id?: number } | null {
  try {
    const raw = Cookies.get(USER_COOKIE_NAME);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function setUserEmail(email: string) {
  const cur = getUserCookie() || { email };
  setUserCookie({ ...cur, email });
}

export function setUserId(id: number) {
  const cur = getUserCookie() || { email: '' };
  setUserCookie({ ...cur, id });
}

export function removeUserCookie() {
  try {
    Cookies.remove(USER_COOKIE_NAME);
  } catch (e) {}
}

export default {
  setUserCookie,
  getUserCookie,
  setUserEmail,
  setUserId,
  removeUserCookie,
};
