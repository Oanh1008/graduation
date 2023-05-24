import 'dart:convert';
import '../models/user_login.dart';
import 'package:http/http.dart' as http;
import '../utils/host_util.dart';

class LoginApi {
  Future<UserLogin> signIn(String phone, String password) async {
    Map<String, String> data = {
      'phone': phone,
      'password': password,
    };

    var response = await http.post(
      Uri.parse("${HostUtil.host}api/v1/care-bookie/common/login"),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(data),
    );

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
