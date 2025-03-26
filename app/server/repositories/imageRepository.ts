import { domainPath, photoDeletePath, photoPostPath, photoKeyPath } from "../path.server";

const Domain = domainPath();
const PhotoKey = photoKeyPath();
const PhotoPost = photoPostPath();
const PhotoDelete = photoDeletePath();

export default class ImageAPI {
    static async uploadImage(file: File, fileName: string) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", fileName);
        formData.append("key", PhotoKey);
    
        const res = await fetch(PhotoPost, {
            method: "POST",
            body : formData, // ไม่ต้องมี Header เพราะใช้ FormData() = Auto Header Content-Type
        })
    }
    static async deleteImage(fileName: string) {
        const formData = new FormData();
        formData.append("filename", fileName);
        formData.append("key", PhotoKey);

        const res = await fetch(PhotoDelete, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: formData,
        });
    }
}
