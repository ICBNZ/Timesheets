export const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// Format Date
export const formatDate = date => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  let result = [month, day, year].join("/");
  return result;
};

// Calculate time to nearest quarter hour
export const roundTime = time => {
  var timeSt = time.split(":");
  var minsRounded = (Math.round(timeSt[1] / 15) * 15) % 60;
  var timeRounded = time.replace(timeSt[1], minsRounded);
  return timeRounded;
};

// Calculate Total Hours
export const totalHours = (start, end) => {
  start = start.split(":");
  end = end.split(":");
  var s = new Date(0, 0, 0, start[0], start[1], 0);
  var e = new Date(0, 0, 0, end[0], end[1], 0);
  var diff = e.getTime() - s.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);

  return (
    (hours < 9 ? "0" : "") + hours + "." + (minutes < 9 ? "0" : "") + minutes
  );
};

// Get Week
export const currentWeek = date => {
  var week = [];
  var day = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1); // change if Sunday
  for (let step = 0; step < 7; step++) {
    week.push(date.setDate(day));
    day = day + 1;
  }
  return week;
};

// Order Dates
export const order = (a, b) => {
  var dateA = new Date(a.date);
  var dateB = new Date(b.date);
  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return 0;
};
