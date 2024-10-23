export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const time = date.toLocaleString("en-US", options);

  const [hours, minutes] = time.split(":");
  return `${month} ${day} ${hours}:${minutes}`;
};
