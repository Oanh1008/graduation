import 'package:care_bookie_app/view/pages/login_signup_page/login.dart';
import 'package:care_bookie_app/view/pages/login_signup_page/new_password.dart';
import 'package:care_bookie_app/view_model/reset_password_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:provider/provider.dart';

import 'login_signup_widget/otp_input.dart';

class EnterCodeOtpResetPassword extends StatefulWidget {
  const EnterCodeOtpResetPassword({Key? key}) : super(key: key);

  @override
  State<EnterCodeOtpResetPassword> createState() => _EnterCodeOtpResetPasswordState();
}

class _EnterCodeOtpResetPasswordState extends State<EnterCodeOtpResetPassword> {
  final TextEditingController _fieldOne = TextEditingController();
  final TextEditingController _fieldTwo = TextEditingController();
  final TextEditingController _fieldThree = TextEditingController();
  final TextEditingController _fieldFour = TextEditingController();

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
                  padding: const EdgeInsets.fromLTRB(10, 0, 5, 0),
                  child: Column(
                    children: [
                      titleOTPAndContentOTP(),
                      addOTP(),
                      resendOTPAndNext(context)
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

  Widget titleOTPAndContentOTP() {
    return Column(
      children: [
        const Padding(
          padding: EdgeInsets.only(left: 0),
          child: Text(
            "Nhập mã OTP",
            style: TextStyle(
              fontFamily: "Montserrat",
              fontSize: 35,
              fontWeight: FontWeight.w500,
              color: Color(0xFF2F3948),
            ),
          ),
        ),
        Container(
          padding: const EdgeInsets.fromLTRB(12, 10, 20, 0),
          child: const Text(
            "Một mã code OTP đã được gửi đến Email đăng ký của bạn, vui lòng nhập vào mã code",
            style: TextStyle(
              fontFamily: "Montserrat",
              fontSize: 15,
              fontWeight: FontWeight.w400,
              color: Color(0xFF2F3948),
            ),
          ),
        ),
      ],
    );
  }

  Widget addOTP() {
    return Selector<ResetPasswordViewModel, String>(
      selector: (context, resetPasswordViewModel) => resetPasswordViewModel.errorOTP,
      builder: (context, value, child) =>  Padding(
        padding: const EdgeInsets.fromLTRB(0, 10, 15, 0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: OtpInput(_fieldOne, true, false),
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: OtpInput(_fieldTwo, false, false),
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: OtpInput(_fieldThree, false, false),
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: OtpInput(_fieldFour, false, true),
                ),
              ],
            ),
            const SizedBox(height: 5),
            Text(
              value,
              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: Colors.red, fontSize: 11, fontWeight: FontWeight.w500),
            )
          ],
        ),
      ),
    );
  }

  Widget resendOTPAndNext(BuildContext context) {

    final resetPasswordViewModel = Provider.of<ResetPasswordViewModel>(context,listen: false);

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          width: 200,
          padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
          child: Column(
            children: [
              const Padding(padding: EdgeInsets.only(top: 20)),
              Container(
                width: 200,
                height: 60,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                      begin: Alignment.centerLeft,
                      end: Alignment.centerRight,
                      colors: [
                        Color(0xFF000066),
                        Color(0xFF000066),
                      ]),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0xFF000066),
                      offset: Offset(0, 2),
                      blurRadius: 10,
                      spreadRadius: 0.1, // changes position of shadow
                    ),
                  ],
                ),
                child: ElevatedButton(
                  onPressed: () async{
                    await resetPasswordViewModel.getOTPByPhoneNumber();
                  },
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    primary: const Color(0xFF000066),
                    padding: const EdgeInsets.symmetric(vertical: 15),
                    textStyle: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.bold),
                    elevation: 5,
                    minimumSize: const Size(150, 0),
                    visualDensity: VisualDensity.adaptivePlatformDensity,
                  ),
                  child: const Text(
                    'GỬI LẠI MÃ',
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
        ),
        Container(
          width: 180,
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
                  onPressed: () async {

                    String otp = "${_fieldOne.text}${_fieldTwo.text}${_fieldThree.text}${_fieldFour.text}";

                    bool isValidate = resetPasswordViewModel.validateOTP(otp);

                    if(isValidate) {
                      bool isSuccess =  await resetPasswordViewModel.checkOTPByPhoneNumber(otp);

                      // ignore: use_build_context_synchronously
                      isSuccess ? Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const AddNewPassword()))  :
                      resetPasswordViewModel.setErrorOTP("Mã OTP không đúng");
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
        )
      ],
    );
  }
}
