import * as TimeLineEvents from "../src/timelineEvents";
import vehicles from "../src/models/vehicles";

const [FordFiesta, MercSCoupe, MercGWagen, UnknownVehicle] = vehicles;

// Find annual mileage with mileage and date
it('Find annual mileage for Ford Fiesta', () => {
  expect(TimeLineEvents.findAnnualMileageEstimate(FordFiesta.mots[0].mileage, FordFiesta.first_registration_date))
      .toBe(16556.14)
})