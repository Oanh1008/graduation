
import 'package:care_bookie_app/models/data_search.dart';
import 'package:flutter/widgets.dart';

import '../api_services/search_api.dart';

class SearchPageViewModel extends ChangeNotifier {

  SearchApi searchApi = SearchApi();

  DataSearch dataSearch = DataSearch(doctors: [], hospitals: []);

  final TextEditingController keySearch = TextEditingController();

  Future<DataSearch> getAllDataSearchByKey(String keySearch) async {

    return await searchApi.getAllDataSearchByKeyApi(keySearch);

  }

  Future<void> setDataSearch(String keySearch) async {

    dataSearch = await getAllDataSearchByKey(keySearch);

  }

}