import 'dart:convert';

import 'package:care_bookie_app/models/favorite.dart';
import 'package:http/http.dart' as http;
import '../utils/host_util.dart';

class FavoriteApi {

  Future<List<DoctorFavorite>> getAllDoctorFavoriteByUserIdApi(String userId) async {

    String url = "${HostUtil.host}api/v1/care-bookie/user/doctor/favourite/$userId";

    var response = await http.get(Uri.parse(url));

    if(response.statusCode == 200) {

      List dataJson = jsonDecode(utf8.decode(response.bodyBytes));

      List<DoctorFavorite> favorites = dataJson.map((e) => DoctorFavorite.fromJson(e)).toList();

      return favorites;

    } else {
      throw Exception("Failed Data");
    }

  }

  Future<List<HospitalFavorite>> getAllHospitalFavoriteByUserIdApi(String userId) async {

    String url = "${HostUtil.host}api/v1/care-bookie/user/hospital/favourite/$userId";

    var response = await http.get(Uri.parse(url));

    if(response.statusCode == 200) {

      List dataJson = jsonDecode(utf8.decode(response.bodyBytes));

      List<HospitalFavorite> favorites = dataJson.map((e) => HospitalFavorite.fromJson(e)).toList();

      return favorites;

    } else {
      throw Exception("Failed Data");
    }

  }

  Future<int> createFavoriteDoctorApi(String doctorId, String userId) async {

    int favoriteId = -1;

    String url = "${HostUtil.host}api/v1/care-bookie/user/doctor/favourite/$userId?doctorId=$doctorId";

    Map<String, String> headers = {'content-type': 'application/json'};


    var response = await http.post(Uri.parse(url), headers: headers);

    if (response.statusCode == 200) {

      var dataResponse = jsonDecode(response.body);

      favoriteId = dataResponse['id'];

    }

    return favoriteId;

  }

  Future<bool> deleteDoctorFavoriteApi(String doctorFavoriteId) async {

    String url = "${HostUtil.host}api/v1/care-bookie/user/doctor/favourite?id=$doctorFavoriteId";

    Map<String, String> headers = {'content-type': 'application/json'};

    var response = await http.delete(Uri.parse(url), headers: headers);

    if(response.statusCode == 200) {

      return true;

    } else {

      return false;

    }

  }

  Future<int> createFavoriteHospitalApi(String hospitalId, String userId) async {

    int favoriteId = -1;

    String url = "${HostUtil.host}api/v1/care-bookie/user/hospital/favourite/$userId?hospitalId=$hospitalId";

    Map<String, String> headers = {'content-type': 'application/json'};


    var response = await http.post(Uri.parse(url), headers: headers);

    if (response.statusCode == 200) {

      var dataResponse = jsonDecode(response.body);

      favoriteId = dataResponse['id'];

    }

    return favoriteId;

  }

  Future<bool> deleteHospitalFavoriteApi(String hospitalFavoriteId) async {

    String url = "${HostUtil.host}api/v1/care-bookie/user/hospital/favourite?id=$hospitalFavoriteId";

    Map<String, String> headers = {'content-type': 'application/json'};

    var response = await http.delete(Uri.parse(url), headers: headers);

    if(response.statusCode == 200) {

      return true;

    } else {

      return false;

    }

  }


}