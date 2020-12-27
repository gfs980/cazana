import vehicles from "../src/models/vehicles";
import {fromDateYearsCalculator} from "../src/timeStamps";
import TimelineEventsClassBased from "../src/timelineEventsClassBased";
import * as TimeLineEvents from "../src/timelineEvents";

const [FordFiesta, MercSCoupe, MercGWagen, UnknownVehicle] = vehicles;


// Calculating the average annual mileage using the events in the timeline by MOT
it('Calculate the average annual mileage using the events in the timeline by the MOT history from Ford Fiesta', () => {
  expect(new TimelineEventsClassBased(FordFiesta).calculateAnnualMileageEstimates())
      .toEqual(new TimelineEventsClassBased(FordFiesta).findAnnualMileageEstimate(FordFiesta.mots[0].mileage, FordFiesta.first_registration_date));
})

it('Calculate the average annual mileage using the events in the timeline by the only 1 MOT test from Mercedes S coupe', () => {
  expect(new TimelineEventsClassBased(MercSCoupe).calculateAnnualMileageEstimates())
      .toEqual(new TimelineEventsClassBased(MercSCoupe).findAnnualMileageEstimate(MercSCoupe.sale_adverts[0].mileage, MercSCoupe.first_registration_date));
})

it('Calculate the average annual mileage using the events in the timeline without MOT test as 7900 from Mercedes G-Wagen', () => {
  expect(new TimelineEventsClassBased(MercGWagen).calculateAnnualMileageEstimates())
      .toEqual(new TimelineEventsClassBased(MercSCoupe).findAnnualMileageEstimate(MercGWagen.sale_adverts[0].mileage, MercGWagen.first_registration_date));
})

// Calculating the average annual mileage using the events in the timeline by Sale History
it('Calculate the average annual mileage using the events in the timeline by the fake data', () => {
  expect(new TimelineEventsClassBased(UnknownVehicle).calculateAnnualMileageEstimates())
      .toEqual(7900);
})


// Estimating Current mileage by MOT or Sale history
it('testing current mileage should be higher than last MOT test or sale advert for Ford Fiesta', () => {
  const timeLineVehicle = new TimelineEventsClassBased(FordFiesta);
  const annualEstimate:number = timeLineVehicle.calculateAnnualMileageEstimates();
  const latestMileageRegistered:number = FordFiesta.sale_adverts[0].mileage;
  const dateAtLatestMileageRegistered:Date = FordFiesta.sale_adverts[0].date;
  expect(timeLineVehicle.currentEstimateMileage({annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered}))
      .toBeGreaterThanOrEqual(FordFiesta.sale_adverts[0].mileage)
})

it('testing current mileage should be higher than last MOT test or sale advert for Mercedes S coupe', () => {
  const timeLineVehicle = new TimelineEventsClassBased(MercSCoupe);
  const annualEstimate:number = timeLineVehicle.calculateAnnualMileageEstimates();
  const latestMileageRegistered:number = MercSCoupe.sale_adverts[0].mileage;
  const dateAtLatestMileageRegistered:Date = MercSCoupe.sale_adverts[0].date;
  expect(timeLineVehicle.currentEstimateMileage({annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered}))
      .toBeGreaterThanOrEqual(MercSCoupe.sale_adverts[0].mileage)
})

it('testing current mileage should be higher than last MOT test or sale advert for Mercedes G-Wagen', () => {
  const timeLineVehicle = new TimelineEventsClassBased(MercGWagen);
  const annualEstimate:number = timeLineVehicle.calculateAnnualMileageEstimates();
  const latestMileageRegistered:number = MercGWagen.sale_adverts[0].mileage;
  const dateAtLatestMileageRegistered:Date = MercGWagen.sale_adverts[0].date;
  expect(timeLineVehicle.currentEstimateMileage({annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered}))
      .toBeGreaterThanOrEqual(MercGWagen.sale_adverts[0].mileage)
})


// Finding Honest mileage by projecting from the most recent, event using the average annual mileage
// By the meaning of "Honest" I mean that some times the Ads get posted after or before the MOT test was done and even in case of when the
// ad is most recent compared to MOT but it has lower mileage compared to MOT test as example with Ford Fiesta. Therefore in this
// case I will take the details from MOT or the oldest mileage that was registered at the date.
it('Finding Honest mileage by projecting from the most recent, event using the average annual mileage for Ford Fiesta', () => {
  expect(new TimelineEventsClassBased(FordFiesta).estimateVehicleCurrentMileage()).toBeGreaterThan(7900)
})

it('Finding Honest mileage by projecting from the most recent, event using the average annual mileage for Mercedes S coupe', () => {
  expect(new TimelineEventsClassBased(MercSCoupe).estimateVehicleCurrentMileage()).toBeGreaterThan(7900)
})

it('Finding Honest mileage by projecting from the most recent, event using the average annual mileage for Mercedes G-Wagen', () => {
  expect(new TimelineEventsClassBased(MercGWagen).estimateVehicleCurrentMileage()).toBeGreaterThan(7900)
})

it('Finding Honest mileage by projecting from the most recent, event using the average annual mileage for UnknownVehicle Test', () => {
  expect(new TimelineEventsClassBased(UnknownVehicle).estimateVehicleCurrentMileage()).toBeGreaterThan(7900) //since the unknown car is 5 years old
  expect(new TimelineEventsClassBased(UnknownVehicle).estimateVehicleCurrentMileage()).toBeGreaterThan(7900 * 5) //since the unknown car is 5 years old
})
