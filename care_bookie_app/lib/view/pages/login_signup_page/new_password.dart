import 'package:care_bookie_app/view/pages/login_signup_page/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:provider/provider.dart';
import '../../../view_model/reset_password_view_model.dart';
import 'enter_code_reset_pasword.dart';

class AddNewPassword extends StatefulWidget {
  const AddNewPassword({Key? key}) : super(key: key);

  @override
  State<AddNewPassword> createState() => _AddNewPasswordState();
}

class _AddNewPasswordState extends State<AddNewPassword> {
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController passwordAgainController = TextEditingController();

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
      body: SingleChildScrollView(
        child: SizedBox(
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          child: Column(
            children: [
              customTopScreen(context),
              SizedBox(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height - 280,
                child: Container(
                  width: 380,
                  height: 600,
                  padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                  child: Column(
                    children: [
                      titleForgotPassword(),
                      textRequire(),
                      addPassword(),
                      nextButton(context)
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget customTopScreen(BuildContext context) {
    return Expanded(
      child: Stack(
        children: [
          Positioned(
              top: -240,
              right: 10,
              child: Container(
                width: 500,
                height: 500,
                decoration: const BoxDecoration(
                    shape: BoxShape.circle, color: Color(0xFF0675D6)),
              )),
          Positioned(
              top: -280,
              right: 70,
              child: Container(
                width: 500,
                height: 500,
                decoration: const BoxDecoration(
                    shape: BoxShape.circle, color: Color(0xFF0768D6)),
              )),
          Positioned(
              top: -325,
              right: 135,
              child: Container(
                width: 500,
                height: 500,
                decoration: const BoxDecoration(
                    shape: BoxShape.circle, color: Color(0xFF005DC8)),
              )),
          Positioned(
              top: -310,
              right: 200,
              child: Container(
                width: 400,
                height: 400,
                decoration: const BoxDecoration(
                    shape: BoxShape.circle, color: Color(0xFF0057B9)),
              )),
          Positioned(
            top: 70,
            left: 20,
            child: Container(
              height: 50,
              width: 50,
              decoration: BoxDecoration(
                shape: BoxShape.rectangle,
                borderRadius: BorderRadius.circular(15),
                border: Border.all(color: Colors.white, width: 2),
              ),
              child: FloatingActionButton(
                backgroundColor: Colors.transparent,
                elevation: 0,
                onPressed: () {
                  Navigator.pop(context);
                },
                child: const Icon(
                  IconlyBroken.arrowLeft,
                  color: Colors.white,
                  size: 40,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget titleForgotPassword() {
    return Padding(
      padding: const EdgeInsets.only(left: 10),
      child: Row(
        children: const [
          Text(
            "Mật khẩu mới",
            style: TextStyle(
              fontFamily: "Montserrat",
              fontSize: 35,
              fontWeight: FontWeight.w500,
              color: Color(0xFF2F3948),
            ),
          ),
        ],
      ),
    );
  }

  Widget textRequire() {
    return Container(
      padding: const EdgeInsets.fromLTRB(12, 10, 20, 0),
      child: const Text(
        "Vui lòng thêm vào mật khẩu mới cho tài khoản của bạn\n",
        style: TextStyle(
          fontWeight: FontWeight.w400,
          fontFamily: 'Montserrat',
          fontSize: 17
        ),
      ),
    );
  }

  Widget addPassword() {
    return Selector<ResetPasswordViewModel, String>(
      selector: (context, resetPasswordViewModel) => resetPasswordViewModel.errorResetPassword,
      builder: (context, value, child) =>  Column(
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
            width: 330,
            child: Column(
              children: [
                TextFormField(
                  controller: passwordController,
                  keyboardType: TextInputType.visiblePassword,
                  obscureText: _obscured,
                  focusNode: textFieldFocusNode,
                  decoration: InputDecoration(
                    enabledBorder: const UnderlineInputBorder(
                        borderRadius: BorderRadius.all(
                          Radius.circular(0),
                        )),
                    label: const Text("Mật khẩu mới",
                        style: TextStyle(color: Colors.black)),
                    hintText: "Mật khẩu",
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
                const SizedBox(height: 5),

              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
            width: 330,
            child: Column(
              children: [
                TextFormField(
                  controller: passwordAgainController,
                  //keyboardType: TextInputType.visiblePassword,
                  obscureText: _obscured,
                  //focusNode: textFieldFocusNode,
                  decoration: InputDecoration(
                    enabledBorder: const UnderlineInputBorder(
                        borderRadius: BorderRadius.all(
                          Radius.circular(0),
                        )),
                    label: const Text("Nhập lại mật khẩu",
                        style: TextStyle(color: Colors.black)),
                    hintText: "Mật khẩu",
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
                const SizedBox(height: 5),
              ],
            ),
          ),
          Text(
            value,
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                color: Colors.red, fontSize: 11, fontWeight: FontWeight.w500),
          )
        ],
      ),
    );
  }


  Widget nextButton(BuildContext context) {

    final resetPasswordViewModel = Provider.of<ResetPasswordViewModel>(context,listen: false);

    return Container(
      width: 330,
      padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
      child: Column(
        children: [
          const Padding(padding: EdgeInsets.only(top: 20)),
          Container(
            width: 350,
            height: 60,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                  colors: [
                    Color(0xFF431BFC),
                    Color(0xFF0675D6),
                  ]),
              borderRadius: BorderRadius.circular(20),
              boxShadow: const [
                BoxShadow(
                  color: Color(0xFF0675D6),
                  offset: Offset(0, 2),
                  blurRadius: 10,
                  spreadRadius: 0.1, // changes position of shadow
                ),
              ],
            ),
            child: ElevatedButton(
              onPressed: () async{

                resetPasswordViewModel.setPassword(passwordController.text, passwordAgainController.text);

                bool isValidate = resetPasswordViewModel.validateResetPassword();

                if(isValidate) {

                  bool isSuccess =  await resetPasswordViewModel.resetPassword();

                  // ignore: use_build_context_synchronously
                  isSuccess ? Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const Login()))  :
                  resetPasswordViewModel.setErrorResetPassword("Không thể đổi mật khẩu");

                }
              },
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                primary: const Color(0xff217ce5),
                padding: const EdgeInsets.symmetric(vertical: 15),
                textStyle:
                    const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                elevation: 5,
                minimumSize: const Size(150, 0),
                visualDensity: VisualDensity.adaptivePlatformDensity,
              ),
              child: const Text(
                'TIẾP TỤC',
                style: TextStyle(
                    fontSize: 22,
                    color: Colors.white,
                    fontWeight: FontWeight.w500,
                    fontFamily: 'Montserrat'),
              ),
            ),
          ),

          // RecentlyViewed()
        ],
      ),
    );
  }
}
