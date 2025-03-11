import { DOMAIN, PHOTO } from "../domain";

const apiPath = `${DOMAIN}/pet`;

export default class PetAPI {
    static async getPetById(id: number) {
        const res = await fetch(`${apiPath}/getById/${id}`, { method: "GET" });
    
        if (!res.ok) {
            return { error: `Failed to fetch pet: ${res.status} ${res.statusText}` };
        }
    
        return res.json();
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
        const res = await fetch(`${apiPath}/createPet`, {
            method: "POST",
            body: JSON.stringify({
                pet_name: name,
                age_years: parseInt(ageYear),
                age_months: parseInt(ageMonth),
                species: type,
                breed: breed,
                photo_url:
                    PHOTO +
                    name.trim().replace(" ", "") +
                    "-photo.jpg",
                weight: parseInt(weight),
                adopted: false,
                spayed: false,
                description: detail,
                color: color,
                sex: gender,
            }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
            return { error: `Failed to fetch pet: ${res.status} ${res.statusText}` };
        }
    
        return data;
    }

    static async updatePetByID(id: number) {
        const res = await fetch(`${apiPath}/updatePet`, {
            method: "PUT",
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
}