const Photo = process.env.PHOTO as string
const Domain = process.env.DOMAIN as string


export const photoPath = () => {
    return Photo;
}

export const domainPath = () => {
    return Domain;
}
