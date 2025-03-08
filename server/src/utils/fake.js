import { faker } from '@faker-js/faker';
import { generatePassCode } from './other-token.js';
import { demoTickets } from './data.jst';


export const generateAttendees = () => {
  const attendees = [];
  for (let i = 0; i < 4; i++) { 
    const name = faker.person.fullName(); 
    const passCode = generatePassCode()
    attendees.push({
      name,
      passCode,
      arrived: false
    });
  }
  return attendees;
};


export const generateDemoTickets = () => {
  const demoTickets = [];
  for (let i = 0; i < 10; i++) {
    const attendees = generateAttendees();
    const ticket = {
      // attendees,
      eventId: "678919b0bcc512e4db28487e", 
      userId: "67866d2561bea229c025466f", 
      date: faker.date.future(1).toISOString().slice(0, 10).replace(/-/g, "/"), 
      status: "confirmed",
      
    };
    demoTickets.push(ticket);
  }
  return demoTickets;
};


