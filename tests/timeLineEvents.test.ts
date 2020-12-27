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