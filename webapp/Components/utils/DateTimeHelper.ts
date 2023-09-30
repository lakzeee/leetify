export function DateTimeHelper(timestamp?: string): string {
  if (!timestamp) return "Never";
  const currentTimestamp = Date.now();
  let targetTimestamp = Date.parse(timestamp);

  const timeDifference = currentTimestamp - targetTimestamp;

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    return "Just now";
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
    const daysAgo = Math.floor(timeDifference / day);
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < month) {
    const weeksAgo = Math.floor(timeDifference / week);
    return `${weeksAgo} ${weeksAgo === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < year) {
    const monthsAgo = Math.floor(timeDifference / month);
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / year);
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
  }
}

interface DayCounts {
  createdAt: string;
  count: number;
}

export interface DayCountsData {
  dates: string[];
  counts: number[];
}

export function generateDateCounts(input: DayCounts[]): DayCountsData {
  // Parse input JSON objects and sort by createdAt in descending order
  const sortedInput = input
    .map((obj) => ({
      date: new Date(obj.createdAt),
      count: obj.count,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  // Extract dates and counts
  let dates: string[] = [];
  let counts: number[] = [];

  if (sortedInput.length > 0) {
    const startDate = sortedInput[0].date;
    const endDate = sortedInput[sortedInput.length - 1].date;

    let currentDate = new Date(startDate);

    while (currentDate >= endDate) {
      const dateString = currentDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      });
      dates.push(dateString);

      const matchingEntry = sortedInput.find(
        (entry) => entry.date.getTime() === currentDate.getTime(),
      );
      counts.push(matchingEntry ? matchingEntry.count : 0);

      // Move to the previous day
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }

  dates = dates.reverse();
  counts = counts.reverse();
  return {
    dates,
    counts,
  };
}
