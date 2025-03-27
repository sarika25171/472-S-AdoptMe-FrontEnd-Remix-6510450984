export const Photo = process.env.PHOTO as string;
export const PhotoKey = process.env.PHOTO_KEY as string;
export const PhotoDelete = process.env.PHOTODELETE as string;
export const PhotoS3Post = process.env.PHOTOS3POST as string;
export const Domain = process.env.DOMAIN as string;
export const SessionKey = process.env.SESSION_SECRET as string;
export const PhotoS3 = process.env.PHOTOS3 as string;

export const photoPath = () => Photo;
export const photoKeyPath = () => PhotoKey;
export const photoDeletePath = () => PhotoDelete;
export const photoPostPath = () => PhotoS3Post;
export const domainPath = () => Domain;
export const sessionKeyPath = () => SessionKey;
export const photoS3Path = () => PhotoS3; 