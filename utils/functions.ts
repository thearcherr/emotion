function getAffirmationFromProgress(value: number) {
  if (value < 20) {
    return "Continue your mindulness journey!";
  } else if (value < 50) {
    return "Keep up the good work pal, you're there!";
  } else if (value < 100) {
    return "Keep your daily routine and you'll shine!";
  } else if (value === 100) {
    return "Well done! Tomorrow brings new opportunities to learn ♡";
  }
}

function getDayTodayInt() {
  const today = new Date().toISOString().split("T")[0];
  return today.split("-")[2];
}

function getDayTodayName() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const dayName = days[today.getDay()];

  return dayName.slice(0, 3);
}

function getDateToday(replacer?: string) {
  const today = new Date().toISOString().split("T")[0];
  if (replacer) return today.replaceAll("-", replacer);
  return today;
}

export {
  getAffirmationFromProgress,
  getDateToday,
  getDayTodayInt,
  getDayTodayName,
};
