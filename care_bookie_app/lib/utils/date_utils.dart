library utils;

import 'package:intl/intl.dart';

class DateUtils {
  static final DateFormat _monthFormat = DateFormat('MMMM yyyy');
  static final DateFormat _dayFormat = DateFormat('dd');
  static final DateFormat _firstDayFormat = DateFormat('MMM dd');
  static final DateFormat _fullDayFormat = DateFormat('EEE MMM dd, yyyy');
  static final DateFormat _apiDayFormat = DateFormat('yyyy-MM-dd');

  static String formatMonth(DateTime d) => _monthFormat.format(d);

  static String formatDay(DateTime d) => _dayFormat.format(d);

  static String formatFirstDay(DateTime d) => _firstDayFormat.format(d);

  static String fullDayFormat(DateTime d) => _fullDayFormat.format(d);

  static String apiDayFormat(DateTime d) => _apiDayFormat.format(d);

  static const List<String> weekdays = [
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'CN'
  ];

  static const List months = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ];

  /// The list of days in a given month
  static List<DateTime> daysInMonth(DateTime month) {
    var first = firstDayOfMonth(month);
    var daysBefore = first.weekday;
    var firstToDisplay = first.subtract(Duration(days: daysBefore));
    var last = DateUtils.lastDayOfMonth(month);

    var daysAfter = 7 - last.weekday;

    // If the last day is sunday (7) the entire week must be rendered
    if (daysAfter == 0) {
      daysAfter = 7;
    }

    // var lastToDisplay = last.add(Duration(days: daysAfter));
    return daysRange(first, last).toList();
  }

  static Iterable<DateTime> daysRange(DateTime first, DateTime last) {
    var listOfDates = List<DateTime>.generate(
        last.day, (i) => DateTime(first.year, first.month, i + 1));
    return listOfDates;
  }

  static bool isFirstDayOfMonth(DateTime day) {
    return isSameDay(firstDayOfMonth(day), day);
  }

  static bool isLastDayOfMonth(DateTime day) {
    return isSameDay(lastDayOfMonth(day), day);
  }

  static DateTime firstDayOfMonth(DateTime month) {
    return DateTime(month.year, month.month);
  }

  static DateTime firstDayOfWeek(DateTime day) {
    /// Handle Daylight Savings by setting hour to 12:00 Noon
    /// rather than the default of Midnight
    day = DateTime.utc(day.year, day.month, day.day, 12);

    /// Weekday is on a 1-7 scale Monday - Sunday,
    /// This Calendar works from Sunday - Monday
    var decreaseNum = day.weekday % 7;
    return day.subtract(Duration(days: decreaseNum));
  }

  static DateTime lastDayOfWeek(DateTime day) {
    /// Handle Daylight Savings by setting hour to 12:00 Noon
    /// rather than the default of Midnight
    day = DateTime.utc(day.year, day.month, day.day, 12);

    /// Weekday is on a 1-7 scale Monday - Sunday,
    /// This Calendar's Week starts on Sunday
    var increaseNum = day.weekday % 7;
    return day.add(Duration(days: 7 - increaseNum));
  }

  /// The last day of a given month
  static DateTime lastDayOfMonth(DateTime month) {
    var beginningNextMonth = (month.month < 12)
        ? DateTime(month.year, month.month + 1, 1)
        : DateTime(month.year + 1, 1, 1);
    return beginningNextMonth.subtract(const Duration(days: 1));
  }

  /// Returns a [DateTime] for each day the given range.
  ///
  /// [start] inclusive
  /// [end] exclusive
  static Iterable<DateTime> daysInRange(DateTime start, DateTime end) sync* {
    var i = start;
    var offset = start.timeZoneOffset;
    while (i.day <= end.day) {
      yield i;
      i = i.add(const Duration(days: 1));
      var timeZoneDiff = i.timeZoneOffset - offset;
      if (timeZoneDiff.inSeconds != 0) {
        offset = i.timeZoneOffset;
        i = i.subtract(Duration(seconds: timeZoneDiff.inSeconds));
      }
    }
  }

  /// Whether or not two times are on the same day.
  static bool isSameDay(DateTime a, DateTime b) {
    return a.year == b.year && a.month == b.month && a.day == b.day;
  }

  static bool isSameWeek(DateTime a, DateTime b) {
    /// Handle Daylight Savings by setting hour to 12:00 Noon
    /// rather than the default of Midnight
    a = DateTime.utc(a.year, a.month, a.day);
    b = DateTime.utc(b.year, b.month, b.day);

    var diff = a.toUtc().difference(b.toUtc()).inDays;
    if (diff.abs() >= 7) {
      return false;
    }

    var min = a.isBefore(b) ? a : b;
    var max = a.isBefore(b) ? b : a;
    var result = max.weekday % 7 - min.weekday % 7 >= 0;
    return result;
  }

  static DateTime previousMonth(DateTime m) {
    var year = m.year;
    var month = m.month;
    if (month == 1) {
      year--;
      month = 12;
    } else {
      month--;
    }
    return DateTime(year, month);
  }

  static DateTime nextMonth(DateTime m) {
    var year = m.year;
    var month = m.month;

    if (month == 12) {
      year++;
      month = 1;
    } else {
      month++;
    }
    return DateTime(year, month);
  }

  static DateTime previousWeek(DateTime w) {
    return w.subtract(const Duration(days: 7));
  }

  static DateTime nextWeek(DateTime w) {
    return w.add(const Duration(days: 7));
  }

  static String convertDateTime(String dateTimeStr) {
    // Chuyển đổi chuỗi thành đối tượng DateTime
    DateTime dateTime = DateTime.parse(dateTimeStr);

    // Tạo danh sách các tháng trong tiếng Việt
    List<String> months = [
      '',
      'Tháng 01',
      'Tháng 02',
      'Tháng 03',
      'Tháng 04',
      'Tháng 05',
      'Tháng 06',
      'Tháng 07',
      'Tháng 08',
      'Tháng 09',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ];

    // Chuyển đổi ngày
    String day = dateTime.day.toString().padLeft(2, '0');

    // Chuyển đổi tháng
    String month = months[dateTime.month];

    // Chuyển đổi năm
    String year = dateTime.year.toString();

    // Chuyển đổi giờ
    String hour = dateTime.hour.toString().padLeft(2, '0');

    // Chuyển đổi phút
    String minute = dateTime.minute.toString().padLeft(2, '0');

    // Xác định buổi trong ngày
    String period = '';
    if (dateTime.hour >= 0 && dateTime.hour < 12) {
      period = 'Sáng';
    } else if (dateTime.hour >= 12 && dateTime.hour < 18) {
      period = 'Chiều';
    } else {
      period = 'Tối';
    }

    // Tạo chuỗi kết quả
    String result = '$day $month, $year || $period $hour:$minute';

    return result;
  }

  static String convertDateString(String input) {
    DateTime dateTime = DateTime.parse(input);
    String formattedDate =
        "${dateTime.day.toString().padLeft(2, '0')}-${dateTime.month.toString().padLeft(2, '0')}-${dateTime.year.toString()}";
    return formattedDate;
  }

  static bool isDateBeforeNow(String inputDate) {
    // Lấy ngày hiện tại
    DateTime now = DateTime.now();

    // Tạo đối tượng DateTime từ chuỗi nhập vào
    List<String> parts = inputDate.split('-');
    int day = int.parse(parts[0]);
    int month = int.parse(parts[1]);
    int year = int.parse(parts[2]);
    DateTime inputDateTime = DateTime(year, month, day);

    // Kiểm tra xem chuỗi nhập vào có nhỏ hơn hoặc bằng ngày hiện tại không
    if (inputDateTime.isBefore(now) || inputDateTime.isAtSameMomentAs(now)) {
      return true;
    } else {
      return false;
    }
  }

  static int calculateAge(String dateString) {
    // Tách chuỗi ngày tháng năm thành ba phần: ngày, tháng, năm
    List<String> parts = dateString.split("-");
    int day = int.parse(parts[0]);
    int month = int.parse(parts[1]);
    int year = int.parse(parts[2]);

    // Lấy ngày hiện tại
    DateTime now = DateTime.now();

    // Lấy ngày tháng năm hiện tại
    int currentDay = now.day;
    int currentMonth = now.month;
    int currentYear = now.year;

    // Tính tuổi
    int age = currentYear - year;

    // Kiểm tra xem đã qua sinh nhật chưa
    if (currentMonth < month || (currentMonth == month && currentDay < day)) {
      age--;
    }

    return age;
  }
}
