export type Place = {
    id: string,
    image: string,
    name: string,
    userId: string,
    description: string,
    address: string,
    coordinates: Location
}

export type Location = {
    lat: string,
    lng: string
}