import { faker } from '@faker-js/faker';
import { generatePassCode } from './passcode.js';



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



export const demoTickets = [
  {
    eventId: '678919b0bcc512e4db28487e',
    userId: '67866d2561bea229c025466f',
    date: '2025/01/31',
    status: 'confirmed',
    
  },
  {
    eventId: '678919b0bcc512e4db28487e',
    userId: '67866d2561bea229c025466d',
    date: '2025/01/31',
    status: 'confirmed',
    
  },
  {
    eventId: '678919b0bcc512e4db28487e',
    userId: '67866d2561bea229c025466e',
    date: '2025/01/31',
    status: 'confirmed',
    
  },
  {
    eventId: '67891ae5bcc512e4db2848af',
    userId: '67866d2561bea229c025466f',
    date: '2025/01/28',
    status: 'confirmed',
    
  },
  {
    eventId: '67891ae5bcc512e4db2848af',
    userId: '6794dd2157bbed541a234a27',
    date: '2025/01/28',
    status: 'confirmed',
    
  },
  {
    eventId: '678919b0bcc512e4db28487e',
    userId: '6794dd2157bbed541a234a27',
    date: '2025/01/31',
    status: 'confirmed',
    
  },
  {
    eventId: '67891ae5bcc512e4db2848af',
    userId: '67866d2561bea229c025466d',
    date: '2025/01/28',
    status: 'confirmed',
    
  },
  {
    eventId: '67891ae5bcc512e4db2848af',
    userId: '67866d2561bea229c025466e',
    date: '2025/01/28',
    status: 'confirmed',
    
  },
  //--Nicole34
  {
    eventId: '67891b23bcc512e4db2848bb',
    userId: '6794dd2157bbed541a234a31',
    date: '2025/01/29',
    status: 'confirmed',
    
  },
  {
    eventId: '678919b0bcc512e4db28487e',
    userId: '6794dd2157bbed541a234a31',
    date: '2025/01/31',
    status: 'confirmed',
    
  },
  {
    eventId: '67891ae5bcc512e4db2848af',
    userId: '6794dd2157bbed541a234a31',
    date: '2025/01/28',
    status: 'confirmed',
    
  },

  //- Cordy567
  {
    eventId: '67891b23bcc512e4db2848bb',
    userId: '6794dd2157bbed541a234a32',
    date: '2025/01/29',
    status: 'confirmed',
    
  },
  {
    eventId: '678919b0bcc512e4db28487e',
    userId: '6794dd2157bbed541a234a32',
    date: '2025/01/31',
    status: 'confirmed',
    
  },
  // - Jeanette67
  {
    eventId: '67891b75bcc512e4db2848c7',
    userId: '6794dd2157bbed541a234a35',
    date: '2025/02/02',
    status: 'confirmed',
    
  },
  {
    eventId: '678aa0f65f59a609f58e88b9',
    userId: '6794dd2157bbed541a234a35',
    date: '2025/01/27',
    status: 'confirmed',
    
  },
  {
    eventId: '67891ae5bcc512e4db2848af',
    userId: '6794dd2157bbed541a234a35',
    date: '2025/01/28',
    status: 'confirmed',
    
  },

  //- Wylma23
  {
    eventId: '678aa0f65f59a609f58e88b9',
    userId: '6794dd2157bbed541a234a36',
    date: '2025/01/27',
    status: 'confirmed',
    
  },
  {
    eventId: '67891b75bcc512e4db2848c7',
    userId: '6794dd2157bbed541a234a36',
    date: '2025/02/02',
    status: 'confirmed',
    
  },

  // -Packston45
  {
    eventId: '67891b75bcc512e4db2848c7',
    userId: '6794dd2157bbed541a234a37',
    date: '2025/02/02',
    status: 'confirmed',
    
  },
  //- Melodee56
  {
    eventId: '67891b75bcc512e4db2848c7',
    userId: '6794dd2157bbed541a234a39',
    date: '2025/02/02',
    status: 'confirmed',
    
  },
  // -Almeta23
  {
    eventId: '678919b0bcc512e4db28487e',
    userId: '6794dd2157bbed541a234a3a',
    date: '2025/01/31',
    status: 'confirmed',
    
  },
  {
    eventId: '67891b75bcc512e4db2848c7',
    userId: '6794dd2157bbed541a234a3a',
    date: '2025/02/02',
    status: 'confirmed',
    
  },

  //-Deeyn456
  {
    eventId: '67891b23bcc512e4db2848bb',
    userId: '6794dd2157bbed541a234a2d',
    date: '2025/01/29',
    status: 'confirmed',
    
  }, 
  // Frasquito12
  {
    eventId: '67891b23bcc512e4db2848bb',
    userId: '6794dd2157bbed541a234a2f',
    date: '2025/01/29',
    status: 'confirmed',
    
  },
  {
    eventId: '67891b75bcc512e4db2848c7',
    userId: '6794dd2157bbed541a234a2f',
    date: '2025/02/02',
    status: 'confirmed',
    
  },
  // - Bonnie23
  {
    eventId: '67891b75bcc512e4db2848c7',
    userId: '6794dd2157bbed541a234a2a',
    date: '2025/02/02',
    status: 'confirmed',
    
  },
  {
    eventId: '67891b23bcc512e4db2848bb',
    userId: '6794dd2157bbed541a234a2a',
    date: '2025/01/29',
    status: 'confirmed',
    
  },
  // - Nigel89
  {
    eventId: '678aa0f65f59a609f58e88b9',
    userId: '6794dd2157bbed541a234a33',
    date: '2025/01/27',
    status: 'confirmed',
    
  },
  {
    eventId: '67891ae5bcc512e4db2848af',
    userId: '6794dd2157bbed541a234a33',
    date: '2026/01/28',
    status: 'confirmed',
    
  },
  {
    eventId: '678919b0bcc512e4db28487e',
    userId: '6794dd2157bbed541a234a33',
    date: '2025/01/31',
    status: 'confirmed',
    
  }
];

export const newDemoUsers = [
  {
    firstName: "Benedikt",
    lastName: "Bulpitt",
    email: "bbulpitt0@chron.com",
    gender: "Male",
    username: "Benedikt345", // Example of mixed with numbers
    dob: "1990-03-15", // Example date between 18-50
    password: "Benedikt123", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Ignacio",
    lastName: "Pudan",
    email: "ipudan1@mapy.cz",
    gender: "Male",
    username: "Pudan28", // Example of mixed with numbers
    dob: "1985-11-22", // Example date between 18-50
    password: "Ignacio456", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Aharon",
    lastName: "Filchagin",
    email: "afilchagin2@digg.com",
    gender: "Male",
    username: "Aharon785", // Example of mixed with numbers
    dob: "1988-09-10", // Example date between 18-50
    password: "Aharon789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Bonnie",
    lastName: "Blick",
    email: "bblick3@google.co.jp",
    gender: "Female",
    username: "Bonnie23", // Example of mixed with numbers
    dob: "1992-07-03", // Example date between 18-50
    password: "Bonnie456", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Michele",
    lastName: "Manna",
    email: "mmanna4@icio.us",
    gender: "Male",
    username: "Michele78", // Example of mixed with numbers
    dob: "1986-12-18", // Example date between 18-50
    password: "Michele789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Leese",
    lastName: "Reckhouse",
    email: "lreckhouse5@msn.com",
    gender: "Female",
    username: "Leese98", // Example of mixed with numbers
    dob: "1995-04-29", // Example date between 18-50
    password: "Leese123", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Deeyn",
    lastName: "Diess",
    email: "ddiess6@foxnews.com",
    gender: "Female",
    username: "Deeyn456", // Example of mixed with numbers
    dob: "1990-11-14", // Example date between 18-50
    password: "Deeyn789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Bar",
    lastName: "Mabson",
    email: "bmabson7@taobao.com",
    gender: "Male",
    username: "Bar654", // Example of mixed with numbers
    dob: "1987-06-25", // Example date between 18-50
    password: "Bar789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Frasquito",
    lastName: "Ilden",
    email: "filden8@phpbb.com",
    gender: "Male",
    username: "Frasquito12", // Example of mixed with numbers
    dob: "1984-09-06", // Example date between 18-50
    password: "Frasquito345", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Ashlin",
    lastName: "O'Cridigan",
    email: "aocridigan9@google.com.br",
    gender: "Male",
    username: "Ashlin78", // Example of mixed with numbers
    dob: "1983-02-11", // Example date between 18-50
    password: "Ashlin789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Nichole",
    lastName: "Abrahmson",
    email: "nabrahmsona@tripadvisor.com",
    gender: "Male",
    username: "Nichole34", // Example of mixed with numbers
    dob: "1993-10-30", // Example date between 18-50
    password: "Nichole123", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Cordy",
    lastName: "Lisciandro",
    email: "clisciandrob@bandcamp.com",
    gender: "Male",
    username: "Cordy567", // Example of mixed with numbers
    dob: "1991-08-17", // Example date between 18-50
    password: "Cordy789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Nigel",
    lastName: "Cantos",
    email: "ncantosc@google.ca",
    gender: "Male",
    username: "Nigel89", // Example of mixed with numbers
    dob: "1989-04-02", // Example date between 18-50
    password: "Nigel789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Daryn",
    lastName: "Claus",
    email: "dclausd@npr.org",
    gender: "Female",
    username: "Daryn45", // Example of mixed with numbers
    dob: "1994-12-08", // Example date between 18-50
    password: "Daryn123", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Jeanette",
    lastName: "Yule",
    email: "jyulee@studiopress.com",
    gender: "Female",
    username: "Jeanette67", // Example of mixed with numbers
    dob: "1997-01-20", // Example date between 18-50
    password: "Jeanette789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Wylma",
    lastName: "Gabel",
    email: "wgabelf@squarespace.com",
    gender: "Female",
    username: "Wylma23", // Example of mixed with numbers
    dob: "1990-08-05", // Example date between 18-50
    password: "Wylma456", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Packston",
    lastName: "Bortoluzzi",
    email: "pbortoluzzig@histats.com",
    gender: "Male",
    username: "Packston45", // Example of mixed with numbers
    dob: "1993-03-25", // Example date between 18-50
    password: "Packston789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Renate",
    lastName: "Orred",
    email: "rorredh@cyberchimps.com",
    gender: "Female",
    username: "Renate67", // Example of mixed with numbers
    dob: "1991-12-12", // Example date between 18-50
    password: "Renate789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Melodee",
    lastName: "Starling",
    email: "mstarlingi@seattletimes.com",
    gender: "Female",
    username: "Melodee56", // Example of mixed with numbers
    dob: "1996-09-14", // Example date between 18-50
    password: "Melodee789", // Example of simplified password
    role: "user",
  },
  {
    firstName: "Almeta",
    lastName: "Tenpenny",
    email: "atenpennyj@dagondesign.com",
    gender: "Female",
    username: "Almeta23", // Example of mixed with numbers
    dob: "1987-05-21", // Example date between 18-50
    password: "Almeta456", // Example of
  },
];
