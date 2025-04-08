export const convertToDateFormat = (timestamp: string) => {
  const date = new Date(timestamp);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  // @ts-expect-error: must be corrected properly
  const formattedDate = date.toLocaleDateString('en-GB', options);

  return formattedDate;
};
