const formatNumber = (num: number) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B"; // Billion
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"; // Million
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K"; // Thousand
  } else {
    return num.toLocaleString(); // Less than 1,000
  }
};

export default formatNumber;
