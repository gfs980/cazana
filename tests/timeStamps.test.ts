import vehicles from "../src/models/vehicles";
import { fromDateYearsCalculator } from "../src/timeStamps";
const [FordFiesta, MercSCoupe, MercGWagen] = vehicles;

// Testing date stamps from MOMENT() to calculate the age of the car.
it('should calculate the age of the fordFiesta as 7 years even that it is 7 and 6 months old', () => {
    expect(fromDateYearsCalculator(FordFiesta.first_registration_date)).toEqual(7);
})