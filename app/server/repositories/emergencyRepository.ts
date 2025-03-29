import { domainPath } from "../config.server";
import type { Emergency } from "~/models/emergency"; 

const Domain = domainPath();
const apiPath = `${Domain}/api/emergency`;

export default class EmergencyAPI {
  static async getAllEmergencies(): Promise<Emergency[]> {
    try {
      const res = await fetch(`${apiPath}/getAll`, { method: "GET" });
      const data: Emergency[] = await res.json();
      return data ?? [];
    } catch (error) {
      console.error("Error fetching emergencies:", error);
      throw error;
    }
  }

  static async getEmergencyById(emergencyId: string): Promise<Emergency | null> {
    try {
      const res = await fetch(`${apiPath}/getById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emergency_id: emergencyId,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    } catch (error) {
      console.error("Error fetching emergency by ID:", error);
      throw error;
    }
  }
}