import { domainPath } from "../config.server";

export default class AdoptionAPI {
    private static apiPath = `${domainPath()}/adoption`;

    static async getAdoption() {
        console.log("apiPathAdoption : ", this.apiPath);
        try {
            const res = await fetch(`${this.apiPath}/getAll`, {method : "GET"});
            const data = await res.json();
            if(!res.ok) return {error : data.message};
            return data;
        } catch (error) {
            console.error('Error fetching adoptions:', error);
            return { error: 'Failed to fetch adoptions' };
        }
    }

    static async getAdoptionByPetID(id : number) {
        try {
            const res = await fetch(`${this.apiPath}/getByPetId/${id}`, {method : "GET"});
            const data = await res.json();
            if(!res.ok) return {error : data.message};
            return data;
        } catch (error) {
            console.error('Error fetching adoption by pet ID:', error);
            return { error: 'Failed to fetch adoption by pet ID' };
        }
    }

    static async createAdoption(
        added_user: string,
        pet_id: number
    ) {
        try {
            const res = await fetch(`${this.apiPath}/createAdoption`, {
                method: "POST",
                body : JSON.stringify({
                added_user : added_user,
                pet_id : pet_id,
            }),
            headers: {"Content-Type": "application/json"},
        });
        const data = await res.json();
        if(!res.ok) return {error : data.message};
        return data;
        } catch (error) {
            console.error('Error creating adoption:', error);
            return { error: 'Failed to create adoption' };
        }
    }

    // static async updateAdoption(
    //     adoption_id: number,
    // ) {
    //     const res = await fetch(`${apiPath}/updateAdoption`, {
    //         method: "PUT",
    //         body : JSON.stringify({
    //             id : adoption_id,
    //         }),
    //         headers: {"Content-Type": "application/json"},
    //     });
    //     const data = await res.json();
    //     if(!res.ok) return {error : data.message};
    //     return data
    // }

    static async updateAdopted(
        adoption_id: number,
    ) {
        try {
            const res = await fetch(`${this.apiPath}/adopted`, {
                method: "PATCH",
                body : JSON.stringify({
                id : adoption_id,
            }),
            headers: {"Content-Type": "application/json"},
        });
        const data = await res.json();
        if(!res.ok) return {error : data.message};
        return data
        } catch (error) {
            console.error('Error updating adoption:', error);
            return { error: 'Failed to update adoption' };
        }
    }

    static async deleteAdoptionByID(id : number) {
        try {
            const res = await fetch(`${this.apiPath}/delete`, {
                method: "DELETE",
                body: JSON.stringify({
                pet_id : id,
            }),
            headers: {"Content-Type": "application/json"},
        });
        const data = await res.json();
        if(!res.ok) return {error : data.message};
        return data;
        } catch (error) {
            console.error('Error deleting adoption:', error);
            return { error: 'Failed to delete adoption' };
        }
    }
}
