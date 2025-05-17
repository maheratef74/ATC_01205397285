import { Gender } from "@/lib/constant";
import axios from "../lib/axios";
import { AxiosError, isAxiosError } from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  name: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: Gender.Male | Gender.Female;
}

interface AuthResponse {
  data: {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "User";
  };
  token: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`/auth/login`, credentials);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        throw new Error("Login failed. Please try again.");
      }
      throw new Error("Login failed. Please try again.");
    }
  },

  signup: async (
    credentials: SignupCredentials
  ): Promise<{ message: string }> => {
    try {
      console.log(credentials);

      const response = await axios.post(`/auth/register`, credentials);
      console.log(response);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      } else {
        throw new Error("Signup failed. Please try again.");
      }
    }
  },
};
