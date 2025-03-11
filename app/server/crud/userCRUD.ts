import { DOMAIN, PHOTO, PHOTO_KEY, PHOTOPOST, PHOTODELETE } from "../domain";

const apiPath = `${DOMAIN}/user`;

export default class UserAPI {
    static async getUser() {
        const res = await fetch(`${apiPath}/getAll`, {method: "GET"})
        const data = await res.json();
        if(!res.ok) return { error: data.message };
        return data;
    }
    
    static async getUserByID(userID : string) {
        const res = await fetch(`${apiPath}/getById`, {
            method: "GET",
            body: JSON.stringify({
                user_id : userID,
            })
        })
        const data = await res.json();
        if(!res.ok) return { error: data.message };
        return data;
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
        const res = await fetch(`${apiPath}/register`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                salary: parseInt(salary),
                priority: "user",
                photo_url: PHOTO+"default-profile.png",
            }),
            headers: {"Content-Type": "application/json"},
        });
        const data = await res.json();
        if(!res.ok) return { error: data.message };
        return data;
    }
    
    static async userLogin(
        username: string, 
        password: string
    ) {
        const res = await fetch(`${apiPath}/login`, {
            method: "POST",
            body : JSON.stringify({
                username : username,
                password: password,
            }),
            headers: {"Content-Type": "application/json"},
        });
        const data = await res.json();
        if(!res.ok) return { error: data.message };
        return data;
    }
    
    static async updateUser(
        id: string,
        updates: {
            username?: string;
            email?: string;
            firstName?: string;
            lastName?: string;
            phoneNumber?: string;
            photoUrl?: string;
            salary?: string;
        }
    ) {
        const res = await fetch(`${apiPath}/update`, {
            method: "PUT",
            body: JSON.stringify({
                id,
                username: updates.username,
                email: updates.email,
                first_name: updates.firstName,
                last_name: updates.lastName,
                phone_number: updates.phoneNumber,
                photo_url: updates.photoUrl,
                salary: updates.salary ? parseFloat(updates.salary) : undefined,
            }),
            headers: { "Content-Type": "application/json" },
        });
    
        const data = await res.json();
        if (!res.ok) {
            return { error: data.message };
        }
        return data;
    }

}