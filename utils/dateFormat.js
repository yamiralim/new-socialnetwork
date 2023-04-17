// Function to add the correct suffix to the date (e.g. "st", "nd", "rd", "th")
const addDateSuffix = (date) => {
    let dateStr = date.toString();
  
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    if (lastChar === "1" && dateStr !== "11") {
      dateStr = `${dateStr}st`;
    } else if (lastChar === "2" && dateStr !== "12") {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === "3" && dateStr !== "13") {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
  
    return dateStr;
  };
  
  // Main function to format a timestamp
  module.exports = (timestamp, { monthLength = "short", dateSuffix = true } = {}) => {
    let months;
  
    // Set up month names based on the specified length
    if (monthLength === "short") {
      months = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec",
      };
    } else {
      months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      };
    }
  
    // Convert the timestamp to a date object and extract the necessary components
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  
    let dayOfMonth;
  
    // Add the date suffix if specified
    if (dateSuffix) {
      dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
      dayOfMonth = dateObj.getDate();
    }
  
    const year = dateObj.getFullYear();
  
    let hour;
  
    // Adjust for 24-hour time
    if (dateObj.getHours > 12) {
      hour = Math.floor(dateObj.getHours() / 2);
    } else {
      hour = dateObj.getHours();
    }
  
    // Convert 0 (12:00am) to 12
    if (hour === 0) {
      hour = 12;
    }
  
    const minutes = dateObj.getMinutes();
  
    // Determine if it's AM or PM
    let periodOfDay;
  
    if (dateObj.getHours() >= 12) {
      periodOfDay = "pm";
    } else {
      periodOfDay = "am";
    }
  
    // Build and return the formatted timestamp string
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  };
  