import {fromDateYearsCalculator, dayPastAfterKnownDate} from "./timeStamps";
import currentEstimateMileageType from "./types/timeLineEvents";
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


export const calculateAnnualMileageEstimates = (vehicle:Vehicle):number => {
    const latestHonestData:DetailsWithMileageAndDate = findLatestHonestRegisteredData(vehicle);
    if(latestHonestData) {
        return findAnnualMileageEstimate(latestHonestData.mileage, vehicle.first_registration_date);
    }
    else {
        return 7900;
    }
}


export const currentEstimateMileage = (details:currentEstimateMileageType):number => {
    const {annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered} = details;
    const mileagePerDay:number = annualEstimate / 365;
    const daysPast:number = dayPastAfterKnownDate(dateAtLatestMileageRegistered);
    return latestMileageRegistered + daysPast * mileagePerDay;
}


export const estimateVehicleCurrentMileage = (vehicle:Vehicle):number => {
    const annualEstimate:number = calculateAnnualMileageEstimates(vehicle);
    const latestDataKnownAboutMileage:DetailsWithMileageAndDate = findLatestHonestRegisteredData(vehicle);
    if(latestDataKnownAboutMileage) {
        const latestMileageRegistered:number = latestDataKnownAboutMileage.mileage;
        const dateAtLatestMileageRegistered:Date = latestDataKnownAboutMileage.date;
        return currentEstimateMileage({annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered})
    }
    else {
        return annualEstimate / 365 * dayPastAfterKnownDate(vehicle.first_registration_date);
    }
}