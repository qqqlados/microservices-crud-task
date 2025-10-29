import axios from "axios";

const USERS_BASE =
  (import.meta as any)?.env?.VITE_USERS_API_BASE_URL ?? `/users`;
const VEHICLES_BASE =
  (import.meta as any)?.env?.VITE_VEHICLES_API_BASE_URL ?? `/vehicles`;

export const apiUsers = axios.create({
  baseURL: USERS_BASE,
  headers: {
    "Content-Type": "application/json",
    authorization: "auth_token_placeholder",
  },
});

export const apiVehicles = axios.create({
  baseURL: VEHICLES_BASE,
  headers: {
    "Content-Type": "application/json",
    authorization: "auth_token_placeholder",
  },
});
