// Currency utilities: keep every monetary calculation and display consistent in Indian Rupees.
// Fake Store API product prices are treated as USD values, so the catalogue is converted to INR once.
export const USD_TO_INR = 90;

// Convert the API's numeric USD price into a whole-rupee catalogue price for this demo store.
export function convertToINR(usdPrice) {
  return Number((Number(usdPrice || 0) * USD_TO_INR).toFixed(2));
}

// Format every displayed amount with the Indian Rupee symbol and Indian number grouping.
export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(amount || 0));
}
