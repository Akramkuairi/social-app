export const calcPostTime = (date) => {
  const postDateByMin = Math.round((Date.now() - date) / 60000);
  const postDateByHour = Math.round(postDateByMin / 60);
  const postDate = new Date(date).toISOString().split("T")[0];
  if (postDateByMin === 0) {
    return "Now";
  } else if (postDateByMin < 60) {
    return `since ${postDateByMin} ${postDateByMin === 1 ? "min" : "mins"}`;
  } else if (postDateByHour < 24) {
    return `since ${postDateByHour} ${postDateByHour === 1 ? "hour" : "hours"}`;
  } else if (postDateByHour < 48) {
    return "yesterday";
  } else {
    return postDate;
  }
};
