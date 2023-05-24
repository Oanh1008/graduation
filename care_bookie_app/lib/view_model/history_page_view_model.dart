
import 'package:care_bookie_app/api_services/history_api.dart';
import 'package:flutter/foundation.dart';

import '../models/history.dart';

class HistoryPageViewModel extends ChangeNotifier {

  HistoryApi historyApi = HistoryApi();

  List<History> histories = [];

  Future<void> getAllHistoryByUserId(String userId) async {

    histories = await historyApi.getAllHistoryByUserIdApi(userId);

    notifyListeners();

  }

  void setHistories(String userId) {
    if(histories.isEmpty) {
      getAllHistoryByUserId(userId);
    }
  }

  void resetHistories() {
    histories = [];
  }

}