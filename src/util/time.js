var time = {
	/**
	 * 获取当前日期，格式YYYY-MM-DD
	 * @param {Object} nowDate
	 */
	getNowFormatDay:function(nowDate) {
		var char = "-";
		if (nowDate == null) {
			nowDate = new Date();
		}
		var day = nowDate.getDate();
		var month = nowDate.getMonth() + 1; //注意月份需要+1
		var year = nowDate.getFullYear();
		//补全0，并拼接
		return year + char + completeDate(month) + char + completeDate(day);
	},

	/**
	 * 获取当前日期，格式YYYY-MM
	 * @param {Object} nowDate
	 */
	getNowFormatDayNoDay:function(nowDate) {
		var char = "-";
		if (nowDate == null) {
			nowDate = new Date();
		}
		var month = nowDate.getMonth() + 1; //注意月份需要+1
		var year = nowDate.getFullYear();
		//补全0，并拼接
		return year + char + completeDate(month);
	},

	/**
	 * 获取昨天日期，格式YYYY-MM-DD
	 * @param {Object} nowDate
	 */
	getYesFormatDay:function(nowDate) {
		var date = new Date();
		var yesterday_milliseconds = date.getTime() - 1000 * 60 * 60 * 24;
		var yesterday = new Date();
		yesterday.setTime(yesterday_milliseconds);

		var strYear = yesterday.getFullYear();
		var strDay = yesterday.getDate();
		var strMonth = yesterday.getMonth() + 1;
		var datastr = strYear + "-" + completeDate(strMonth) + "-" + completeDate(strDay);
		return datastr;
	},

	/*
	 * 获取上一个月
	 */
	getPreMonth:function(date) {
		var arr = date.split('-');
		var year = arr[0]; //获取当前日期的年份
		var month = arr[1]; //获取当前日期的月份
		var day = arr[2]; //获取当前日期的日
		var days = new Date(year, month, 0);
		days = days.getDate(); //获取当前日期中月的天数
		var year2 = year;
		var month2 = parseInt(month) - 1;
		if (month2 == 0) {
			year2 = parseInt(year2) - 1;
			month2 = 12;
		}
		var day2 = day;
		var days2 = new Date(year2, month2, 0);
		days2 = days2.getDate();
		if (day2 > days2) {
			day2 = days2;
		}
		if (month2 < 10) {
			month2 = '0' + month2;
		}
		var t2 = year2 + '-' + month2;
		return t2;
	},

	/*
	 * 获取下一个月
	 */
	getNextMonth:function(date) {
		var arr = date.split('-');
		var year = arr[0]; //获取当前日期的年份
		var month = arr[1]; //获取当前日期的月份
		var day = arr[2]; //获取当前日期的日
		var days = new Date(year, month, 0);
		days = days.getDate(); //获取当前日期中的月的天数
		var year2 = year;
		var month2 = parseInt(month) + 1;
		if (month2 == 13) {
			year2 = parseInt(year2) + 1;
			month2 = 1;
		}
		var day2 = day;
		var days2 = new Date(year2, month2, 0);
		days2 = days2.getDate();
		if (day2 > days2) {
			day2 = days2;
		}
		if (month2 < 10) {
			month2 = '0' + month2;
		}

		var t2 = year2 + '-' + month2;
		return t2;
	}

}

//补全0
function completeDate(value) {
	return value < 10 ? "0" + value : value;
}

export {
  time
}
