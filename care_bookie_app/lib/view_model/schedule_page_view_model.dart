
import 'package:flutter/foundation.dart';

import '../api_services/schedule_api.dart';
import '../models/schedule.dart';

class SchedulePageViewModel extends ChangeNotifier {

  ScheduleApi scheduleApi = ScheduleApi();

  List<Schedule> schedules = [];

  Future<void> getAllScheduleByUserId(String userId) async {
    schedules = await scheduleApi.getAllScheduleByUserIdApi(userId);
    notifyListeners();
  }

  void loadSchedules(String userId) {

    if (schedules.isEmpty) {
      getAllScheduleByUserId(userId);
    }

  }

  void resetSchedules() {
    schedules = [];
  }

}