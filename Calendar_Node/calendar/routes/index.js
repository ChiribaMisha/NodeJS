var express = require('express');
var router = express.Router();
const moment = require('moment');
moment.locale('ru');

router.get('/:year/:month/', (req, res) => {
  const reqYear = req.params.year;
  const reqMonth = req.params.month;
  const reqDate = moment([reqYear, reqMonth, 1]).subtract(1, 'month');

  const obj = {
    monthName: reqDate.format('MMMM'),
    year: req.params.year,
    daysNameArr: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    startWeekDay: reqDate.format("e"),
  }

  const qtyDaysPerMonth = reqDate.daysInMonth();

  const getDaysArr = (start, end) => {
    const tempArr = [];
    for (let i = start; i < end; i++) {
      tempArr.push(i + 1);
    };
    return tempArr;
  };

  obj.daysArr = getDaysArr(0, qtyDaysPerMonth);

  const prevMonth = moment(reqDate).subtract(1, 'month');

  if (obj.startWeekDay == 0) {
    obj.prevDaysArr = getDaysArr(0, prevMonth.daysInMonth()).slice(-1, 1);
    console.log('0');
  } else {
    obj.prevDaysArr = getDaysArr(0, prevMonth.daysInMonth()).slice(-obj.startWeekDay);
    console.log('1');
  }

  res.render('index', obj);
});

router.get('/', (req, res) => {
  const currYear = moment().format('YYYY');
  const currMonth = moment().format('MM');
  res.redirect(`/${currYear}/${currMonth}`);
});


module.exports = router;
