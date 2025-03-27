import User from "~/models/user";
import { domainPath, photoS3Path } from "../config.server";

const Domain = domainPath();
const PhotoS3 = photoS3Path();
const apiPath = `${Domain}/user`;

export default class UserAPI {
  static async getUser(): Promise<User[]> {
    try {
      const res = await fetch(`${apiPath}/getAll`, { method: "GET" });
      const data: User[] = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getUserByID(userID: string): Promise<User> {
    try {
      const res = await fetch(`${apiPath}/getById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userID,
        }),
      });
      const data = await res.json();
      if (!data) throw new Error("User not found");
      return data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  static async getUserByUsername(username: string): Promise<User> {
    try {
      const res = await fetch(`${apiPath}/getByUsername`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
        }),
      });
      const data = await res.json();
      if (!data) throw new Error("User not found");
      return data;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;
    }
  }

  static async userSignUp(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    salary: string
  ) {
    try {
      const res = await fetch(`${apiPath}/register`, {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          email: email.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone_number: phoneNumber.trim(),
          salary: parseInt(salary.trim()),
          priority: "user",
          photo_url: PhotoS3 + "default-profile.jpg",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) return { error: data.message };
      return data;
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  }

  static async userLogin(username: string, password: string): Promise<User> {
    try {
      const res = await fetch(`${apiPath}/login`, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  static async updateUser(updates: {
    user_id: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    photoUrl?: string;
    salary?: number;
  }) {
    try {
      const res = await fetch(`${apiPath}/update`, {
        method: "PATCH",
        body: JSON.stringify({
          ...updates,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Update user response :", data);
        return { error: data.message };
      }
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}
