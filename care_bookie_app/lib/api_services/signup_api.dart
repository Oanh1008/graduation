import 'dart:convert';
import 'package:care_bookie_app/models/user_signup.dart';
import 'package:http/http.dart' as http;
import '../utils/host_util.dart';

class SignupApi {
//-------------------------Register Proccessing
  static Future<bool> getOTPByEmail(UserSignup signupUser) async {
    String url = "${HostUtil.host}api/v1/care-bookie/user/confirm/mail";

    Map<String, String> headers = {'content-type': 'application/json'};

    var response = await http.post(Uri.parse(url),
        headers: headers,
        body: jsonEncode({
          "email": signupUser.email,
          "lastName": signupUser.lastName,
          "firstName": signupUser.firstName
        }));

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  static Future<bool> checkOTPByEmail(String code, UserSignup signupUser) async {
    String url = "${HostUtil.host}api/v1/care-bookie/user/confirm/mail/check";

    Map<String, String> headers = {'content-type': 'application/json'};
    var response = await http.post(Uri.parse(url),
        headers: headers,
        body: jsonEncode({
          "code": code,
          "email": signupUser.email,
          "lastName": signupUser.lastName,
          "firstName": signupUser.firstName
        }));

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      return false;
    }
  }

  static Future<bool> createAccountUser(UserSignup signupUser) async {
    String url = "${HostUtil.host}api/v1/care-bookie/user/register";

    Map<String, String> headers = {'content-type': 'application/json'};
    var response = await http.post(Uri.parse(url),
        headers: headers, body: jsonEncode(signupUser.toJsonWithUser()));
    if (response.statusCode == 200) {
      print("CREATE USER SUCCESS : ${jsonDecode(response.body)}");

      return true;
    } else {
      return false;
    }
  }

//-------------------------ResetPassword Proccessing

  static Future<bool> getOTPByPhoneNumber(String phone) async {
    String url =
        "${HostUtil.host}api/v1/care-bookie/common/user/forgot-password?phone=$phone";

    Map<String, String> headers = {'content-type': 'application/json'};

    var response = await http.post(Uri.parse(url), headers: headers);

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  static Future<bool> checkOTPByPhoneNumber(String phone, String code) async {
    String url = "${HostUtil.host}api/v1/care-bookie/common/user/check-code";

    Map<String, String> headers = {'content-type': 'application/json'};
    var response = await http.post(Uri.parse(url),
        headers: headers, body: jsonEncode({"code": code, "phone": phone}));

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      return false;
    }
  }

  static Future<bool> resetPassword(
      String newPassword, String confirmPassword, String phone) async {
    String url =
        "${HostUtil.host}api/v1/care-bookie/common/user/reset-password";

    Map<String, String> headers = {'content-type': 'application/json'};
    var response = await http.post(Uri.parse(url),
        headers: headers,
        body: jsonEncode({
          "newPassword": newPassword,
          "confirmPassword": confirmPassword,
          "phone": phone
        }));

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  static Future<bool> changePassword(String oldPassword, String newPassword,
      String confirmPassword, String userId) async {
    String url =
        "${HostUtil.host}api/v1/care-bookie/common/user/change-password";

    Map<String, String> headers = {'content-type': 'application/json'};
    var response = await http.post(Uri.parse(url),
        headers: headers,
        body: jsonEncode({
          "oldPassword": oldPassword,
          "newPassword": newPassword,
          "confirmPassword": confirmPassword,
          "userId": userId,
        }));

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }
}
