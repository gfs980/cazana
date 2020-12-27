import vehicles from "../src/models/vehicles";
import { dayPastAfterKnownDate, fromDateYearsCalculator, days365Ago, today, yearAgo, yesterday } from "../src/timeStamps";
const [FordFiesta, MercSCoupe, MercGWagen] = vehicles;

// Testing date stamps from MOMENT() to calculate the age of the car.
it('should calculate the age of the fordFiesta as 7 years even that it is 7 and 6 months old', () => {
    expect(fromDateYearsCalculator(FordFiesta.first_registration_date)).toEqual(7);
})

it('should calculate the age of the MercSCoupe as 3 years even that it is 3 and 3 months old', () => {
  expect(fromDateYearsCalculator(MercSCoupe.first_registration_date)).toEqual(3);
})

it('should calculate the age of the Mercedes G-Wagen as 2 years even that it is 2 and 3 months old', () => {
  expect(fromDateYearsCalculator(MercGWagen.first_registration_date)).toEqual(2);
})

it('should calculate the age of the test date as 2 years even that it is 2 and 11 months old', () => {
  expect(fromDateYearsCalculator(new Date('January 2018'))).toEqual(2);
})

it('should calculate the age of the test2 date as 0 years even that it is 1 month old', () => {
  expect(fromDateYearsCalculator(new Date('11 November 2020'))).toEqual(0);
})



// Testing date stamps from MOMENT() to see if provided values are correct.
it('testing how many days past after yesterday', () => {
    expect(dayPastAfterKnownDate(yesterday)).toEqual(1)
  });
  
  it('testing how many days past after today', () => {
    expect(dayPastAfterKnownDate(today)).toEqual(0)
  })
  
  it('testing how many days past after 1 year', () => {
    expect(dayPastAfterKnownDate(yearAgo)).toEqual(366) // 2020 is a leap year, so there are 366 days in the year
  })
  
  it('testing how many days past after 365 days ago', () => {
    expect(dayPastAfterKnownDate(days365Ago)).toEqual(365) // 2020 is a leap year, so there are 366 days in the year
  })
  