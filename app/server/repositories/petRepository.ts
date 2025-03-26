import Pet from "~/models/pet";

const Domain = process.env.DOMAIN!
const Photo = process.env.PHOTO!

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
        const res = await fetch(`${apiPath}/createPet`, {
            method: "POST",
            body: JSON.stringify({
                pet_name: name,
                age_years: parseInt(ageYear),
                age_months: parseInt(ageMonth),
                species: type,
                breed: breed,
                photo_url:
                    Photo +
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
