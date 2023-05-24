
import 'package:care_bookie_app/models/schedule.dart';
import 'package:flutter/foundation.dart';

class ScheduleDetailPageViewModel extends ChangeNotifier {

  Schedule? scheduleDetail;

  void setScheduleDetail(Schedule schedule) {
    scheduleDetail = schedule;
  }

}