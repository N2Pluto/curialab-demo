const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return parseFloat((num / 1e9).toFixed(1)) + "B"; 
    } else if (num >= 1e6) {
      return parseFloat((num / 1e6).toFixed(1)) + "M"; 
    } else if (num >= 1e3) {
      return parseFloat((num / 1e3).toFixed(1)) + "K";
    } else {
      return num.toLocaleString(); 
    }
  };
  
  export default formatNumber;