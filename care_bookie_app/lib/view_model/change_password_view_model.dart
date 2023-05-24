import 'package:care_bookie_app/api_services/signup_api.dart';
import 'package:flutter/material.dart';

class ChangePasswordViewModel extends ChangeNotifier {
  String? oldPassword;
  String? newPassword;
  String? passwordReset;
  String? userId;
  String errorResetPassword = "";

  bool validateResetPassword(String text) {
    if (newPassword!.isEmpty || passwordReset!.isEmpty) {
      errorResetPassword = "Vui lòng nhập đầy đủ thông tin";
      notifyListeners();
      return false;
    }

    if (newPassword! != passwordReset!) {
      errorResetPassword = "Vui lòng kiểm tra lại mật khẩu";
      notifyListeners();
      return false;
    }
    return true;
  }

  void setOldPassword(String value) {
    oldPassword = value;
    notifyListeners();
  }

  void setNewPassword(String value) {
    newPassword = value;
    notifyListeners();
  }

  void setPasswordReset(String value) {
    passwordReset = value;
    notifyListeners();
  }

  void setUserId(String value) {
    userId = value;
    notifyListeners();
  }

  void resetError() {
    errorResetPassword = "";
    notifyListeners();
  }

  Future<bool> changePassword() async {
    return await SignupApi.changePassword(
        oldPassword!, newPassword!, passwordReset!, userId!);
  }
}
