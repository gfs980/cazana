import MOT from "./MOT";
import Advert from "./Advert";
import VRM from "./VRM";

export default interface Vehicle {
    _id: number,
    vrm: string,
    make: string,
    model: string,
    first_registration_date: Date,
    mots: MOT[],
    sale_adverts: Advert[],
    number_plate_changes: VRM[]
}

export interface DetailsWithMileageAndDate {
    mileage: number,
    date: Date,
}
