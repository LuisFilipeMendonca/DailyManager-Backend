import months from "../constants/Dates";

class Dates {
  constructor(timestamps) {
    this.date = new Date(+timestamps);
    this.months = this.isLeapYear(months);
  }

  isLeapYear(months) {
    const year = this.getYear();
    let monthsCopy = months;

    if (
      year % 4 === 0 &&
      (year % 100 !== 0 || (year % 100 === 0 && year % 400 === 0))
    ) {
      monthsCopy[1].days = 29;
    }

    return monthsCopy;
  }

  addZero(value) {
    return value > 9 ? value : `0${value}`;
  }

  getYear() {
    return this.date.getFullYear();
  }

  getMonth() {
    return this.date.getMonth();
  }

  getMinDate() {
    const year = this.getYear();
    const month = this.getMonth();

    return new Date(`${year}-${month + 1}-1`);
  }

  getMaxDate() {
    const year = this.getYear();
    const month = this.getMonth();
    const days = this.months[month].days;

    return new Date(`${year}-${this.addZero(month + 1)}-${days}`);
  }
}

export default Dates;
