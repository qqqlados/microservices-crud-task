import { api } from '../utils/axios';
import type { ICreateVehicle } from '../types/vehicle';

export class VehicleService {
  static async getVehicles() {
    try {
      const res = await api.get('/vehicles');
      return res.data;
    } catch (err) {
      const e = err as any;
      const serverMessage = e?.response?.data?.message ?? e?.message ?? 'Network or server error';
      return { error: serverMessage };
    }
  }
  static async getVehicleById(id: number) {
    try {
      const res = await api.get(`/vehicles/${id.toString()}`);
      return res.data;
    } catch (err) {
      const e = err as any;
      const serverMessage = e?.response?.data?.message ?? e?.message ?? 'Network or server error';
      return { error: serverMessage };
    }
  }

  static async createVehicle(data: ICreateVehicle) {
    try {
      const res = await api.post(`/vehicles`, data);
      return res.data;
    } catch (err) {
      const e = err as any;
      const serverMessage = e?.response?.data?.message ?? e?.message ?? 'Network or server error';
      return { error: serverMessage };
    }
  }

  static async updateVehicle(id: number, data: Partial<ICreateVehicle>) {
    try {
      const res = await api.put(`/vehicles/${id.toString()}`, data);
      return res.data;
    } catch (err) {
      const e = err as any;
      const serverMessage = e?.response?.data?.message ?? e?.message ?? 'Network or server error';
      return { error: serverMessage };
    }
  }
  static async deleteVehicle(id: number) {
    try {
      const res = await api.delete(`/vehicles/${id.toString()}`);
      return res.data;
    } catch (err) {
      const e = err as any;
      const serverMessage = e?.response?.data?.message ?? e?.message ?? 'Network or server error';
      return { error: serverMessage };
    }
  }
}
