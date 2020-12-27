import currentEstimateMileageType from "./types/timeLineEvents";
import Vehicle, {DetailsWithMileageAndDate} from "./types/Vehicle";
import {dayPastAfterKnownDate, fromDateYearsCalculator} from "./timeStamps";

export default class TimelineEventsClassBased {
    vehicle: Vehicle;

    constructor(vehicle) {
        this.vehicle = vehicle;
    }

    findAnnualMileageEstimate(mileage:number, approxCarManufactureDate:Date):number{
        const approxCarAge:number = fromDateYearsCalculator(approxCarManufactureDate);
        return Math.round((mileage / approxCarAge + Number.EPSILON) * 100) / 100;
    }

    sortListOfDetailsByMileageVsDateReducer(accumulator:DetailsWithMileageAndDate, currentValue:DetailsWithMileageAndDate):DetailsWithMileageAndDate{
        return accumulator.mileage > currentValue.mileage ? accumulator : currentValue;
    }

    combineMotWithSalesIntoMileageAndDate(data):DetailsWithMileageAndDate{
        return {mileage: data.mileage, date: data.date};
    };

    findLatestHonestRegisteredData():DetailsWithMileageAndDate{
        const combinedMotWithSales = [...this.vehicle.mots, ...this.vehicle.sale_adverts];
        return combinedMotWithSales.length &&
            combinedMotWithSales.map(this.combineMotWithSalesIntoMileageAndDate).reduce(this.sortListOfDetailsByMileageVsDateReducer);
    }

    calculateAnnualMileageEstimates():number{
        const latestHonestData:DetailsWithMileageAndDate = this.findLatestHonestRegisteredData();
        if(latestHonestData) {
            return this.findAnnualMileageEstimate(latestHonestData.mileage, this.vehicle.first_registration_date);
        }
        else {
            return 7900;
        }
    }

    currentEstimateMileage(details:currentEstimateMileageType):number{
        const {annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered} = details;
        const mileagePerDay:number = annualEstimate / 365;
        const daysPast:number = dayPastAfterKnownDate(dateAtLatestMileageRegistered);
        return latestMileageRegistered + daysPast * mileagePerDay;
    }

    estimateVehicleCurrentMileage():number{
        const annualEstimate:number = this.calculateAnnualMileageEstimates();
        const latestDataKnownAboutMileage:DetailsWithMileageAndDate = this.findLatestHonestRegisteredData();
        if(latestDataKnownAboutMileage){
            const latestMileageRegistered:number = latestDataKnownAboutMileage.mileage;
            const dateAtLatestMileageRegistered:Date = latestDataKnownAboutMileage.date;
            return this.currentEstimateMileage({annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered});
        }
        else{
            return annualEstimate / 365 * dayPastAfterKnownDate(this.vehicle.first_registration_date);
        }
    }
}
