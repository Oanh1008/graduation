import 'package:care_bookie_app/api_services/signup_api.dart';
import 'package:flutter/material.dart';

class ResetPasswordViewModel extends ChangeNotifier {
  String? phone;
  String? password;
  String? passwordReset;
  String errorPhone = "";
  String errorOTP = "";
  String errorResetPassword = "";

  bool validateFields(String phone) {
    if (phone.isEmpty) {
      errorPhone = "Vui lòng nhập số điện thoại";
      notifyListeners();
      return false;
    }
    return true;
  }

  void setPassword(String password, String passwordReset) {
    this.password = password;
    this.passwordReset = passwordReset;
  }

  bool validateResetPassword() {
    if (password!.isEmpty || passwordReset!.isEmpty) {
      errorResetPassword = "Vui lòng nhập đầy đủ thông tin";
      notifyListeners();
      return false;
    }

    if (password! != passwordReset!) {
      errorResetPassword = "Vui lòng kiểm tra lại mật khẩu";
      notifyListeners();
      return false;
    }
    return true;
  }

  bool validateOTP(String otp) {
    if (otp.length < 4) {
      errorOTP = "Vui lòng nhập mã OTP";
      notifyListeners();
      return false;
    }
    return true;
  }

  void setPhone(String value) {
    phone = value;
  }

  void setErrorPhone(String value) {
    errorPhone = value;
    notifyListeners();
  }

  void setErrorOTP(String value) {
    errorOTP = value;
    notifyListeners();
  }

  void setErrorResetPassword(String value) {
    errorResetPassword = value;
    notifyListeners();
  }

  Future<bool> getOTPByPhoneNumber() async {
    return await SignupApi.getOTPByPhoneNumber(phone!);
  }

  Future<bool> checkOTPByPhoneNumber(String otp) async {
    return await SignupApi.checkOTPByPhoneNumber(phone!, otp);
  }

  Future<bool> resetPassword() async {
    return await SignupApi.resetPassword(password!, passwordReset!, phone!);
  }
}
