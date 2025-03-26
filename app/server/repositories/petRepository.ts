import Pet from "~/models/pet";

import { domainPath, photoS3Path } from "../path.server";

const Domain = domainPath();
const PhotoS3 = photoS3Path();

const apiPath = `${Domain}/pet`;

export default class PetAPI {
    static async getAll() : Promise<Pet[]> {
        const res = await fetch(`${apiPath}/getAll`, { method: "GET" });
        const data = await res.json();

        if (!res.ok) {
            throw new Error("Failed to fetch pets");
        }
        return data;
    }

    static async getPetByID(id: number) {
        const res = await fetch(`${apiPath}/getById/${id}`, { method: "GET" });
        const data = await res.json();

        if (!res.ok) {
            return { error: `Failed to fetch pet: ${res.status} ${res.statusText}` };
        }
        return data;
    }

    static async createPet(
        name: string,
        type: string,
        breed: string,
        color: string,
        gender: string,
        ageYear: string,
        ageMonth: string,
        weight: string,
        spayed: string,
        detail: string
    ) {
        // Convert gender to uppercase to match enum
        const sex = gender.toUpperCase() === "UNKNOW" ? "UNKNOWN" : gender.toUpperCase();
        
        // Ensure numeric values are properly converted
        const age_years = parseInt(ageYear) || 0;
        const age_months = parseInt(ageMonth) || 0;
        const weight_value = parseInt(weight) || 0;
        
        // Convert spayed string to boolean
        const spayed_value = spayed.toLowerCase() === "true";

        const requestBody = {
            pet_name: name,
            age_years,
            age_months,
            species: type,
            breed,
            photo_url: PhotoS3 + name.trim().replace(" ", "") + "-photo.jpg",
            weight: weight_value,
            adopted: false,
            spayed: spayed_value,
            description: detail,
            color,
            sex
        };

        console.log("Request body:", JSON.stringify(requestBody, null, 2));

        const res = await fetch(`${apiPath}/createPet`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
            console.log("Response data:", data);
            return { error: `Failed to create pet: ${res.status} ${res.statusText}` };
        }

        return data;
    }

    static async updatePetByID(id: number) {
        const res = await fetch(`${apiPath}/updatePet`, {
            method: "PATCH",
            body: JSON.stringify({
                pet_id: id,
                adopted: true,
            }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
            return { error: `Failed to fetch pet: ${res.status} ${res.statusText}` };
        }

        return data;
    }

    static async deletePetByID(id : number) {
        const res = await fetch(`${apiPath}/delete`, {
            method: "DELETE",
            body: JSON.stringify({
                pet_id : id,
            }),
            headers: {"Content-Type": "application/json"},
        });
        const data = await res.json();
        if(!res.ok) return {error : data.message};
        return data;
    }
}
