const Photo = process.env.PHOTO as string
const PhotoKey = process.env.PHOTO_KEY as string
const PhotoDelete = process.env.PHOTODELETE as string
const PhotoS3Post = process.env.PHOTOS3POST as string
const Domain = process.env.DOMAIN as string
const SessionKey = process.env.SESSION_SECRET as string
const PhotoS3 = process.env.PHOTOS3 as string

export const photoPath = () => {
    return Photo;
}

export const domainPath = () => {
    return Domain;
}

export const photoKeyPath = () => {
    return PhotoKey;
}

export const photoDeletePath = () => {
    return PhotoDelete;
}

export const photoPostPath = () => {
    return PhotoS3Post;
}

export const photoS3Path = () => {
    return PhotoS3;
}



export const sessionKeyPath = () => {
    return SessionKey;
}
