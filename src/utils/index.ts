export function getPeriodOfDayColorGradient() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return  ["#2F5F99", '#FEB11B'];
  } else if (currentHour >= 12 && currentHour < 18) {
    return ["#2F5F99", '#FEB07B'];
  } else {
    return ["#000010", '#1374A7'];
  }
}