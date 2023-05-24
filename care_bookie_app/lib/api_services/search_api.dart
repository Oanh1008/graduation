import 'dart:convert';

import 'package:care_bookie_app/models/data_search.dart';
import 'package:http/http.dart' as http;

import '../utils/host_util.dart';

class SearchApi {

  Future<DataSearch> getAllDataSearchByKeyApi(String keySearch) async {

    String url ="${HostUtil.host}api/v1/care-bookie/common/search/home?key=$keySearch";

    var response = await http.get(Uri.parse(url));

    if(response.statusCode == 200) {

      var dataJson = jsonDecode(utf8.decode(response.bodyBytes));

      DataSearch dataSearch = DataSearch.fromJson(dataJson);

      return dataSearch;

    } else {
      throw Exception("Failed Data");
    }

  }

}