import type { ICreateUser, IUser, IUpdateUser } from "../types/user";
import { apiUsers } from "../utils/axios";
import { removeUserCookie, setUserCookie } from "../utils/auth";

export class UserService {
  static async getUsers() {
    try {
      const res = await apiUsers.get("/");
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
      const list = Array.isArray(users) ? users : (users as any)?.data;
      if (!Array.isArray(list)) {
        return { error: "Something went wrong. Try again later." } as any;
      }
      const targetUser = list.find(
        (user: IUser) => user.email === email && user.password === password
      );
      if (targetUser) {
        const cookiePayload: { id?: number; email: string; name?: string } = {
          email,
          name: targetUser.name,
        } as any;
        try {
          const res = await apiUsers.get("/me", { params: { email } });
          if (res?.data?.id) {
            cookiePayload.id = res.data.id;
            const payload = { ...targetUser, id: res.data.id } as any;
            setUserCookie(cookiePayload);
            return payload;
          }
        } catch (e) {
          // ignore and return basic user
        }
        setUserCookie(cookiePayload);
        return { ...targetUser } as any;
      }
      return { error: "Invalid email or password" };
    } catch (err) {
      const e = err as any;
      const serverMessage =
        e?.response?.data?.message ?? e?.message ?? "Network or server error";
      return { error: serverMessage };
    }
  }

  static async getUserById(id: number) {
    try {
      const res = await apiUsers.get(`/${id.toString()}`);
      return res.data;
    } catch (err) {
      return {
        error: (err as Error).message,
      };
    }
  }

  static async createUser(data: ICreateUser) {
    try {
      const res = await apiUsers.post(`/`, data);

      if (res?.data) {
        const body = res.data as any;
        setUserCookie({
          id: body.data.id,
          email: body.data.email,
          name: body.data.name,
        });
        return body.data;
      }

      return { error: "Empty response from server" };
    } catch (err) {
      const e = err as any;
      const serverMessage =
        e?.response?.data?.message ?? e?.message ?? "Network or server error";
      return { error: serverMessage };
    }
  }
  static async updateUser(id: number, data: IUpdateUser) {
    try {
      const res = await apiUsers.put(`/${id.toString()}`, data);

      if (res?.data) {
        setUserCookie({ id, email: res.data.email, name: res.data.name });
        return res.data;
      }

      return { error: "Empty response from server" };
    } catch (err) {
      const e = err as any;
      const serverMessage =
        e?.response?.data?.message ?? e?.message ?? "Network or server error";
      return { error: serverMessage };
    }
  }

  static async deleteUser(id: number) {
    try {
      const res = await apiUsers.delete(`/${id.toString()}`);
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
