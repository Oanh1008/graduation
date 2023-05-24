
import 'package:flutter/foundation.dart';


class ScheduleInfoPageViewModel extends ChangeNotifier {

  int weekday = DateTime.now().weekday +1;

  void setWeekday(int day) {
    weekday = day;
    notifyListeners();
  }

}