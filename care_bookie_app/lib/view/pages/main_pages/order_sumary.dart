import 'package:care_bookie_app/view_model/order_hospital_data_view_model.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../../../res/constants/colors.dart';
import '../../../view_model/login_page_view_model.dart';
import 'order_success.dart';

class OrderSummary extends StatefulWidget {
  const OrderSummary({Key? key}) : super(key: key);

  @override
  State<OrderSummary> createState() => _OrderSummaryState();
}

class _OrderSummaryState extends State<OrderSummary> {
  bool check = false;

  @override
  Widget build(BuildContext context) {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    final loginPageViewModel =
        Provider.of<LoginPageViewModel>(context, listen: false);

    orderHospitalDataViewModel.setInfoUser(loginPageViewModel.userLogin);

    return Scaffold(
        backgroundColor: ColorConstant.BackGroundColor,
        appBar: AppBar(
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(10),
            ),
          ),
          backgroundColor: Colors.white,
          title: const Center(
            child: Text(
              "Chi tiết đặt lịch",
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.w500,
                fontSize: 22,
                fontFamily: 'Poppins',
              ),
            ),
          ),
          leading: IconButton(
            icon: const Icon(
              IconlyBroken.arrowLeft,
              color: Colors.black,
              size: 30,
            ),
            onPressed: () {
              orderHospitalDataViewModel.resetAllData();
              Navigator.pop(context);
            },
          ),
          shadowColor: Colors.white,
        ),
        body: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              children: [
                infoOrderDetail(),
                symptom(),
                price(),
                const SizedBox(
                  height: 50,
                )
              ],
            )),
        bottomNavigationBar: bottomBooking());
  }

  Widget infoOrderDetail() {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 10),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Trung tâm khám bệnh",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              Expanded(
                child: Align(
                  alignment: Alignment.centerRight,
                  child: SizedBox(
                    width: 170,
                    child: Text(orderHospitalDataViewModel.hospital!.hospitalName,
                        maxLines: 2,
                        style: const TextStyle(
                            fontWeight: FontWeight.w500,
                            color: Colors.black54,
                            fontSize: 17,
                            overflow: TextOverflow.ellipsis)),
                  ),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Bác sỹ điều trị",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                      orderHospitalDataViewModel.doctorSelected != null
                          ? "${orderHospitalDataViewModel.doctorSelected!.lastName} ${orderHospitalDataViewModel.doctorSelected!.firstName}"
                          : "Không lựa chọn",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Thời gian",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                      "${orderHospitalDataViewModel.dateTimeSelected} || ${orderHospitalDataViewModel.session} ${orderHospitalDataViewModel.timeSelected}",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Bệnh nhân điều trị",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(orderHospitalDataViewModel.name!,
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Tuổi",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text("${orderHospitalDataViewModel.age}",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Giới tính",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                      orderHospitalDataViewModel.gender == 1 ? "Nam" : "Nữ",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Chia sẻ lịch sử",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                      orderHospitalDataViewModel.shareHistoryList.isNotEmpty
                          ? "Có"
                          : "Không",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
        ],
      ),
    );
  }

  Widget symptom() {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    return Column(
      children: [
        Row(
          children: const [
            Padding(
              padding: EdgeInsets.only(left: 8.0),
              child: Text("Mô tả triệu chứng",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
            ),
          ],
        ),
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 10),
          width: double.maxFinite,
          decoration: BoxDecoration(
              //color: Colors.white,
              borderRadius: BorderRadius.circular(25),
              border:
                  Border.all(color: CupertinoColors.systemGrey3, width: 0.5)),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(orderHospitalDataViewModel.symptom!,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    color: Colors.black54,
                    height: 1.4,
                    fontSize: 17,
                  )),
            ),
          ),
        ),
        const Divider(
          height: 30,
          color: Colors.grey,
          thickness: 0.25,
        ),
      ],
    );
  }

  Widget price() {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    return Container(
      decoration: const BoxDecoration(),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Padding(
                padding: EdgeInsets.only(left: 8.0),
                child: Text("Dịch vụ",
                    style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 18,
                        overflow: TextOverflow.visible)),
              ),
            ],
          ),
          ...orderHospitalDataViewModel.services.map((e) => Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 10, 0, 0),
                    child: SizedBox(
                      width: 180,
                      child: Text(e.serviceName,
                          overflow: TextOverflow.ellipsis,
                          maxLines: 2,
                          style: const TextStyle(
                              fontWeight: FontWeight.w400,
                              fontSize: 18,
                              overflow: TextOverflow.visible)),
                    ),
                  ),
                  SizedBox(
                    width: 200,
                    child: Align(
                      alignment: Alignment.centerRight,
                      child: Text("${e.price}00đ",
                          maxLines: 2,
                          style: const TextStyle(
                              fontWeight: FontWeight.w500,
                              color: Colors.amber,
                              fontSize: 17,
                              overflow: TextOverflow.ellipsis)),
                    ),
                  ),
                ],
              )),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
        ],
      ),
    );
  }

  Widget bottomBooking() {
    return Container(
      height: 160,
      color: Colors.white,
      child: Column(
        children: [termsAndPolicy(), confirmBooking()],
      ),
    );
  }

  Widget termsAndPolicy() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(10, 0, 20, 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          GestureDetector(
            onTap: () {
              setState(() {
                check = !check;
              });
            },
            child: Icon(
              check ? IconlyBold.tickSquare : FontAwesomeIcons.square,
              size: 35,
              color: check ? Colors.lightBlueAccent : Colors.grey,
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(0, 20, 0, 0),
            child: SizedBox(
              height: 50,
              width: 300,
              child: RichText(
                text: const TextSpan(children: [
                  TextSpan(
                      text: "Tôi đồng ý với các ",
                      style: TextStyle(fontSize: 17, color: Colors.grey)),
                  TextSpan(
                      text: "điều khoản sử dụng",
                      style: TextStyle(
                          fontSize: 17,
                          decoration: TextDecoration.underline,
                          fontWeight: FontWeight.bold,
                          color: Colors.black)),
                  TextSpan(
                      text: " và các ",
                      style: TextStyle(fontSize: 17, color: Colors.grey)),
                  TextSpan(
                      text: "chính sách về quyền riêng tư",
                      style: TextStyle(
                          fontSize: 17,
                          decoration: TextDecoration.underline,
                          fontWeight: FontWeight.bold,
                          color: Colors.black))
                ]),
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget confirmBooking() {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    return Padding(
        padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
        child: Container(
          width: double.maxFinite,
          height: 70,
          decoration: BoxDecoration(
              color: ColorConstant.BackGroundColor,
              borderRadius: BorderRadius.circular(20)),
          child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                elevation: 5,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30.0),
                ),
              ),
              onPressed: () async {
                bool isSuccess = false;
                check
                    ? {
                        isSuccess =
                            await orderHospitalDataViewModel.createInvoice()
                      }
                    : {
                        Fluttertoast.showToast(
                            msg: "Vui lòng đồng ý với điều khoản dịch vụ",
                            toastLength: Toast.LENGTH_SHORT,
                            gravity: ToastGravity.CENTER,
                            timeInSecForIosWeb: 1,
                            backgroundColor: Colors.red,
                            textColor: Colors.white,
                            fontSize: 16.0)
                      };

                isSuccess
                    ? {
                        // ignore: use_build_context_synchronously
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const OrderSuccess()))
                      }
                    : {
                        Fluttertoast.showToast(
                            msg: "Đặt lịch khám không thành công",
                            toastLength: Toast.LENGTH_SHORT,
                            gravity: ToastGravity.CENTER,
                            timeInSecForIosWeb: 1,
                            backgroundColor: Colors.red,
                            textColor: Colors.white,
                            fontSize: 16.0)
                      };
              },
              child: const Padding(
                padding: EdgeInsets.only(
                  top: 10,
                  bottom: 10,
                ),
                child: Text(
                  "Xác nhận hoàn tất",
                  style: TextStyle(fontSize: 21, fontWeight: FontWeight.w600),
                ),
              )),
        ));
  }
}
