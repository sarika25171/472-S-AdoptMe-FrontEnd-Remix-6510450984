import { PHOTO_KEY, PHOTOPOST } from "../domain";

export default class ImageAPI {
    static async uploadImage(file: File, fileName: string) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", fileName);
        formData.append("key", PHOTO_KEY);
    
        const res = await fetch(PHOTOPOST, {
            method: "POST",
            body : formData, // ไม่ต้องมี Header เพราะใช้ FormData() = Auto Header Content-Type
        })
    }
}
