import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:provider/provider.dart';
import '../../../view_model/reset_password_view_model.dart';
import 'enter_code_reset_pasword.dart';

class ResetPassword extends StatelessWidget {
  ResetPassword({Key? key}) : super(key: key);

  TextEditingController phoneController = TextEditingController();

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
                      addPhoneNumberRegistered(),
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
            "Quên mật khẩu",
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
          "Vui lòng nhập số điện thoại đã đăng ký của bạn và chúng tôi sẽ gửi cho bạn một mã xác minh.\n \n"
          //"Chúng tôi sẽ gửi một mã xác minh qua tin nhắn văn bản. Điều này giúp chúng tôi loại bỏ thư rác - chúng tôi sẽ không cung cấp số điện thoại của bạn cho bất kỳ bên thứ ba nào."
          ),
    );
  }

  Widget addPhoneNumberRegistered() {
    return Selector<ResetPasswordViewModel, String>(
      selector: (context, resetPasswordViewModel) =>
          resetPasswordViewModel.errorPhone,
      builder: (context, value, child) => Container(
        padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
        width: 330,
        child: Column(
          children: [
            TextField(
              controller: phoneController,
              style: const TextStyle(color: Colors.black),
              decoration: const InputDecoration(
                enabledBorder: UnderlineInputBorder(
                    borderRadius: BorderRadius.all(
                  Radius.circular(0),
                )),
                label: Text("Số điện thoại đăng ký",
                    style: TextStyle(
                        color: Colors.black, fontFamily: 'Montserrat')),
                hintText: "",
                hintStyle: TextStyle(
                  color: Color.fromARGB(255, 94, 92, 88),
                ),
                prefixIcon: SizedBox(
                  width: 0,
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Icon(
                      Icons.phone,
                      color: Colors.black,
                    ),
                  ),
                ),
              ),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 5),
            Text(
              value,
              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: Colors.red, fontSize: 15, fontWeight: FontWeight.w500),
            )
          ],
        ),
      ),
    );
  }

  Widget nextButton(BuildContext context) {
    final resetPasswordViewModel =
        Provider.of<ResetPasswordViewModel>(context, listen: false);

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
              onPressed: () async {
                bool isValidate =
                    resetPasswordViewModel.validateFields(phoneController.text);

                if (isValidate) {
                  resetPasswordViewModel.setPhone(phoneController.text);

                  bool isSuccess =
                      await resetPasswordViewModel.getOTPByPhoneNumber();

                  // ignore: use_build_context_synchronously
                  isSuccess
                      // ignore: use_build_context_synchronously
                      ? Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const EnterCodeOtpResetPassword()))
                      : resetPasswordViewModel
                          .setErrorPhone("Số điện thoại không đúng");
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
