import * as TimeLineEvents from "../src/timelineEvents";
import vehicles from "../src/models/vehicles";

const [FordFiesta, MercSCoupe, MercGWagen, UnknownVehicle] = vehicles;

// Find annual mileage with mileage and date
it('Find annual mileage for Ford Fiesta', () => {
  expect(TimeLineEvents.findAnnualMileageEstimate(FordFiesta.mots[0].mileage, FordFiesta.first_registration_date))
      .toBe(16556.14)
})

it('Find annual mileage for MercSCoupe', () => {
  expect(TimeLineEvents.findAnnualMileageEstimate(MercSCoupe.sale_adverts[0].mileage, MercSCoupe.first_registration_date))
      .toBe(5494.67)
})

it('Find annual mileage for MercGWagen', () => {
  expect(TimeLineEvents.findAnnualMileageEstimate(MercGWagen.sale_adverts[0].mileage, MercGWagen.first_registration_date))
      .toBe(8401)
})



// Finding latest honest mileage and date that was registered
it('Find honest mileage and date for Ford Fiesta', () => {
  expect(TimeLineEvents.findLatestHonestRegisteredData(FordFiesta))
      .toStrictEqual({
        date: new Date('4 August 2020'),
        mileage: 115893
      })
})

it('Find honest mileage and date for Mercedes S coupe', () => {
  expect(TimeLineEvents.findLatestHonestRegisteredData(MercSCoupe))
      .toStrictEqual({
        date: new Date('17 December 2020'),
        mileage: 16484
      })
})

it('Find honest mileage and date for Mercedes G-Wagen', () => {
  expect(TimeLineEvents.findLatestHonestRegisteredData(MercGWagen))
      .toStrictEqual({
        date: new Date('1 October 2020'),
        mileage: 16802
      })
})

it('Find honest mileage and date for UnknownVehicle, should be 0 since it has no MOT and Sales', () => {
  expect(TimeLineEvents.findLatestHonestRegisteredData(UnknownVehicle))
      .toBe(0)
})



// Calculating the average annual mileage using the events in the timeline by MOT
it('Calculate the average annual mileage using the events in the timeline by the MOT history from Ford Fiesta', () => {
  expect(TimeLineEvents.calculateAnnualMileageEstimates(FordFiesta))
      .toEqual(TimeLineEvents.findAnnualMileageEstimate(FordFiesta.mots[0].mileage, FordFiesta.first_registration_date));
})

it('Calculate the average annual mileage using the events in the timeline by the only 1 MOT test from Mercedes S coupe', () => {
  expect(TimeLineEvents.calculateAnnualMileageEstimates(MercSCoupe))
      .toEqual(TimeLineEvents.findAnnualMileageEstimate(MercSCoupe.sale_adverts[0].mileage, MercSCoupe.first_registration_date));
})

it('Calculate the average annual mileage using the events in the timeline without MOT test as 7900 from Mercedes G-Wagen', () => {
  expect(TimeLineEvents.calculateAnnualMileageEstimates(MercGWagen)).toEqual(MercGWagen.sale_adverts[0].mileage / fromDateYearsCalculator(MercGWagen.first_registration_date));
})

// Calculating the average annual mileage using the events in the timeline by Sale History
it('Calculate the average annual mileage using the events in the timeline by the fake data', () => {
  expect(TimeLineEvents.calculateAnnualMileageEstimates(UnknownVehicle))
      .toEqual(7900);
})



// Estimating Current mileage by MOT or Sale history
it('testing current mileage should be higher than last MOT test or sale advert for Ford Fiesta', () => {
  const annualEstimate:number = TimeLineEvents.calculateAnnualMileageEstimates(FordFiesta);
  const latestMileageRegistered:number = FordFiesta.mots[0].mileage;
  const dateAtLatestMileageRegistered:Date = FordFiesta.mots[0].date;
  expect(TimeLineEvents.currentEstimateMileage({annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered}))
      .toBeGreaterThanOrEqual(FordFiesta.mots[0].mileage)
})

it('testing current mileage should be higher than last MOT test or sale advert for Mercedes S coupe', () => {
  const annualEstimate:number = TimeLineEvents.calculateAnnualMileageEstimates(MercSCoupe);
  const latestMileageRegistered:number = MercSCoupe.mots[0].mileage;
  const dateAtLatestMileageRegistered:Date = MercSCoupe.mots[0].date;
  expect(TimeLineEvents.currentEstimateMileage({annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered}))
      .toBeGreaterThanOrEqual(MercSCoupe.mots[0].mileage)
})

it('testing current mileage should be higher than last MOT test or sale advert for Mercedes G-Wagen', () => {
  const annualEstimate:number = TimeLineEvents.calculateAnnualMileageEstimates(MercGWagen);
  const latestMileageRegistered:number = MercGWagen.sale_adverts[0].mileage;
  const dateAtLatestMileageRegistered:Date = MercGWagen.sale_adverts[0].date;
  expect(TimeLineEvents.currentEstimateMileage({annualEstimate, latestMileageRegistered, dateAtLatestMileageRegistered}))
      .toBeGreaterThanOrEqual(MercGWagen.sale_adverts[0].mileage)
})



// Finding Honest mileage by projecting from the most recent, event using the average annual mileage
// By the meaning of "Honest" I mean that some times the Ads get posted after or before the MOT test was done and even in case of when the
// ad is most recent compared to MOT but it has lower mileage compared to MOT test as example with Ford Fiesta. Therefore in this
// case I will take the details from MOT or the oldest mileage that was registered at the date.
it('Finding Honest mileage by projecting from the most recent, event using the average annual mileage for Ford Fiesta', () => {
  expect(TimeLineEvents.estimateVehicleCurrentMileage(FordFiesta)).toBeGreaterThan(7900)
})

it('Finding Honest mileage by projecting from the most recent, event using the average annual mileage for Mercedes S coupe', () => {
  expect(TimeLineEvents.estimateVehicleCurrentMileage(MercSCoupe)).toBeGreaterThan(7900)
})

it('Finding Honest mileage by projecting from the most recent, event using the average annual mileage for Mercedes G-Wagen', () => {
  expect(TimeLineEvents.estimateVehicleCurrentMileage(MercGWagen)).toBeGreaterThan(7900)
})

it('Finding Honest mileage by projecting from the most recent, event using the average annual mileage for UnknownVehicle Test', () => {
  expect(TimeLineEvents.estimateVehicleCurrentMileage(UnknownVehicle)).toBeGreaterThan(7900 * 5) //since the unknown car is 5 years old
})
