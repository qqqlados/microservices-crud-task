import type { ICreateUser, IUser, IUpdateUser } from '../types/user';
import { api } from '../utils/axios';
import { setUserEmail, setUserId, removeUserCookie } from '../utils/auth';

export class UserService {
  static async getUsers() {
    try {
      const res = await api.get('/users');
      return res.data;
    } catch (err) {
      return {
        error: (err as Error).message,
      };
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const users = await this.getUsers();
      const targetUser = users.data.find((user: IUser) => user.email === email && user.password === password);
      if (targetUser) {
        // store email in cookie then fetch id from server
        setUserEmail(email);
        try {
          const res = await api.get('/users/me', { params: { email } });
          if (res?.data?.id) {
            setUserId(res.data.id);
            const payload = { ...targetUser, id: res.data.id } as any;
            // persist in cookie via setUserId/setUserEmail already done
            return payload;
          }
        } catch (e) {
          // ignore and return basic user
        }
        return { ...targetUser } as any;
      }
      return { error: 'Invalid email or password' };
    } catch (err) {
      const e = err as any;
      const serverMessage = e?.response?.data?.message ?? e?.message ?? 'Network or server error';
      return { error: serverMessage };
    }
  }

  static async getUserById(id: number) {
    try {
      const res = await api.get(`/users/${id.toString()}`);
      return res.data;
    } catch (err) {
      return {
        error: (err as Error).message,
      };
    }
  }

  static async createUser(data: ICreateUser) {
    try {
      const res = await api.post(`/users`, data);

      if (res?.data) {
        const body = res.data as any;

        setUserEmail(body.email);

        setUserId(body.id);
        return body;
      }

      return { error: 'Empty response from server' };
    } catch (err) {
      const e = err as any;
      const serverMessage = e?.response?.data?.message ?? e?.message ?? 'Network or server error';
      return { error: serverMessage };
    }
  }
  static async updateUser(id: number, data: IUpdateUser) {
    try {
      const res = await api.put(`/users/${id.toString()}`, data);
      return res.data;
    } catch (err) {
      const e = err as any;
      const serverMessage = e?.response?.data?.message ?? e?.message ?? 'Network or server error';
      return { error: serverMessage };
    }
  }

  static async deleteUser(id: number) {
    try {
      const res = await api.delete(`/users/${id.toString()}`);
      // if current user deleted, clear storage
      try {
        // remove cookie if present
        removeUserCookie();
      } catch (e) {}
      return res.data;
    } catch (err) {
      return {
        error: (err as Error).message,
      };
    }
  }

  static signOut() {
    try {
      removeUserCookie();
    } catch (e) {}
  }
}
