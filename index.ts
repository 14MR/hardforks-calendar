import ical, {ICalCalendarMethod} from 'ical-generator';
import {writeFileSync} from 'fs';

// @ts-ignore
import hardforks from "./hardforks.json";

const calendar = ical({name: 'Calendar of web3 hardforks'});

// A method is required for outlook to display event as an invitation
calendar.method(ICalCalendarMethod.REQUEST);
hardforks.forEach(hardfork => {
    const startTime = new Date(hardfork.timestamp*1000);
    const endTime = new Date(hardfork.timestamp*1000);
    endTime.setHours(startTime.getHours()+1);
    calendar.createEvent({
        start: startTime,
        end: endTime,
        summary: hardfork.name,
        description: hardfork.description,
        location: hardfork.location,
        url: hardfork.url
    });
});

const calendarData = calendar.toString()
writeFileSync('hardforks.ics', calendarData);
