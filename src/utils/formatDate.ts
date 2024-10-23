export const formatDate = (
  dateString: string,
  locale: string = navigator.language
) => {
  const date = new Date(dateString); // A data está em UTC

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const month = date.toLocaleString(locale, { month: "short" });
  const day = date.getDate();

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };

  const time = date.toLocaleString(locale, options);

  return `${month} ${day} ${time}`;
};
