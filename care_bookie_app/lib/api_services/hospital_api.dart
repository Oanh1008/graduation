import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:care_bookie_app/models/hospital.dart';

import '../models/comment.dart';
import '../utils/host_util.dart';


class HospitalApi {


  Future<List<Hospital>> getAllHospitalApi() async {

    String url = "${HostUtil.host}api/v1/care-bookie/common/hospital/getAll";

    var response = await http.get(Uri.parse(url));

    if(response.statusCode == 200) {

      List dataJson = jsonDecode(utf8.decode(response.bodyBytes)) as List;

      List<Hospital> hospitals = dataJson.map((e) => Hospital.fromJson(e)).toList();

      return hospitals;

    } else {
      throw Exception("Failed Data");
    }

  }

  Future<Hospital> getHospitalByIdApi(String id) async {
    String url = "${HostUtil.host}api/v1/care-bookie/common/hospital/$id";


    var response = await http.get(Uri.parse(url));

    if(response.statusCode == 200) {

      var dataJson = jsonDecode(utf8.decode(response.bodyBytes));

      Hospital hospital = Hospital.fromJson(dataJson);

      return hospital;

    } else {
      throw Exception("Failed Data");
    }

  }

  Future<List<Comment>> getAllCommentByHospitalIdApi(String hospitalId) async {

    String url = "${HostUtil.host}api/v1/care-bookie/common/hospital/comment/$hospitalId";

    var response = await http.get(Uri.parse(url));

    if(response.statusCode == 200) {

      List dataJson = jsonDecode(utf8.decode(response.bodyBytes)) as List;

      List<Comment> comments = dataJson.map((e) => Comment.fromJson(e)).toList();

      return comments;

    } else {
      throw Exception("Failed Data");
    }

  }

}