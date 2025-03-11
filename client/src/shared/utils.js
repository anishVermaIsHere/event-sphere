import categoryAPI from "./services/api/category";
import eventAPI from "./services/api/event";
import locationAPI from "./services/api/location";
import userAPI from "./services/api/user";
import ticketAPI from "./services/api/ticket";
import dayjs from "dayjs";
import { Country, State, City }  from 'country-state-city';
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkStringify from 'remark-stringify'
import {unified} from 'unified'



// export function getCountryByName(countryName){
//   if(!countryName) return [];
//   const allCountries = Country.getAllCountries();
//   const countries = allCountries.filter((cn)=>(cn.name.toLowerCase().includes(countryName.toLowerCase()) ))
//   return countries;
// }


export async function htmlToMarkdown(htmlTemplateString){
  const markdownString = await unified()
  .use(rehypeParse)
  .use(rehypeRemark)
  .use(remarkStringify)
  .process(htmlTemplateString);

  return String(markdownString);
}

export function getCountries(){
  return Country.getAllCountries();
}

export function getCountryByCode(countryCode="IN"){
  return Country.getCountryByCode(countryCode)
}

export function getStatesByCountry(countryCode="IN"){
  return State.getStatesOfCountry(countryCode);
}

export function getCities(countryCode="IN", stateCode="DL"){
  return City.getCitiesOfState(countryCode, stateCode);
}

export function parsePersistedData(data) {
  const parsedData = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      try {
        parsedData[key] = JSON.parse(data[key]);
      } catch (err) {
        parsedData[key] = data[key];
      }
    }
  }

  return parsedData;
}

export function getAuth() {
  const auth = localStorage.getItem("_auth") || "{}";
  const parsedData = parsePersistedData(JSON.parse(auth));
  return parsedData?.state;
}

export const fetchEventsData = async () => {
  const prom = await Promise.all([
    userAPI.findByRole("guest"),
    userAPI.findByRole("speaker"),
    locationAPI.find(),
    categoryAPI.find(),
  ]);
  const userKeys = {
    guests: {},
    speakers: {},
  };
  prom[0]?.data?.forEach((d) => (userKeys.guests[d._id] = d));
  prom[1]?.data?.forEach((d) => (userKeys.speakers[d._id] = d));

  return {
    guests: prom[0].data,
    speakers: prom[1].data,
    locations: prom[2].data,
    categories: prom[3].data,
    userKeys,
  };
};

export const formattedValue = (value)=> {
  if(value >= 1000000000){
    return (value/1000000000)+'B'
  }
  if(value >= 1000000){
    return (value/1000000)+'M'
  }
  if(value >= 1000){
    return (value/1000)+'K'
  }
  return value;
}

export const formattedAmount = (centsValue)=> {
  const value = centsValue / 100;
  if(value >= 1000000000){
    return formatCurrency({amount: (value/1000000000), decimalDigits: 0 })+'B'
  }
  if(value >= 1000000){
    return formatCurrency({amount: (value/1000000), decimalDigits: 0 })+'M'
  }
  if(value >= 1000){
    return formatCurrency({amount: (value/1000), decimalDigits: 0 })+'K'
  }
  return formatCurrency({ amount: value });
}


const getTicketSales = (daysInMonth, tickets) => {
  const revenueByDate = {};
   tickets?.forEach((tk)=>{ 
    Object.entries(tk).forEach(([date,value])=>{
      const formattedDate = dayjs(date).format('MMM D');
      if (revenueByDate.hasOwnProperty(formattedDate)) {
        revenueByDate[formattedDate] += value; 
      } else {
        revenueByDate[formattedDate] = value; 
      }
    })
  });
  const ticketSales = daysInMonth.map((day)=>revenueByDate.hasOwnProperty(day) ? revenueByDate[day] : 0 );
  return ticketSales;
};

export const fetchDashboardData = async (query, daysInMonth) => {
  const prom = await Promise.all([
    eventAPI.findByFilter(query),
    ticketAPI.find(query),
    userAPI.find()
  ]);
  const ticketSales=[];
  const events = prom[0];
  const tickets = prom[1];
  const users = prom[2];
  const totalRevenue = tickets?.data?.reduce((a,p)=>{ 
    ticketSales.push({[dayjs(p.date).format('MMM D')]: p.event.priceInCents/100});
    return a+p.event.priceInCents
  }, 0);

  const ticketsSalesValues  = getTicketSales(daysInMonth, ticketSales);

  return {
    ticketSales: ticketsSalesValues,
    usersByCountry: [
      { label: 'USA', value:  users?.data?.length },
      { label: 'Others', value: 0 },
    ],
    cards: [
      {
        title: "Total Revenue",
        value: formattedAmount(totalRevenue),
      },
      {
        title: "Events",
        value: formattedValue(events.data.length),
      },
      {
        title: "Attendees",
        value: formattedValue(tickets.data.length),
      },
      {
        title: "Tickets",
        value: formattedValue(tickets.data.length),
      },
    ]
  }
  
};

export const formatCurrency = ({ amount, currency = "USD", decimalDigits = 2 }) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimalDigits
  }).format(amount);
};

export function getDaysInMonth(year, numberOfDays = 30) {
  if(year !== dayjs().year()) {
    year = dayjs().year();
  }
  // const date = new Date(year, month, 0);
  // const daysInMonth = date.getDate();
  // const monthName = date.toLocaleDateString("en-US", {
  //   month: "short",
  // });
  // let i = 1;
    // while (days.length < daysInMonth) {
  //   days.push(`${monthName} ${i}`);
  //   i += 1;
  // }
  const startDate = dayjs().subtract(numberOfDays, 'day');
  const endDate = dayjs();
  // let daysInMonth = endDate.diff(startDate, 'day');
  let currentDate = startDate;
  const days = [];
  while(currentDate.valueOf() !== endDate.valueOf()){
    days.push(currentDate.format('MMM D')); 
    currentDate = currentDate.add(1, 'day'); 
  }

  return days;
};

export const getStartEndDates = (numberOfDays = 30) => ({
  startDate: dayjs().subtract(numberOfDays, 'day'),
  endDate: dayjs(),
});


export const dateTimeParser = (date) => {
  return { date: dayjs(date, "DD/MM/YYYY").format("MMM D, YYYY"), time: dayjs(date, "DD/MM/YYYY HH:mm").format("hh:mm A") };
}