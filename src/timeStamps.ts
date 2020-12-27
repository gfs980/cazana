import * as moment from 'moment'

export const fromDateYearsCalculator = (date:Date):number => {
    const now:moment.Moment = moment();
    const carDate:moment.Moment =  moment(date);
    return now.diff(carDate, 'years');
}