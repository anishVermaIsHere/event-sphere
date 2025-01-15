import categoryAPI from "./services/api/category";
import eventAPI from "./services/api/event";
import locationAPI from "./services/api/location";
import userAPI from "./services/api/user";

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
};

export const fetchEventsData = async () => {
    const prom = await Promise.all([
      userAPI.findGuests(),
      locationAPI.find(),
      categoryAPI.find(),
    ]);
    const guestsKeys = {};
    prom[0]?.data?.forEach((d) => (guestsKeys[d._id] = d));
  
    return {
      guests: prom[0].data,
      locations: prom[1].data,
      categories: prom[2].data,
      guestsKeys,
    };
  };


  export const fetchDashboardData = async()=>{
    const res = await fetchEventsData();
    const events = await eventAPI.find();
    return [
        {
            title: 'Events',
            value: events.data.length,
            interval: 'Last 30 days',
            trend: 'up',
        },
        {
            title: 'Guests',
            value: res.guests.length,
            interval: 'Last 30 days',
            trend: 'up',
        },
        {
            title: 'Locations',
            value: res.locations.length,
            interval: 'Last 30 days',
            trend: 'up',
        }
    ]

  }

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
