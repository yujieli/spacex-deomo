export default {
  /**
   * format date
   * @param {*} url
   * @param {*} pms
   * @param {*} callback
   * @param {*} error
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = this.getMonthName(date.getMonth());
    const day = date.getDate();
    return `${month} ${day},${year}`;
  },
  /**
   * get english month name by month number.
   * @param {*} url
   * @param {*} pms
   * @param {*} callback
   * @param {*} error
   */
  getMonthName(month) {
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return months[month];
  },
};
