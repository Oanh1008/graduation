import 'package:care_bookie_app/view_model/doctor_detail_view_model.dart';
import 'package:care_bookie_app/view_model/hospital_detail_page_view_model.dart';
import 'package:care_bookie_app/view_model/schedule_page_view_model.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:provider/provider.dart';
import '../../../res/constants/colors.dart';
import '../../../view_model/schedule_cancel_view_model.dart';
import '../../../view_model/schedule_detail_page_view_model.dart';
import '../layouts_page/navbar_layout.dart';

class ScheduleDetailPending extends StatefulWidget {
  const ScheduleDetailPending({Key? key}) : super(key: key);

  @override
  State<ScheduleDetailPending> createState() => _ScheduleDetailPendingState();
}

class _ScheduleDetailPendingState extends State<ScheduleDetailPending> {
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
          backgroundColor: Colors.orangeAccent,
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
                infoOrderDetail(),
                symptom(),
                price(),
                cancelBook(),
              ],
            )),
        bottomNavigationBar: bottomNavigatorBar());
  }

  Widget infoOrderDetail() {

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
                  child: Text(scheduleDetailPageViewModel.scheduleDetail!.hospitalName,
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
                width: 140,
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
                  child: Text( scheduleDetailPageViewModel.scheduleDetail!.bookInformation.gender,
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

  Widget symptom() {

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

  Widget price() {

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
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 10, 0, 0),
                  child: Text(service.serviceName,
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

  Widget cancelBook() {

    String message = "";

    final scheduleCancelViewModel = Provider.of<ScheduleCancelViewModel>(context,listen: false);

    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

    final schedulePageViewModel = Provider.of<SchedulePageViewModel>(context,listen: false);

    final hospitalDetailPageViewModel = Provider.of<HospitalDetailPageViewModel>(context,listen: false);

    final doctorDetailPageViewModel = Provider.of<DoctorDetailPageViewModel>(context,listen: false);

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

                            hospitalDetailPageViewModel.resetScheduleWithHospital();

                            doctorDetailPageViewModel.resetScheduleWithDoctor();

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
        children: [notifyPending(), pending()],
      ),
    );
  }

  Widget notifyPending() {
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
              child: Text(
                  "Thông tin đặt lịch của bạn đã hoàn tất, vui lòng đợi phòng khám xác nhận phản hồi",
                  style: TextStyle(fontSize: 17, color: Colors.grey)),
            ),
          )
        ],
      ),
    );
  }

  Widget pending() {
    return Padding(
        padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
        child: Container(
          width: double.maxFinite,
          height: 40,
          decoration: BoxDecoration(
              border: Border.all(width: 1, color: Colors.orange),
              borderRadius: BorderRadius.circular(20)),
          child: const Center(
            child: Text(
              "Chờ Xác Nhận",
              style: TextStyle(
                  fontSize: 21,
                  color: Colors.orange,
                  fontWeight: FontWeight.w600),
            ),
          ),
        ));
  }
}
