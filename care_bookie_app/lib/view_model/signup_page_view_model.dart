import 'package:care_bookie_app/models/user_signup.dart';
import 'package:flutter/cupertino.dart';
import '../api_services/signup_api.dart';

class SignupPageViewModel extends ChangeNotifier {

  UserSignup? userSignup;

  String errorPhone = '';
  String errorPassword = '';
  String errorFirstName = '';
  String errorLastName = '';
  String errorEmail = '';
  String errorOTP = '';

  void setUserSignup(UserSignup user) {
    userSignup = user;
  }



  bool _isLoading = false;
  bool get isLoading => _isLoading;

  String _errorMessage = '';
  String get errorMessage => _errorMessage;


  bool validateFields(String firstName, String lastName, String phone, String email, String password) {
    bool isValid = true;
    if (firstName.isEmpty) {
      isValid = false;
      errorFirstName = "Vui lòng nhập vào họ của bạn";
    }
    if (lastName.isEmpty) {
      isValid = false;
      errorLastName = "Vui lòng nhập vào tên của bạn";
    }
    if (email.isEmpty) {
      isValid = false;
      errorEmail = "Vui lòng nhập vào email của bạn";
    }
    if (phone.isEmpty) {
      isValid = false;
      errorPhone = "Vui lòng nhập số điện thoại";
    }
    if (password.isEmpty) {
      isValid = false;
      errorPassword = "Vui lòng nhập đúng mật khẩu";
    }
    notifyListeners();
    return isValid;
  }

  bool validateOTP(String otp) {
    if (otp.length < 4) {
      errorOTP = "Vui lòng nhập mã OTP";
      notifyListeners();
      return false;
    }
    return true;
  }


  void setErrorOTP(String value) {
    errorOTP = value;
    notifyListeners();
  }

  void resetError() {
    errorPassword = "";
    errorPhone = "";
    _errorMessage = "";
    errorLastName = "";
    errorFirstName= "";
    errorEmail= "";

    notifyListeners();
  }

  Future<bool> getOTPByEmail() async {
    return await SignupApi.getOTPByEmail(userSignup!);
  }

  Future<bool> checkOTPByEmail(String otp, UserSignup userSignup) async {
    return await SignupApi.checkOTPByEmail(otp,userSignup);
  }

  Future<bool> createAccountUser(UserSignup userSignup) async {
    return await SignupApi.createAccountUser(userSignup);
  }
}