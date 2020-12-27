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