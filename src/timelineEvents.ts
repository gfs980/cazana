import {fromDateYearsCalculator} from "./timeStamps";
import Vehicle, {DetailsWithMileageAndDate} from "./types/Vehicle";

export const findAnnualMileageEstimate = (mileage:number, approxCarManufactureDate:Date):number => {
    const approxCarAge:number = fromDateYearsCalculator(approxCarManufactureDate);
    return Math.round((mileage / approxCarAge + Number.EPSILON) * 100) / 100
}

export const sortListOfDetailsByMileageVsDateReducer = (accumulator:DetailsWithMileageAndDate, currentValue:DetailsWithMileageAndDate):DetailsWithMileageAndDate => {
    return accumulator.mileage > currentValue.mileage ? accumulator : currentValue
}

export const combineMotWithSalesIntoMileageAndDate = (data):DetailsWithMileageAndDate => ({mileage: data.mileage, date: data.date});

export const findLatestHonestRegisteredData = (vehicle: Vehicle):DetailsWithMileageAndDate => {
    const combinedMotWithSales = [...vehicle.mots, ...vehicle.sale_adverts];
    return combinedMotWithSales.length &&
        combinedMotWithSales.map(combineMotWithSalesIntoMileageAndDate).reduce(sortListOfDetailsByMileageVsDateReducer);
}