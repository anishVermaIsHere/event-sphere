import categoryAPI from "./services/api/category";
import eventAPI from "./services/api/event";
import locationAPI from "./services/api/location";
import userAPI from "./services/api/user";
import ticketAPI from "./services/api/ticket";


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

export const fetchDashboardData = async () => {

  const prom = await Promise.all([
    eventAPI.findByFilter({}),
    ticketAPI.find()
  ]);
  const res = await fetchEventsData();
  const events = prom[0];
  const tickets = prom[1];

  return [
    {
      title: "Events",
      value: events.data.length,
      interval: "Last 30 days",
      trend: "up",
    },
    {
      title: "Guests",
      value: res.guests.length,
      interval: "Last 30 days",
      trend: "up",
    },
    {
      title: "Attendees",
      value: tickets.data.length,
      interval: "Last 30 days",
      trend: "up",
    },
    {
      title: "Tickets",
      value: tickets.data.length,
      interval: "Last 30 days",
      trend: "up",
    },
  ];
};

export const formatCurrency = ({ amount, currency = "USD" }) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// export function getDaysInMonth(month, year) {
//   const date = new Date(year, month, 0);
//   const monthName = date.toLocaleDateString("en-US", {
//     month: "short",
//   });
//   const daysInMonth = date.getDate();
//   const days = [];
//   let i = 1;
//   while (days.length < daysInMonth) {
//     days.push(`${monthName} ${i}`);
//     i += 1;
//   }
//   return days;
// }
