import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:care_bookie_app/models/schedule.dart';

import '../utils/host_util.dart';

class ScheduleApi {

  Future<List<Schedule>> getAllScheduleByUserIdApi(String userId) async {

    String url = "${HostUtil.host}api/v1/care-bookie/user/books/$userId";

    var response = await http.get(Uri.parse(url));

    if(response.statusCode == 200) {

      List dataJson = jsonDecode(utf8.decode(response.bodyBytes)) as List;

      List<Schedule> schedules = dataJson.map((e) => Schedule.fromJson(e)).toList();

      return schedules;

    } else {
      throw Exception("Failed Data");
    }

  }

  Future<bool> cancelScheduleApi(String scheduleId,String message) async {

    String url = "${HostUtil.host}api/v1/care-bookie/user/book/cancel";

    Map<String,String> headers = { 'content-type' : 'application/json' };

    var response = await http.put(Uri.parse(url),headers: headers,body: jsonEncode({
      'bookId' : scheduleId,
      'message' : message,
      'operatorId' : "user"
    }));

    if(response.statusCode == 200) {

      print("CANCEL SUCCESS : ${jsonDecode(response.body)}");

      return true;

    } else {

      return false;

    }

  }


}