import 'package:care_bookie_app/models/user_signup.dart';
import 'package:care_bookie_app/view/pages/login_signup_page/enter_code_register.dart';
import 'package:care_bookie_app/view/pages/login_signup_page/login.dart';
import 'package:care_bookie_app/view_model/signup_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:icons_plus/icons_plus.dart';
import 'package:provider/provider.dart';

import 'enter_code_reset_pasword.dart';

class Signup extends StatefulWidget {
  const Signup({Key? key}) : super(key: key);

  @override
  State<Signup> createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController firstNameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();

  final textFieldFocusNode = FocusNode();
  bool _obscured = true;
  bool isLoading = false;

  void _toggleObscured() {
    setState(() {
      _obscured = !_obscured;
      if (textFieldFocusNode.hasPrimaryFocus)
        return; // If focus is on text field, dont unfocus
      textFieldFocusNode.canRequestFocus =
          false; // Prevents focus if tap on eye
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
              Expanded(
                child: Stack(
                  children: [
                    Positioned(
                        top: -280,
                        right: 10,
                        child: Container(
                          width: 500,
                          height: 500,
                          decoration: const BoxDecoration(
                              shape: BoxShape.circle, color: Color(0xFF0675D6)),
                        )),
                    Positioned(
                        top: -320,
                        right: 70,
                        child: Container(
                          width: 500,
                          height: 500,
                          decoration: const BoxDecoration(
                              shape: BoxShape.circle, color: Color(0xFF0768D6)),
                        )),
                    Positioned(
                        top: -360,
                        right: 135,
                        child: Container(
                          width: 500,
                          height: 500,
                          decoration: const BoxDecoration(
                              shape: BoxShape.circle, color: Color(0xFF005DC8)),
                        )),
                    Positioned(
                        top: -330,
                        right: 200,
                        child: Container(
                          width: 400,
                          height: 400,
                          decoration: const BoxDecoration(
                              shape: BoxShape.circle, color: Color(0xFF0057B9)),
                        )),
                  ],
                ),
              ),
              SizedBox(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height - 230,
                child: Container(
                    //color: Colors.greenAccent,
                    width: 380,
                    height: 660,
                    padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(left: 10),
                          child: Row(
                            children: [
                              const Text(
                                "Đăng ký ",
                                style: TextStyle(
                                  fontFamily: "Montserrat",
                                  fontSize: 45,
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
                                  final signupPageViewModel = Provider.of<SignupPageViewModel>(context,listen: false);
                                  signupPageViewModel.resetError();
                                  Navigator.pop(context);
                                },
                                child: const Text(
                                  "Đăng nhập",
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
                        ),
                        addLastName(),
                        addFirstName(),
                        addPhoneNumber(),
                        addEmail(),
                        addPassword(),
                        //addPasswordAgain(),
                        signupButton(),
                      ],
                    )),
              )
            ],
          ),
        ),
      ),
    );
  }


  Widget addLastName() {
    return Selector<SignupPageViewModel, String>(
      selector: (context, value) => value.errorLastName,
      builder: (context, value, child) {
        return Container(
          padding: const EdgeInsets.fromLTRB(0, 10, 30, 0),
          width: 330,
          child: Column(
            children: [
              TextFormField(
                  controller: lastNameController,
                  style: const TextStyle(color: Colors.black),
                  decoration: const InputDecoration(
                    enabledBorder: UnderlineInputBorder(
                        borderRadius: BorderRadius.all(
                          Radius.circular(0),
                        )),
                    label: Text("Họ và tên đệm", style: TextStyle(color: Colors.black)),
                    hintText: "Họ và tên đệm của bạn",
                    hintStyle: TextStyle(
                      color: Color.fromARGB(255, 94, 92, 88),
                    ),
                    prefixIcon: SizedBox(
                      width: 0,
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Icon(
                          FontAwesome.address_book,
                          color: Colors.black,
                        ),
                      ),
                    ),
                  )),
              const SizedBox(height: 3),
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

  Widget addFirstName() {
    return Selector<SignupPageViewModel, String>(
      selector: (context, value) => value.errorFirstName,
      builder: (context, value, child) {
        return Container(
          padding: const EdgeInsets.fromLTRB(0, 10, 30, 0),
          width: 330,
          child: Column(
            children: [
              TextFormField(
                  controller: firstNameController,
                  style: const TextStyle(color: Colors.black),
                  decoration: const InputDecoration(
                    enabledBorder: UnderlineInputBorder(
                        borderRadius: BorderRadius.all(
                      Radius.circular(0),
                    )),
                    label:
                        Text("Tên", style: TextStyle(color: Colors.black)),
                    hintText: "Vui lòng nhập vào tên của bạn",
                    hintStyle: TextStyle(
                      color: Color.fromARGB(255, 94, 92, 88),
                    ),
                    prefixIcon: SizedBox(
                      width: 0,
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Icon(
                          FontAwesome.address_book,
                          color: Colors.black,
                        ),
                      ),
                    ),
                  )),
              const SizedBox(height: 3),
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

  Widget addPhoneNumber() {
    return Selector<SignupPageViewModel, String>(
      selector: (context, value) => value.errorPhone,
      builder: (context, value, child) {
        return Container(
          // color: Colors.green,
          padding: const EdgeInsets.fromLTRB(0, 10, 30, 0),
          // color: Colors.orange,
          width: 330,
          child: Column(
            children: [
              TextFormField(
                  controller: phoneController,
                  style: const TextStyle(color: Colors.black),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Add your phone number";
                    } else if (value.length <= 5) {
                      return "Not enough required character";
                    }
                    return null;
                  },
                  decoration: const InputDecoration(
                    enabledBorder: UnderlineInputBorder(
                        borderRadius: BorderRadius.all(
                      Radius.circular(0),
                    )),
                    label: Text("Số điện thoại",
                        style: TextStyle(color: Colors.black)),
                    hintText: "Vui lòng nhập vào số điện thoại",
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
                  )),
              const SizedBox(height: 3),
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

  Widget addEmail() {
    return Selector<SignupPageViewModel, String>(
        selector: (context, value) => value.errorEmail,
        builder: (context, value, child) {
          return Container(
            // color: Colors.green,
            padding: const EdgeInsets.fromLTRB(0, 10, 30, 0),
            // color: Colors.orange,
            width: 330,
            child: Column(
              children: [
                TextFormField(
                    controller: emailController,
                    style: const TextStyle(color: Colors.black),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "";
                      } else if (value.length <= 5) {
                        return "Not enough required characters";
                      }
                      return null;
                    },
                    decoration: const InputDecoration(
                      enabledBorder: UnderlineInputBorder(
                          borderRadius: BorderRadius.all(
                        Radius.circular(0),
                      )),
                      label:
                          Text("Email", style: TextStyle(color: Colors.black)),
                      hintText: "Vui lòng nhập vào email",
                      hintStyle: TextStyle(
                        color: Color.fromARGB(255, 94, 92, 88),
                      ),
                      prefixIcon: SizedBox(
                        width: 0,
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Icon(
                            Icons.email_sharp,
                            color: Colors.black,
                          ),
                        ),
                      ),
                    )),
                const SizedBox(height: 3),
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
        });
  }

  Widget addPassword() {
    return Selector<SignupPageViewModel, String>(
      selector: (context, value) => value.errorPassword,
      builder: (context, value, child) {
        return Container(
          padding: const EdgeInsets.fromLTRB(0, 10, 30, 0),
          width: 330,
          child: Column(
            children: [
              TextFormField(
                controller: passwordController,
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
              const SizedBox(height: 3),
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

  Widget addPasswordAgain() {
    return Container(
      padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
      width: 330,
      child: TextFormField(
        //keyboardType: TextInputType.visiblePassword,
        obscureText: _obscured,
        focusNode: textFieldFocusNode,
        decoration: InputDecoration(
          enabledBorder: const UnderlineInputBorder(
              borderRadius: BorderRadius.all(
            Radius.circular(0),
          )),
          label: const Text("Mật khẩu", style: TextStyle(color: Colors.black)),
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
    );
  }

  Widget signupButton() {
    return Consumer<SignupPageViewModel>(builder: (context, value, child) {
      return Container(
        width: 330,
        padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
        child: Column(
          children: [
            const Padding(padding: EdgeInsets.only(top: 20)),
            Consumer<SignupPageViewModel>(
              // ignore: avoid_types_as_parameter_names
              builder: (context, SignupPageViewModel, _) {
                if (SignupPageViewModel.errorMessage != '') {
                  return Container(
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    child: Text(
                      SignupPageViewModel.errorMessage,
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
                // ignore: use_build_context_synchronously
                onPressed: () async {

                  bool isValid = value.validateFields(
                      firstNameController.text,
                      lastNameController.text,
                      phoneController.text,
                      emailController.text,
                      passwordController.text);

                  UserSignup userSignup = UserSignup(
                      email: emailController.text,
                      firstName: firstNameController.text,
                      lastName: lastNameController.text,
                      password: passwordController.text,
                      phone: phoneController.text);

                  value.setUserSignup(userSignup);

                  bool isSuccess = false;

                  isValid ? isSuccess =  await value.getOTPByEmail() : "";
                  // ignore: use_build_context_synchronously
                  isSuccess ? Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const EnterCodeOtpRegister()),
                        ) : "";
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
                        'ĐĂNG KÝ',
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
    });
  }
}
