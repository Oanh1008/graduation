import 'package:care_bookie_app/api_services/login_api.dart';
import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/user_login.dart';

class LoginPageViewModel extends ChangeNotifier {
  LoginApi loginApi = LoginApi();
  String errorMessage = '';
  String errorPhone = '';
  String errorPassword = '';

  UserLogin userLogin = UserLogin(
      id: "",
      firstName: "",
      lastName: "",
      birthDay: "",
      email: "",
      gender: 1,
      phone: "",
      address: "",
      image: "");

  Future<void> signIn(String phone, String password) async {
    if (validateFields(phone, password)) {
      print('done login');
      try {
        userLogin = await loginApi.signIn(phone, password);
        errorMessage = '';
        await saveLoginInfo(phone, password);
        notifyListeners();
      } catch (error) {
        errorMessage = error.toString();
      }
    } else {
      print('error login');
    }
  }

  // Lưu thông tin đăng nhập vào Shared Preferences
  Future<void> saveLoginInfo(String phone, String password) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('phone', phone);
    prefs.setString('password', password);
  }

  // Kiểm tra sự tồn tại của thông tin đăng nhập
  Future<UserLogin> isLoggedIn() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? phone = prefs.getString('phone');
    String? password = prefs.getString('password');
    return UserLogin(
        id: '',
        firstName: '',
        lastName: '',
        birthDay: '',
        email: '',
        gender: 0,
        phone: phone ?? '',
        password: password ?? '',
        address: '',
        image: '');
  }

  Future<void> logout() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove('phone');
    prefs.remove('password');
    print('remove prefs roi');
    userLogin = UserLogin(
        id: "",
        firstName: "",
        lastName: "",
        birthDay: "",
        email: "",
        gender: 1,
        phone: "",
        address: "",
        image: "");
    notifyListeners();
  }

  bool validateFields(String phone, String password) {
    bool isValid = true;
    if (phone.isEmpty) {
      isValid = false;
      errorPhone = "Vui lòng nhập đúng tài khoản";
    }
    if (password.isEmpty) {
      isValid = false;
      errorPassword = "Vui lòng nhập đúng mật khẩu";
    }

    notifyListeners();
    return isValid;
  }

  void resetError() {
    errorPassword = "";
    errorPhone = "";
    errorMessage = "";
    notifyListeners();
  }

  void setUserLogin(UserLogin user) {
    userLogin = user;
    notifyListeners();
  }
}
