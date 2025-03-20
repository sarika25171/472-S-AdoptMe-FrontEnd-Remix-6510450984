import User from "~/models/user";

const Domain = process.env.DOMAIN!
const Photo = process.env.PHOTO!

const apiPath = `${Domain}/user`;

export default class UserAPI {
    static async getUser() : Promise<User[]> {
        const res = await fetch(`${apiPath}/getAll`, {method: "GET"})
        const data : User[] = await res.json();
        return data;
    }
    
    static async getUserByID(userID : string) : Promise<User> {
        const res = await fetch(`${apiPath}/getById`, {
            method: "GET",
            body: JSON.stringify({
                user_id : userID,
            })
        })
        const data = await res.json();
        if(!data)
            throw new Error("User not found");
        return data;
    }

    static async getUserByUsername(username : string) : Promise<User> {
        const res = await fetch(`${apiPath}/getByUsername`, {
            method: "GET",
            body: JSON.stringify({
                username : username,
            })
        })
        const data = await res.json();
        if(!data)
            throw new Error("User not found");
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
                photo_url: Photo+"default-profile.png",
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
            salary?: number;
        }
    ) {
        const res = await fetch(`${apiPath}/update`, {
            method: "PUT",
            body: JSON.stringify({
                id,
                ...updates
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