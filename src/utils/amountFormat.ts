export const amountFormat = (
  number: number,
  currencySymbol = "£" // egyptian pound sign,
) => {
  // Ensure the input is a valid number
  if (isNaN(number)) {
    return "Invalid Number";
  }
  // Convert the number to a string and round it to two decimal places
  const roundedNumber = number.toFixed(0);
  // Add thousands separators
  const parts = roundedNumber.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the parts with the currency symbol
  return currencySymbol + parts.join(".");
};
