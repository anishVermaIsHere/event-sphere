
export const parseDurationString = (date, duration = "3d") => {
    const regex = /^(\d+)([smhd])$/; // Regex to match digits followed by a unit (s, m, h, d)
    const matches = duration.match(regex);
  
    if (!matches) {
      throw new Error(`Invalid duration string: ${duration}`);
    }
  
    const amount = parseInt(matches[1], 10); // Parse the number part
    const unit = matches[2]; // Get the unit part
  
    let milliseconds = 0;
  
    switch (unit) {
      case 's':
        milliseconds = amount * 1000; // seconds to milliseconds
        break;
      case 'm':
        milliseconds = amount * 60 * 1000; // minutes to milliseconds
        break;
      case 'h':
        milliseconds = amount * 60 * 60 * 1000; // hours to milliseconds
        break;
      case 'd':
        milliseconds = amount * 24 * 60 * 60 * 1000; // days to milliseconds
        break;
      default:
        throw new Error(`Invalid duration unit: ${unit}`);
    }
  
    const futureDate = new Date(new Date(date).getTime() + milliseconds);
    console.log('future Date', futureDate)
    return {
      date: futureDate,
      amount,
      timeStamp: futureDate.getTime()
    }
  }
  