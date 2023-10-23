export type Place = {
    id: string,
    image: string,
    name: string,
    userId: string,
    description: string,
    address: string,
    location: Location
}

export type Location = {
    lat: number,
    lng: number
}