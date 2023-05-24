import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:care_bookie_app/models/comment_data.dart';
import '../utils/host_util.dart';

class CommentApi {

  Future<bool> createCommentDoctorByUserIdApi(CommentData commentDoctor) async {

    String url = "${HostUtil.host}api/v1/care-bookie/user/comment/doctor";

    Map<String,String> headers = { 'content-type' : 'application/json' };

    var response = await http.post(Uri.parse(url),headers: headers,body: jsonEncode(commentDoctor.toJsonWithDoctor()));

    if(response.statusCode == 200) {

      print("CREATE COMMENT SUCCESS : ${jsonDecode(response.body)}");

      return true;

    } else {
      return false;
    }
  }

  Future<bool> createCommentHospitalByUserIdApi(CommentData commentHospital) async {

    String url = "${HostUtil.host}api/v1/care-bookie/user/comment/hospital";

    Map<String,String> headers = { 'content-type' : 'application/json' };

    var response = await http.post(Uri.parse(url),headers: headers,body: jsonEncode(commentHospital.toJsonWithHospital()));

    if(response.statusCode == 200) {

      print("CREATE COMMENT SUCCESS : ${jsonDecode(response.body)}");

      return true;

    } else {
      return false;
    }


  }

}