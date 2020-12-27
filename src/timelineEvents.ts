import {fromDateYearsCalculator} from "./timeStamps";

export const findAnnualMileageEstimate = (mileage:number, approxCarManufactureDate:Date):number => {
    const approxCarAge:number = fromDateYearsCalculator(approxCarManufactureDate);
    return Math.round((mileage / approxCarAge + Number.EPSILON) * 100) / 100
}