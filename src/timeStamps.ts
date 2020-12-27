import * as moment from 'moment'

export const yesterday:Date = new Date(moment().subtract(1, 'days').format());
export const today:Date = new Date(moment().format());
export const yearAgo:Date = new Date(moment().subtract(1, 'years').format());
export const days365Ago:Date = new Date(moment().subtract(1, 'years').add(1, 'day').format());

export const fromDateYearsCalculator = (date:Date):number => {
    const now:moment.Moment = moment();
    const carDate:moment.Moment =  moment(date);
    return now.diff(carDate, 'years');
}

export const dayPastAfterKnownDate = (date:Date):number => {
    const now:moment.Moment = moment();
    const knowDate:moment.Moment = moment(date);
    return now.diff(knowDate, 'days');
}