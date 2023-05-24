import 'dart:convert';
import 'package:care_bookie_app/models/user_update.dart';
import 'package:http/http.dart' as http;
import '../models/user_login.dart';
import '../utils/host_util.dart';

class UpdateUserApi {
  static Future<UserLogin> updateAccountUser(UserUpdate userUpdate) async {
    String url = "${HostUtil.host}api/v1/care-bookie/user/update/information";

    Map<String, String> headers = {'content-type': 'application/json'};
    var response = await http.post(Uri.parse(url),
        headers: headers, body: jsonEncode(userUpdate.toJsonWithUser()));
    UserLogin userLogin = UserLogin(
        id: "",
        firstName: "",
        lastName: "",
        birthDay: "",
        email: "",
        gender: 0,
        phone: "",
        address: "",
        image: "");

    if (response.statusCode == 200) {
      var jsonResponse = json.decode(utf8.decode(response.bodyBytes));

      userLogin = UserLogin.fromJson(jsonResponse);

      return userLogin;
    } else {
      return userLogin;
    }
  }


}
