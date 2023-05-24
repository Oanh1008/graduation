import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:provider/provider.dart';
import '../../../res/constants/colors.dart';
import '../../../view_model/schedule_cancel_view_model.dart';
import '../../../view_model/schedule_detail_page_view_model.dart';
import '../../../view_model/schedule_page_view_model.dart';
import '../layouts_page/navbar_layout.dart';

class ScheduleDetailAccept extends StatelessWidget {
  const ScheduleDetailAccept({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: ColorConstant.BackGroundColor,
        appBar: AppBar(
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(10),
            ),
          ),
          backgroundColor: Colors.green,
          title: const Center(
            child: Text(
              "Thông tin đặt lịch",
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w600,
                fontSize: 22,
              ),
            ),
          ),
          leading: IconButton(
            icon: const Icon(
              IconlyBroken.arrowLeft,
              color: Colors.white,
              size: 30,
            ),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
          shadowColor: Colors.white,
        ),
        body: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              children: [
                infoOrderDetail(context),
                symptom(context),
                price(context),
                contentNoteFromClinic(context),
                cancelBook(context),
                const SizedBox(
                  height: 30,
                )
              ],
            )),
        bottomNavigationBar: bottomNavigatorBar());
  }

  Widget infoOrderDetail(BuildContext context) {

    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

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
                    child: Text(scheduleDetailPageViewModel.scheduleDetail!.hospitalName,
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
                  child: Text(scheduleDetailPageViewModel.scheduleDetail!.doctorName,
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
                width: 180,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text("${scheduleDetailPageViewModel.scheduleDetail!.bookInformation.session} ${int.parse(scheduleDetailPageViewModel.scheduleDetail!.bookInformation.date) == 8 ? "CN" : "Thứ ${scheduleDetailPageViewModel.scheduleDetail!.bookInformation.date}"} ${scheduleDetailPageViewModel.scheduleDetail!.bookInformation.dateExamination}",
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
                  child: Text(scheduleDetailPageViewModel.scheduleDetail!.bookInformation.name,
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
                  child: Text("${scheduleDetailPageViewModel.scheduleDetail!.bookInformation.age}",
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
                  child: Text(scheduleDetailPageViewModel.scheduleDetail!.bookInformation.gender,
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
            children:[
              const Text("Chia sẻ lịch sử",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(scheduleDetailPageViewModel.scheduleDetail!.bookInformation.shareInvoice ? "Có" : "Không",
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

  Widget symptom(BuildContext context) {

    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

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
              child: Text(
                  scheduleDetailPageViewModel.scheduleDetail!.bookInformation.symptom,
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

  Widget price(BuildContext context) {

    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

    num totalFee = 0;

    return Column(
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
        ...scheduleDetailPageViewModel.scheduleDetail!.services.map((service) {

          totalFee += service.price;

          return Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 10, 0, 0),
                child: SizedBox(
                  width: 200,
                  child: Text(service.serviceName,
                      maxLines: 2,

                      style: const TextStyle(
                          fontWeight: FontWeight.w400,
                          fontSize: 18,
                          overflow: TextOverflow.visible)),
                ),
              ),
              SizedBox(
                width: 150,
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
                      overflow: TextOverflow.ellipsis)),
            ),
            Expanded(
              child: SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text("${totalFee}00đ",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.amber,
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
      ],
    );
  }

  Widget cancelBook(BuildContext context) {

    String message = "";

    final scheduleCancelViewModel = Provider.of<ScheduleCancelViewModel>(context,listen: false);

    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

    final schedulePageViewModel = Provider.of<SchedulePageViewModel>(context,listen: false);

    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Container(
          margin: const EdgeInsets.fromLTRB(0, 10, 10, 15),
          height: 50,
          width: 120,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              border: Border.all(width: 1, color: Colors.grey)),
          child: TextButton(
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: const Text('Lý do hủy lịch'),
                    content: TextField(
                      decoration:
                      const InputDecoration(
                        hintText: 'Nhập lý do hủy lịch',

                      ),
                      onChanged: (value) {
                        message = value;
                      },
                    ),
                    actions: <Widget>[
                      ElevatedButton(
                        child: const Text('Hủy'),
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                      ),
                      ElevatedButton(
                        child: const Text('Gửi'),
                        onPressed: () async{

                          bool isSuccess = await scheduleCancelViewModel.cancelSchedule(scheduleDetailPageViewModel.scheduleDetail!.bookInformation.id.toString(), message);

                          print("Success ----------> $isSuccess");

                          if (isSuccess) {

                            Fluttertoast.showToast(
                                msg: "Hủy lịch khám thành công",
                                toastLength: Toast.LENGTH_SHORT,
                                gravity: ToastGravity.CENTER,
                                timeInSecForIosWeb: 1,
                                backgroundColor: Colors.red,
                                textColor: Colors.white,
                                fontSize: 16.0
                            );

                            schedulePageViewModel.resetSchedules();

                            // ignore: use_build_context_synchronously
                            Navigator.push(context,
                                MaterialPageRoute(builder: (context) => const  NavbarLayout(index: 0))
                            );
                          } else {
                            Fluttertoast.showToast(
                                msg: "Hủy lịch khám không thành",
                                toastLength: Toast.LENGTH_SHORT,
                                gravity: ToastGravity.CENTER,
                                timeInSecForIosWeb: 1,
                                backgroundColor: Colors.red,
                                textColor: Colors.white,
                                fontSize: 16.0
                            );
                            // ignore: use_build_context_synchronously
                            Navigator.of(context).pop();
                          }

                        },
                      ),
                    ],
                  );
                },
              );
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: const [
                Text("Hủy Lịch",
                    style: TextStyle(
                        fontSize: 17,
                        color: Colors.grey,
                        fontWeight: FontWeight.bold)),
                Icon(
                  Icons.delete,
                  color: Colors.grey,
                )
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget bottomNavigatorBar() {
    return Container(
      height: 120,
      color: Colors.white,
      child: Column(
        children: [notifyAccept(), accept()],
      ),
    );
  }

  Widget contentNoteFromClinic(BuildContext context) {

    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

    return Container(
      margin: const EdgeInsets.fromLTRB(10, 0, 10, 10),
      padding: const EdgeInsets.fromLTRB(10, 10, 10, 10),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          border: Border.all(width: 1.0, color: ColorConstant.Grey01)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text("Thông báo xác nhận từ phòng khám",
              style: TextStyle(
                  fontWeight: FontWeight.w500,
                  fontSize: 20,
                  overflow: TextOverflow.visible)),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Trung tâm khám bệnh",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 170,
                child: Text(scheduleDetailPageViewModel.scheduleDetail!.hospitalName,
                    overflow: TextOverflow.ellipsis,
                    maxLines: 2,
                    style: const TextStyle(
                        fontWeight: FontWeight.w500,
                        color: Colors.black54,
                        fontSize: 17,
                        overflow: TextOverflow.ellipsis)),
              ),
            ],
          ), // Hospital name
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Địa chỉ",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              Align(
                alignment: Alignment.centerRight,
                child: SizedBox(
                  width: 170,
                  child: Text(scheduleDetailPageViewModel.scheduleDetail!.addressHospital,
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ), // address hospital
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Bác sỹ điều trị",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              Expanded(
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(scheduleDetailPageViewModel.scheduleDetail!.doctorName,
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ), // Doctor insurance
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Thời gian",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 170,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text("${scheduleDetailPageViewModel.scheduleDetail!.bookInformation.session} ${int.parse(scheduleDetailPageViewModel.scheduleDetail!.bookInformation.date) == 8 ? "CN" : "Thứ ${scheduleDetailPageViewModel.scheduleDetail!.bookInformation.date}"} ${scheduleDetailPageViewModel.scheduleDetail!.bookInformation.dateExamination}",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ), // Time
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Lời nhắn",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 170,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(scheduleDetailPageViewModel.scheduleDetail!.bookInformation.message,
                      maxLines: 10,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ), // Time
          const SizedBox(height: 10),
          servicesClinic(context)
        ],
      ),
    );
  }

  Widget servicesClinic(BuildContext context) {
    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

    num totalFee = 0;

    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Padding(
              padding: EdgeInsets.only(left: 5.0),
              child: Text("Dịch vụ",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
            ),
          ],
        ),
        ...scheduleDetailPageViewModel.scheduleDetail!.services.map((service) {

          totalFee += service.price;

          return Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(10, 10, 0, 0),
                child: Text(service.serviceName,
                    style: const TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 18,
                        overflow: TextOverflow.visible)),
              ),
              SizedBox(
                width: 150,
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
                      overflow: TextOverflow.ellipsis)),
            ),
            Expanded(
              child: SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text("${totalFee}00đ",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.amber,
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
      ],
    );
  }

  Widget notifyAccept() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(10, 0, 20, 10),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: const [
          Padding(
            padding: EdgeInsets.fromLTRB(0, 5, 0, 0),
            child: SizedBox(
              height: 50,
              width: 320,
              child: Text("Cảm ơn quý khách hàng đã đặt lịch phòng khám",
                  style: TextStyle(fontSize: 17, color: Colors.grey)),
            ),
          )
        ],
      ),
    );
  }

  Widget accept() {
    return Padding(
        padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
        child: Container(
          width: double.maxFinite,
          height: 40,
          decoration: BoxDecoration(
              border: Border.all(width: 1, color: Colors.green),
              borderRadius: BorderRadius.circular(20)),
          child: const Center(
            child: Text(
              "Xác nhận lịch",
              style: TextStyle(
                  fontSize: 21,
                  color: Colors.green,
                  fontWeight: FontWeight.w600),
            ),
          ),
        ));
  }
}
