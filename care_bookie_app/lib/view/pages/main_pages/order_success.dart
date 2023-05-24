import 'package:care_bookie_app/view_model/hospital_detail_page_view_model.dart';
import 'package:care_bookie_app/view_model/order_hospital_data_view_model.dart';
import 'package:care_bookie_app/view_model/schedule_page_view_model.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../res/constants/colors.dart';
import '../layouts_page/navbar_layout.dart';

class OrderSuccess extends StatefulWidget {
  const OrderSuccess({Key? key}) : super(key: key);

  @override
  State<OrderSuccess> createState() => _OrderSuccessState();
}

class _OrderSuccessState extends State<OrderSuccess> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(
          children: [
            successfulOrderingLogo(),
            infoOrderDetail(),
            symptom(),
            price()
          ],
        ),
      ),
      bottomNavigationBar: bottomNavigatorBar(),
    );
  }

  Widget successfulOrderingLogo() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 100, 0, 10.0),
      child: Center(
        child: Column(
          children: [
            Image.asset(
              'assets/images/success.png',
              scale: 1.5,
            ),
            const Text(
              "Success!",
              style: TextStyle(
                  fontFamily: 'Poppins',
                  fontSize: 40,
                  fontWeight: FontWeight.w600,
                  color: ColorConstant.BLue05),
            ),
            const Text(
              "Lịch khám của bạn đã hoàn tất",
              textAlign: TextAlign.center,
              style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: ColorConstant.Grey00),
            ),
            const Text(
              "Vui lòng đợi phòng khám xác nhận",
              textAlign: TextAlign.center,
              style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: ColorConstant.Grey00),
            )
          ],
        ),
      ),
    );
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
                width: 140,
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
                  child: Text("${orderHospitalDataViewModel.age!}",
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
                      orderHospitalDataViewModel.gender! == 1 ? "Nam" : "Nữ",
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
                      orderHospitalDataViewModel.shareHistoryList.isEmpty
                          ? "Không"
                          : "Có",
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
          ...orderHospitalDataViewModel.services.map((service) {
            orderHospitalDataViewModel.totalFee += service.price;
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(20, 10, 0, 0),
                  child: SizedBox(
                    width: 180,
                    child: Text(service.serviceName,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 2,
                        style: const TextStyle(
                          fontWeight: FontWeight.w400,
                          fontSize: 18,
                        )),
                  ),
                ),
                SizedBox(
                  width: 200,
                  child: Align(
                    alignment: Alignment.centerRight,
                    child: Text("${service.price}00đ",
                        maxLines: 2,
                        style: const TextStyle(
                            fontWeight: FontWeight.w500,
                            color: Colors.amber,
                            fontSize: 17,
                            overflow: TextOverflow.ellipsis)),
                  ),
                ),
              ],
            );
          }),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Padding(
                padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
                child: Text("Chi phí dự kiến",
                    style: TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 18,
                        overflow: TextOverflow.visible)),
              ),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text("${orderHospitalDataViewModel.totalFee}00đ",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.amber,
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

  Widget bottomNavigatorBar() {
    final schedulePageViewModel =
        Provider.of<SchedulePageViewModel>(context, listen: false);

    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    final hospitalDetailPageViewModel =
        Provider.of<HospitalDetailPageViewModel>(context, listen: false);

    return Container(
      height: 80,
      color: Colors.white,
      child: Column(
        children: [
          Padding(
              padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
              child: Container(
                width: double.maxFinite,
                height: 70,
                decoration:
                    BoxDecoration(borderRadius: BorderRadius.circular(20)),
                child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      elevation: 5,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30.0),
                      ),
                    ),
                    onPressed: () {
                      schedulePageViewModel.resetSchedules();
                      orderHospitalDataViewModel.resetAllData();
                      hospitalDetailPageViewModel.resetListServiceCheck();

                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  const NavbarLayout(index: 0)));
                    },
                    child: const Padding(
                      padding: EdgeInsets.only(
                        top: 10,
                        bottom: 10,
                      ),
                      child: Text(
                        "Trang Chủ",
                        style: TextStyle(
                            fontSize: 21, fontWeight: FontWeight.w600),
                      ),
                    )),
              )),
        ],
      ),
    );
  }
}
