
import 'package:care_bookie_app/api_services/schedule_api.dart';
import 'package:flutter/foundation.dart';

class ScheduleCancelViewModel extends ChangeNotifier {

  ScheduleApi scheduleApi = ScheduleApi();

  cancelSchedule(String scheduleId,String message) async {
    return await scheduleApi.cancelScheduleApi(scheduleId,message);
  }

}