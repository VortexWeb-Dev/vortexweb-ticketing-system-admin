function formatTicketDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();

  // Format date: "7 Apr 25"
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear().toString().slice(-2);
  const formattedDate = `${day} ${month} ${year}`;

  // Time difference
  const diffInMs = now - date;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  let ago = '';
  if (diffInSeconds < 60) ago = '(just now)';
  else if (diffInMinutes < 60) ago = `(${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago)`;
  else if (diffInHours < 24) ago = `(${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago)`;
  else if (diffInDays === 1) ago = '(yesterday)';
  else ago = `(${diffInDays} days ago)`;

  return `${formattedDate} ${ago}`;
}

export default formatTicketDate
