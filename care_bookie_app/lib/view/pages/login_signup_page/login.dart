import 'package:care_bookie_app/view/pages/login_signup_page/reset_password.dart';
import 'package:care_bookie_app/view/pages/login_signup_page/sign_up.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:provider/provider.dart';
import '../../../view_model/login_page_view_model.dart';
import '../layouts_page/navbar_layout.dart';
import 'package:http/http.dart' as http;

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  final textFieldFocusNode = FocusNode();
  bool _obscured = true;
  bool isLoading = false;
  LoginPageViewModel _viewModel = LoginPageViewModel();

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
              customTopScreen(),
              SizedBox(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height - 260,
                child: Container(
                  //color: Colors.greenAccent,
                  width: 380,
                  height: 580,
                  padding: const EdgeInsets.fromLTRB(20, 50, 0, 0),
                  child: Column(
                    children: [
                      loginAndSignupTitle(),
                      addPhoneNumber(),
                      addPassword(),
                      forgotPassword(),
                      loginButton()
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget customTopScreen() {
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
        ],
      ),
    );
  }

  Widget loginAndSignupTitle() {
    return Padding(
      padding: const EdgeInsets.only(left: 10),
      child: Row(
        children: [
          const Text(
            "Đăng nhập",
            style: TextStyle(
              fontFamily: "Montserrat",
              fontSize: 40,
              fontWeight: FontWeight.w500,
              color: Color(0xFF2F3948),
            ),
          ),
          const Text(
            "/ ",
            style: TextStyle(
              fontFamily: "Montserrat",
              fontSize: 28,
              fontWeight: FontWeight.w500,
              color: Color(0xFF2F3948),
            ),
          ),
          GestureDetector(
            onTap: () {

              final loginPageViewModel = Provider.of<LoginPageViewModel>(context,listen: false);

              loginPageViewModel.resetError();

              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => const Signup()));
            },
            child: const Text(
              "Đăng ký",
              style: TextStyle(
                fontFamily: "Montserrat",
                fontSize: 25,
                fontWeight: FontWeight.w400,
                color: Color(0xFF168AD8),
                decoration: TextDecoration.underline,
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget addPhoneNumber() {
    return Selector<LoginPageViewModel, String>(
      selector: (context, value) => value.errorPhone,
      builder: (context, value, child) {
        return Container(
          padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
          width: 330,
          child: Column(
            children: [
              TextFormField(
                  controller: phoneController,
                  style: const TextStyle(color: Colors.black),
                  decoration: const InputDecoration(
                    enabledBorder: UnderlineInputBorder(
                        borderRadius: BorderRadius.all(
                      Radius.circular(0),
                    )),
                    label: Text("Số điện thoại",
                        style: TextStyle(color: Colors.black)),
                    hintText: "Vui lòng nhập số điện thoại",
                    hintStyle: TextStyle(
                      color: Color.fromARGB(255, 94, 92, 88),
                    ),
                    prefixIcon: SizedBox(
                      width: 0,
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Icon(
                          IconlyLight.call,
                          color: Colors.black,
                        ),
                      ),
                    ),
                    //errorText: loginPageViewModel.errorMessage,
                    errorStyle: TextStyle(color: Colors.red),
                  )),
              const SizedBox(height: 5),
              Text(
                value,
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    color: Colors.red,
                    fontSize: 11,
                    fontWeight: FontWeight.w500),
              )
            ],
          ),
        );
      },
    );
  }

  Widget addPassword() {
    return Selector<LoginPageViewModel, String>(
        selector: (context, value) => value.errorPassword,
        builder: (context, value, child) => Container(
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
                      label: const Text("Mật khẩu",
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
                  Text(
                    value,
                    style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: Colors.red,
                        fontSize: 11,
                        fontWeight: FontWeight.w500),
                  )
                ],
              ),
            ));
  }

  Widget forgotPassword() {
    return Container(
      alignment: Alignment.centerRight,
      padding: const EdgeInsets.fromLTRB(0, 0, 50, 0),
      child: TextButton(
        child: const Text(
          "Quên mật khẩu",
          style: TextStyle(fontFamily: 'Montserrat', color: Color(0xFF168AD8)),
        ),
        onPressed: () {
          Navigator.push(context,
              MaterialPageRoute(builder: (context) => ResetPassword()));
        },
      ),
    );
  }

  Widget loginButton() {

    final loginPageViewModel = Provider.of<LoginPageViewModel>(context,listen: false);

    return Consumer<LoginPageViewModel>(
      builder: (context, value, child) {
        return Container(
          width: 330,
          padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
          child: Column(
            children: [
              const Padding(padding: EdgeInsets.only(top: 20)),
              Consumer<LoginPageViewModel>(
                builder: (context, loginPageViewModel, _) {
                  if (loginPageViewModel.errorMessage != '') {
                    return Container(
                      margin: const EdgeInsets.symmetric(vertical: 10),
                      child: Text(
                        loginPageViewModel.errorMessage,
                        style: const TextStyle(color: Colors.red),
                      ),
                    );
                  } else {
                    return const SizedBox.shrink();
                  }
                },
              ),
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
                  onPressed: () async {
                    await value.signIn(
                        phoneController.text, passwordController.text);
                    if (value.userLogin.id == "") {
                      value.errorMessage =
                          "Đăng nhập thất bại, vui lòng kiểm tra thông tin";
                    } else {
                      Fluttertoast.showToast(
                          msg: "Đăng nhập thành công",
                          toastLength: Toast.LENGTH_SHORT,
                          gravity: ToastGravity.CENTER,
                          timeInSecForIosWeb: 1,
                          backgroundColor: Colors.red,
                          textColor: Colors.white,
                          fontSize: 16.0
                      );
                      loginPageViewModel.resetError();
                      // ignore: use_build_context_synchronously
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const NavbarLayout(index: 0)),
                      );
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    primary: const Color(0xff217ce5),
                    padding: const EdgeInsets.symmetric(vertical: 15),
                    textStyle: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.bold),
                    elevation: 5,
                    minimumSize: const Size(150, 0),
                    visualDensity: VisualDensity.adaptivePlatformDensity,
                  ),
                  child: isLoading
                      ? const CircularProgressIndicator()
                      : const Text(
                          'ĐĂNG NHẬP',
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
      },
    );
  }
}
