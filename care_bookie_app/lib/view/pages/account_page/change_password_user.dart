import 'package:care_bookie_app/view/pages/account_page/personal_informarion.dart';
import 'package:care_bookie_app/view_model/change_password_view_model.dart';
import 'package:care_bookie_app/view_model/update_user_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:provider/provider.dart';

import '../../../res/constants/colors.dart';
import '../../../view_model/login_page_view_model.dart';
import '../login_signup_page/reset_password.dart';

class ChangePasswordUser extends StatefulWidget {
  const ChangePasswordUser({Key? key}) : super(key: key);

  @override
  State<ChangePasswordUser> createState() => _ChangePasswordUserState();
}

class _ChangePasswordUserState extends State<ChangePasswordUser> {
  TextEditingController oldPasswordController = TextEditingController();
  TextEditingController newPasswordController = TextEditingController();
  TextEditingController passwordResetController = TextEditingController();


  final textFieldFocusNode = FocusNode();
  bool _obscured = true;
  bool isLoading = false;
  void _toggleObscured() {
    setState(() {
      _obscured = !_obscured;
      if (textFieldFocusNode.hasPrimaryFocus)
        return;
      textFieldFocusNode.canRequestFocus =
      false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: ColorConstant.BackGroundColor,
        appBar: AppBar(
          backgroundColor: ColorConstant.BackGroundColor,
          leading: IconButton(
            onPressed: () {
              final changePasswordViewModel = Provider.of<ChangePasswordViewModel>(context,listen: false);

              changePasswordViewModel.resetError();
              Navigator.pop(context);
            },
            icon: const Icon(
              IconlyLight.arrowLeft,
              color: Colors.black,
              size: 30,
            ),
          ),
          title: const Text('Đổi mật khẩu cá nhân',
              style: TextStyle(
                  fontSize: 20,
                  //textBaseline: TextBaseline.alphabetic,
                  color: Colors.black,
                  fontFamily: 'Montserrat')),
        ),
        body: customScrollViewBody());
  }

  Widget customScrollViewBody() {
    return Selector<ChangePasswordViewModel, String>(
      selector: (context, changePasswordViewModel) =>
          changePasswordViewModel.errorResetPassword,
      builder: (context, changePasswordViewModel, child) =>
          CustomScrollView(slivers: <Widget>[
        SliverList(
          delegate: SliverChildListDelegate(
            [
              Container(
                padding: const EdgeInsets.all(16.0),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
                  child: Column(
                    children: [
                      TextFormField(
                        //keyboardType: TextInputType.visiblePassword,
                        obscureText: _obscured,
                        //focusNode: textFieldFocusNode,
                        controller: oldPasswordController,
                        decoration: InputDecoration(
                          enabledBorder: const UnderlineInputBorder(
                              borderRadius: BorderRadius.all(
                                Radius.circular(0),
                              )),
                          label: const Text("Mật khẩu cũ",
                              style: TextStyle(color: Colors.black)),
                          hintText: "Mật khẩu cũ",
                          hintStyle: const TextStyle(
                            color: Color.fromARGB(255, 94, 92, 88),
                          ),
                          prefixIcon: const SizedBox(
                            width: 0,
                            child: Align(
                              alignment: Alignment.centerLeft,
                              child: Icon(
                                IconlyLight.lock,
                                color: Colors.black,
                                size: 24,
                              ),
                            ),
                          ),
                          suffixIcon: SizedBox(
                            width: 0,
                            child: Align(
                              alignment: Alignment.centerRight,
                              child: GestureDetector(
                                onTap: _toggleObscured,
                                child: Icon(
                                  _obscured
                                      ? Icons.visibility_rounded
                                      : Icons.visibility_off_rounded,
                                  size: 24,
                                ),
                              ),
                            ),
                          ),
                        ),

                      ),
                      TextFormField(
                        //keyboardType: TextInputType.visiblePassword,
                        obscureText: _obscured,
                        //focusNode: textFieldFocusNode,
                        controller: newPasswordController,
                        decoration: InputDecoration(
                          enabledBorder: const UnderlineInputBorder(
                              borderRadius: BorderRadius.all(
                                Radius.circular(0),
                              )),
                          label: const Text("Mật khẩu mới",
                              style: TextStyle(color: Colors.black)),
                          hintText: "Mật khẩu mới",
                          hintStyle: const TextStyle(
                            color: Color.fromARGB(255, 94, 92, 88),
                          ),
                          prefixIcon: const SizedBox(
                            width: 0,
                            child: Align(
                              alignment: Alignment.centerLeft,
                              child: Icon(
                                IconlyLight.lock,
                                color: Colors.black,
                                size: 24,
                              ),
                            ),
                          ),
                          suffixIcon: SizedBox(
                            width: 0,
                            child: Align(
                              alignment: Alignment.centerRight,
                              child: GestureDetector(
                                onTap: _toggleObscured,
                                child: Icon(
                                  _obscured
                                      ? Icons.visibility_rounded
                                      : Icons.visibility_off_rounded,
                                  size: 24,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      TextFormField(
                        //keyboardType: TextInputType.visiblePassword,
                        obscureText: _obscured,
                        //focusNode: textFieldFocusNode,
                        controller: passwordResetController,
                        decoration: InputDecoration(
                          enabledBorder: const UnderlineInputBorder(
                              borderRadius: BorderRadius.all(
                                Radius.circular(0),
                              )),
                          label: const Text("Nhập lại mật khẩu mới",
                              style: TextStyle(color: Colors.black)),
                          hintText: "Nhập lại mật khẩu mới",
                          hintStyle: const TextStyle(
                            color: Color.fromARGB(255, 94, 92, 88),
                          ),
                          prefixIcon: const SizedBox(
                            width: 0,
                            child: Align(
                              alignment: Alignment.centerLeft,
                              child: Icon(
                                IconlyLight.lock,
                                color: Colors.black,
                                size: 24,
                              ),
                            ),
                          ),
                          suffixIcon: SizedBox(
                            width: 0,
                            child: Align(
                              alignment: Alignment.centerRight,
                              child: GestureDetector(
                                onTap: _toggleObscured,
                                child: Icon(
                                  _obscured
                                      ? Icons.visibility_rounded
                                      : Icons.visibility_off_rounded,
                                  size: 24,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20.0),
                      const SizedBox(height: 5),
                      Text(
                        changePasswordViewModel,
                        style: Theme.of(context).textTheme.labelSmall?.copyWith(
                            color: Colors.red, fontSize: 15, fontWeight: FontWeight.w500),
                      ),
                      Container(
                        margin: const EdgeInsets.only(bottom: 20),
                        width: double.maxFinite,
                        height: 50,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            primary: Colors.blueAccent,
                            elevation: 4,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                          ),
                          onPressed: () async {
                            final changePasswordViewModel =
                                Provider.of<ChangePasswordViewModel>(context,
                                    listen: false);
                            changePasswordViewModel
                                .setOldPassword(oldPasswordController.text);
                            changePasswordViewModel
                                .setNewPassword(newPasswordController.text);
                            changePasswordViewModel
                                .setPasswordReset(passwordResetController.text);
                            final loginPageViewModel =
                                Provider.of<LoginPageViewModel>(context,
                                    listen: false);
                            changePasswordViewModel
                                .setUserId(loginPageViewModel.userLogin.id);

                            bool isValidate =
                                changePasswordViewModel.validateResetPassword(
                                    oldPasswordController.text);

                            if (isValidate) {
                              changePasswordViewModel.validateResetPassword(
                                  oldPasswordController.text);

                              bool isSuccess = await changePasswordViewModel
                                  .changePassword();

                              // ignore: use_build_context_synchronously

                              if(isSuccess) {
                                await loginPageViewModel.saveLoginInfo(loginPageViewModel.userLogin.phone, changePasswordViewModel.newPassword!);
                              }

                              isSuccess
                                  // ignore: use_build_context_synchronously
                                  ? Navigator.pop(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) =>
                                              const PersonalInformation()))
                                  : "chua co";
                              isSuccess
                                  ? Fluttertoast.showToast(
                                      msg: "Đổi mật khẩu thành công",
                                      toastLength: Toast.LENGTH_SHORT,
                                      gravity: ToastGravity.CENTER,
                                      timeInSecForIosWeb: 1,
                                      backgroundColor: Colors.red,
                                      textColor: Colors.white,
                                      fontSize: 16.0)
                                  : Fluttertoast.showToast(
                                      msg: "Không thể đổi mật khẩu",
                                      toastLength: Toast.LENGTH_SHORT,
                                      gravity: ToastGravity.CENTER,
                                      timeInSecForIosWeb: 1,
                                      backgroundColor: Colors.red,
                                      textColor: Colors.white,
                                      fontSize: 16.0);
                            }
                          },
                          child: const Text('Thay đổi mật khẩu',
                              style: TextStyle(
                                  fontSize: 18,
                                  //textBaseline: TextBaseline.alphabetic,
                                  color: Colors.white,
                                  fontFamily: 'Montserrat')),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        )
      ]),
    );
  }
}
