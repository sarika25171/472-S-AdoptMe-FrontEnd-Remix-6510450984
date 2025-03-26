const Photo = process.env.PHOTO as string
const PhotoKey = process.env.PHOTO_KEY as string
const PhotoDelete = process.env.PHOTODELETE as string
const PhotoPost = process.env.PHOTOPOST as string
const Domain = process.env.DOMAIN as string
const SessionKey = process.env.SESSION_SECRET as string

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
    return PhotoPost;
}

export const sessionKeyPath = () => {
    return SessionKey;
}
