import 'package:care_bookie_app/view/pages/schedule/schedule_detail_accept.dart';
import 'package:care_bookie_app/view/pages/schedule/schedule_detail_cancel.dart';
import 'package:care_bookie_app/view/pages/schedule/schedule_detail_pending.dart';
import 'package:care_bookie_app/view_model/schedule_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../models/schedule.dart';
import '../../../res/constants/colors.dart';
import '../../../view_model/schedule_detail_page_view_model.dart';

class ScheduleClinics extends StatefulWidget {
  const ScheduleClinics({Key? key}) : super(key: key);

  @override
  State<ScheduleClinics> createState() => _ScheduleClinicsState();
}

class _ScheduleClinicsState extends State<ScheduleClinics> {

  @override
  Widget build(BuildContext context) {

    final schedulePageViewModel = Provider.of<SchedulePageViewModel>(context,listen: false);

    return Column(
      children: [

        ...schedulePageViewModel.schedules.map((schedule) {

          return schedule.bookInformation.status == "PENDING" ? containerSchedulePending(schedule)
              : (schedule.bookInformation.status == "CANCEL" ? containerScheduleCancel(schedule) : containerScheduleAccept(schedule));

        }),
        const SizedBox(height: 100,)
      ],
    );
  }

  Widget containerSchedulePending(Schedule schedule) {

    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

    return Container(
        margin: const EdgeInsets.fromLTRB(15,10,15,0),
        height: 125,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(27),
          color: Colors.white,
          boxShadow: [
            BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 0,
                blurRadius: 7,
                offset: const Offset(0, 10))
          ],
        ),
        child: TextButton(
          style: ButtonStyle(
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20.0),
              ),
            ),
          ),
          onPressed: () {

            scheduleDetailPageViewModel.setScheduleDetail(schedule);

            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const ScheduleDetailPending()));
          },
          child: Stack(
            children: [
              contentSchedule(schedule),
              tagStatusPending(),
            ],
          ),
        ));
  }

  Widget containerScheduleAccept(Schedule schedule) {

    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

    return Container(
        margin: const EdgeInsets.fromLTRB(15,10,15,0),
        height: 125,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(27),
          color: Colors.white,
          boxShadow: [
            BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 0,
                blurRadius: 7,
                offset: const Offset(0, 10))
          ],
        ),
        child: TextButton(
          style: ButtonStyle(
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20.0),
              ),
            ),
          ),
          onPressed: () {

            scheduleDetailPageViewModel.setScheduleDetail(schedule);

            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const ScheduleDetailAccept()));
          },
          child: Stack(
            children: [contentSchedule(schedule), tagStatusAccept()],
          ),
        ));
  }

  Widget containerScheduleCancel(Schedule schedule) {

    final scheduleDetailPageViewModel = Provider.of<ScheduleDetailPageViewModel>(context,listen: false);

    return Container(
        margin: const EdgeInsets.fromLTRB(15,10,15,0),
        height: 125,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(27),
          color: Colors.white,
          boxShadow: [
            BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 0,
                blurRadius: 7,
                offset: const Offset(0, 10))
          ],
        ),
        child: TextButton(
          style: ButtonStyle(
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20.0),
              ),
            ),
          ),
          onPressed: () {

            scheduleDetailPageViewModel.setScheduleDetail(schedule);

            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const ScheduleDetailCancel()));
          },
          child: Stack(
            children: [
              contentSchedule(schedule),
              tagStatusCancel(),
            ],
          ),
        ));
  }

  Widget tagStatusPending() {
    return Positioned(
        top: 88,
        left: 285,
        right: 15,
        bottom: 0,
        child: Container(
          decoration: BoxDecoration(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(30),
          ),
          child: const Text(
            "Đang chờ",
            style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold),
          ),
        ));
  }

  Widget tagStatusAccept() {
    return Positioned(
        top: 88,
        left: 285,
        right: 15,
        bottom: 0,
        child: Container(
          decoration: BoxDecoration(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(30),
          ),
          child: const Text(
            "Xác nhận",
            style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold),
          ),
        ));
  }

  Widget tagStatusCancel() {
    return Positioned(
        top: 81,
        left: 285,
        right: 15,
        bottom: 0,
        child: Container(
          decoration: BoxDecoration(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(30),
          ),
          child: const Text(
            "Đã hủy",
            style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold),
          ),
        ));
  }

  Widget contentSchedule(Schedule schedule) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(5, 5, 0, 5),
      child: Row(
        //mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(30),
            child: Image.network(
              schedule.imageHospital,
            scale: 2,
              fit: BoxFit.cover,
              width: 130,
              height: 130,
            )
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(15, 5, 0, 0),
            child: Column(
              children: [
                SizedBox(
                    width: 180,
                    //height: 40,
                    //color: Colors.grey,
                    child: Text(schedule.hospitalName,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                            fontSize: 15,
                            color: Color(0xff1c335b),
                            fontWeight: FontWeight.w600,
                            fontFamily: 'Merriweather Sans '))),
                const SizedBox(
                  height: 3,
                ),
                Expanded(
                  flex: 1,
                  child: SizedBox(
                      width: 180,
                      //height: 40,
                      //color: Colors.grey,
                      child: Row(
                        children: [
                          const Text(
                            "Ngày Hẹn: "
                          ),
                          Text("${int.parse(schedule.bookInformation.date) == 8 ? "CN" : "Thứ ${schedule.bookInformation.date}"} ${schedule.bookInformation.dateExamination}",
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                  height: 1.3,
                                  fontSize: 14,
                                  color: ColorConstant.Grey01,
                                  fontWeight: FontWeight.w400,
                                  fontFamily: 'Merriweather Sans'))
                        ],
                      )
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Padding(
                    padding: const EdgeInsets.only(top: 15.0),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal:10),
                      width: 210,
                      //color: Colors.black,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        //textBaseline: TextBaseline.alphabetic,
                        children: [
                          const Icon(
                            Icons.star,
                            size: 20,
                            color: Colors.amber,
                          ),
                          const SizedBox(
                            width:0,
                          ),
                          Text("${schedule.starHospital}",
                              style: const TextStyle(
                                  height: 1.5,
                                  fontSize: 15,
                                  color: ColorConstant.Grey01,
                                  fontWeight: FontWeight.w500,
                                  fontFamily: 'Merriweather Sans')),
                          const Text("| ",
                              style: TextStyle(
                                  height: 1,
                                  fontSize: 18,
                                  letterSpacing: 0.1,
                                  color: ColorConstant.Grey01,
                                  fontWeight: FontWeight.w500,
                                  fontFamily: 'Merriweather Sans')),
                          const Text("Chi tiết",
                              style: TextStyle(
                                  height: 1.5,
                                  fontSize: 15,
                                  letterSpacing: 0.1,
                                  color: ColorConstant.BLueText,
                                  fontWeight: FontWeight.w500,
                                  fontFamily: 'Merriweather Sans'))
                        ],
                      ),
                    ),
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
