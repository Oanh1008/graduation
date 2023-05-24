import 'package:care_bookie_app/view/pages/main_pages/main_page_widget/order_widget/select_day_order_doctor.dart';
import 'package:care_bookie_app/view_model/doctor_detail_view_model.dart';
import 'package:care_bookie_app/view_model/schedule_doctor_info_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:care_bookie_app/utils/date_utils.dart' as date_util;
import 'package:provider/provider.dart';
import '../../../../res/constants/colors.dart';
import '../../../../view_model/history_page_view_model.dart';
import '../../../../view_model/login_page_view_model.dart';
import '../../../../view_model/order_hospital_data_view_model.dart';
import '../../review_page/review_doctor_page/review_doctor.dart';
import '../order_sumary.dart';

class OrderDetailDoctor extends StatefulWidget {
  const OrderDetailDoctor({Key? key}) : super(key: key);

  @override
  State<OrderDetailDoctor> createState() => _OrderDetailDoctorState();
}

class _OrderDetailDoctorState extends State<OrderDetailDoctor> {
  bool _isAppBarCollapsed = false;
  bool _isExpanded = false;
  bool isSelectedServices = false;
  int _selectedTime = -1;
  String? _gender;

  late ScrollController _scrollController;
  final TextEditingController _controllerTextWord = TextEditingController();
  final TextEditingController _controllerTextWordFullName =
      TextEditingController();
  final TextEditingController _controllerTextWordAge = TextEditingController();

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _scrollController.addListener(() {
      if (_scrollController.offset > 100 &&
          !_scrollController.position.outOfRange) {
        setState(() {
          _isAppBarCollapsed = true;
        });
      } else {
        setState(() {
          _isAppBarCollapsed = false;
        });
      }
    });

    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    final historyPageViewModel =
        Provider.of<HistoryPageViewModel>(context, listen: false);

    orderHospitalDataViewModel
        .setListHistoryCheckBox(historyPageViewModel.histories);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorConstant.BackGroundColor,
      body: Consumer<ScheduleDoctorInfoPageViewModel>(
        builder: (context, scheduleDoctorInfoPageViewModel, child) =>
            CustomScrollView(
          controller: _scrollController,
          slivers: <Widget>[
            sliverAppbar(),
            basicInfoDoctor(),
            bookingForOtherPerson(),
            selectServices(),
            selectDay(),
            selectTime(),
            symptom(),
            shareHistory(),
          ],
        ),
      ),
      bottomNavigationBar: bottomNavigationBar(),
    );
  }

  Widget sliverAppbar() {
    final doctorDetailPageViewModel =
        Provider.of<DoctorDetailPageViewModel>(context, listen: false);

    return SliverAppBar(
      title: Text(
        'Dr. ${doctorDetailPageViewModel.doctorDetail!.lastName} ${doctorDetailPageViewModel.doctorDetail!.firstName}',
        style: TextStyle(
            color: _isAppBarCollapsed ? Colors.black : Colors.white,
            overflow: TextOverflow.ellipsis,
            fontSize: 20,
            fontFamily: 'Poppins',
            fontWeight: FontWeight.w500),
      ),
      shape: const ContinuousRectangleBorder(
          borderRadius: BorderRadius.only(
              bottomLeft: Radius.circular(0), bottomRight: Radius.circular(0))),
      backgroundColor: _isAppBarCollapsed ? Colors.white : Colors.transparent,
      leading: IconButton(
        icon: _isAppBarCollapsed
            ? const Icon(
                IconlyLight.arrowLeft,
                color: Colors.black,
                size: 30,
              )
            : const Icon(IconlyLight.arrowLeft, size: 30, color: Colors.white),
        onPressed: () {
          Navigator.pop(context);
        },
      ),
      expandedHeight: 280,
      flexibleSpace: FlexibleSpaceBar(
        background: Stack(
          fit: StackFit.expand,
          children: <Widget>[
            ClipRRect(
              borderRadius: const BorderRadius.only(
                  bottomLeft: Radius.circular(0),
                  bottomRight: Radius.circular(0)),
              child: Image.network(
                doctorDetailPageViewModel.doctorDetail!.image,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            Positioned.fill(
                child: Container(
              decoration: const BoxDecoration(
                  gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.center,
                      colors: [Colors.black87, Colors.transparent])),
            ))
          ],
        ),
      ),
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(40),
        child: Container(
            decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topRight: Radius.circular(20),
                  topLeft: Radius.circular(20),
                  //bottomRight: Radius.circular(10),
                  // bottomLeft: Radius.circular(10)
                )),
            margin: const EdgeInsets.fromLTRB(15, 0, 15, 0),
            //padding: const EdgeInsets.only(),
            width: double.maxFinite,
            height: 90,
            child: Padding(
              padding: const EdgeInsets.all(15),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  SizedBox(
                    width: 210,
                    child: Text(
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      "Dr. ${doctorDetailPageViewModel.doctorDetail!.lastName} ${doctorDetailPageViewModel.doctorDetail!.firstName}",
                      style: const TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 21,
                        fontFamily: 'Poppins',
                      ),
                    ),
                  ),
                ],
              ),
            )),
      ),
    );
  }

  Widget basicInfoDoctor() {
    final doctorDetailPageProvider =
        Provider.of<DoctorDetailPageViewModel>(context, listen: false);

    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
        child: Container(
          height: 180,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: const BorderRadius.only(
                bottomRight: Radius.circular(20),
                bottomLeft: Radius.circular(20)),
            boxShadow: [
              BoxShadow(
                  color: Colors.grey.withOpacity(0.2),
                  spreadRadius: 0,
                  blurRadius: 7,
                  offset: const Offset(0, 10))
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 1, horizontal: 5),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(5, 0, 0, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(
                        IconlyLight.location,
                        size: 25,
                        color: Colors.amber,
                      ),
                      Container(
                        padding: const EdgeInsets.fromLTRB(10, 5, 0, 5),
                        width: 320,
                        child: Text(
                            doctorDetailPageProvider.hospital!.hospitalName,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                                overflow: TextOverflow.ellipsis,
                                height: 0.9,
                                fontSize: 16,
                                color: ColorConstant.Grey01,
                                fontWeight: FontWeight.w400,
                                fontFamily: 'Merriweather Sans')),
                      ),
                    ],
                  ), //hospital of doctor
                  Row(
                    children: [
                      const Padding(
                        padding: EdgeInsets.fromLTRB(5, 10, 0, 0.0),
                        child: Icon(
                          FontAwesomeIcons.userDoctor,
                          size: 20,
                          color: Colors.amber,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.fromLTRB(10, 5, 0, 0),
                        child: Text(
                            doctorDetailPageProvider.doctorDetail!.speciality,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                                overflow: TextOverflow.ellipsis,
                                height: 1.9,
                                fontSize: 16,
                                color: ColorConstant.Grey01,
                                fontWeight: FontWeight.w400,
                                fontFamily: 'Merriweather Sans')),
                      ),
                    ],
                  ), // Speciality of doctor
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          RatingBarIndicator(
                            rating: doctorDetailPageProvider.doctorDetail!.star
                                .toDouble(),
                            itemBuilder: (context, index) => const Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            itemCount: 5,
                            itemSize: 20.0,
                            direction: Axis.horizontal,
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          Text("${doctorDetailPageProvider.doctorDetail!.star}",
                              style: const TextStyle(
                                  height: 1.5,
                                  fontSize: 20,
                                  color: Colors.black87,
                                  fontWeight: FontWeight.w500,
                                  fontFamily: 'Merriweather Sans')),
                        ],
                      ),
                      TextButton(
                          onPressed: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                        const ReviewDoctor()));
                          },
                          child: const Text("Xem đánh giá",
                              style: TextStyle(
                                  height: 1.5,
                                  fontSize: 16,
                                  color: Colors.amber,
                                  fontWeight: FontWeight.w500,
                                  fontFamily: 'Merriweather Sans')))
                    ],
                  ), // star doctor
                  Row(
                    children: [
                      const Padding(
                        padding: EdgeInsets.fromLTRB(5, 0, 0, 0.0),
                        child: Icon(
                          FontAwesomeIcons.stethoscope,
                          size: 20,
                          color: Colors.amber,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.fromLTRB(10, 5, 0, 0),
                        child: const Text("15 năm kinh nghiệm ",
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                                overflow: TextOverflow.ellipsis,
                                height: 0.9,
                                fontSize: 16,
                                color: ColorConstant.Grey01,
                                fontWeight: FontWeight.w400,
                                fontFamily: 'Merriweather Sans')),
                      ),
                    ],
                  ), //experience doctor
                  Row(
                    children: [
                      const Padding(
                        padding: EdgeInsets.fromLTRB(5, 10, 0, 0.0),
                        child: Icon(
                          FontAwesomeIcons.phone,
                          size: 20,
                          color: Colors.amber,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.fromLTRB(10, 5, 0, 0),
                        child: Text(
                            doctorDetailPageProvider.doctorDetail!.phone,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                                overflow: TextOverflow.ellipsis,
                                height: 1.9,
                                fontSize: 16,
                                color: ColorConstant.Grey01,
                                fontWeight: FontWeight.w400,
                                fontFamily: 'Merriweather Sans')),
                      ),
                    ],
                  ), // number phone doctor
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget bookingForOtherPerson() {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 5, 10, 10),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
          ),
          child: ExpansionTile(
            title: Column(
              children: [
                RichText(
                  text: TextSpan(children: [
                    WidgetSpan(
                        child: Row(
                      children: [
                        Column(children: const [
                          Text(
                            'Đặt lịch cho người thân',
                            style: TextStyle(
                                fontWeight: FontWeight.w600,
                                fontSize: 20.0,
                                color: Colors.black),
                          ),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Text(
                                'Thêm thông tin người thân của bạn',
                                style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 15.0,
                                    color: ColorConstant.BLueText),
                              ))
                        ]),
                      ],
                    )),
                  ]),
                ),
              ],
            ),
            onExpansionChanged: (isExpanded) {
              setState(() {
                _isExpanded = isExpanded;
              });
            },
            initiallyExpanded: _isExpanded,
            children: [
              Column(
                children: [
                  SizedBox(
                    width: 350,
                    //height: 40,
                    child: TextFormField(
                        // textAlign: TextAlign.left,
                        style: const TextStyle(color: Colors.black),
                        controller: _controllerTextWordFullName,
                        decoration: const InputDecoration(
                          enabledBorder: UnderlineInputBorder(
                              borderRadius: BorderRadius.all(
                            Radius.circular(0),
                          )),
                          label: Text("Họ tên",
                              style: TextStyle(color: Colors.black)),
                          hintText: "Vui lòng nhập họ tên người bệnh",
                          hintStyle: TextStyle(
                            color: Color.fromARGB(255, 94, 92, 88),
                          ),
                        )),
                  ),
                  SizedBox(
                    width: 350,
                    //height: 40,
                    child: TextFormField(
                        // textAlign: TextAlign.left,
                        style: const TextStyle(color: Colors.black),
                        controller: _controllerTextWordAge,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          enabledBorder: UnderlineInputBorder(
                              borderRadius: BorderRadius.all(
                            Radius.circular(0),
                          )),
                          label: Text("Tuổi",
                              style: TextStyle(color: Colors.black)),
                          hintText: "Vui lòng nhập tuổi người bệnh",
                          hintStyle: TextStyle(
                            color: Color.fromARGB(255, 94, 92, 88),
                          ),
                        )),
                  ),
                  SizedBox(
                    width: 350,
                    child: DropdownButtonFormField<String>(
                      value: _gender,
                      decoration: const InputDecoration(
                        enabledBorder: UnderlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(0)),
                        ),
                        labelText: "Giới tính",
                        hintText: "Vui lòng chọn giới tính",
                        hintStyle: TextStyle(
                          color: Color.fromARGB(255, 94, 92, 88),
                        ),
                      ),
                      items: const [
                        DropdownMenuItem(
                          value: "male",
                          child: Text("Nam"),
                        ),
                        DropdownMenuItem(
                          value: "female",
                          child: Text("Nữ"),
                        ),
                      ],
                      onChanged: (value) {
                        setState(() {
                          _gender = value;
                          orderHospitalDataViewModel.setGender(_gender!);
                        });
                      },
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget selectServices() {
    final doctorDetailPageViewModel =
        Provider.of<DoctorDetailPageViewModel>(context, listen: false);

    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 5.0),
      sliver: SliverToBoxAdapter(
        child: Column(
          children: [
            Container(
                margin: const EdgeInsets.fromLTRB(10, 10, 20, 10),
                child: const Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Dịch vụ ',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 20.0,
                    ),
                  ),
                )),
            GridView.count(
                crossAxisCount: 2,
                mainAxisSpacing: 10,
                crossAxisSpacing: 8,
                padding: const EdgeInsets.all(10),
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                childAspectRatio: (1 / 0.4),
                children: List.generate(
                    doctorDetailPageViewModel.hospital!.services.length,
                    (index) => GestureDetector(
                          onTap: () {
                            setState(() {
                              doctorDetailPageViewModel.setCheck(
                                  doctorDetailPageViewModel.listServiceCheck
                                      .contains(doctorDetailPageViewModel
                                          .hospital!.services[index]));
                              doctorDetailPageViewModel.setListServiceCheck(
                                  doctorDetailPageViewModel
                                      .hospital!.services[index]);
                            });
                          },
                          child: Container(
                            margin: const EdgeInsets.symmetric(horizontal: 5),
                            padding: const EdgeInsets.symmetric(horizontal: 10),
                            height: 100,
                            decoration: BoxDecoration(
                                color: doctorDetailPageViewModel
                                        .listServiceCheck
                                        .contains(doctorDetailPageViewModel
                                            .hospital!.services[index])
                                    ? ColorConstant.BLue02
                                    : const Color(0x0fffffff),
                                borderRadius: BorderRadius.circular(20.0),
                                border: Border.all(
                                    width: 1.0, color: ColorConstant.BLue02)),
                            child: Align(
                              alignment: Alignment.topLeft,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Align(
                                    alignment: Alignment.topLeft,
                                    child: Text(
                                      doctorDetailPageViewModel.hospital!
                                          .services[index].serviceName,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: TextStyle(
                                        overflow: TextOverflow.ellipsis,
                                        color: doctorDetailPageViewModel
                                                .listServiceCheck
                                                .contains(
                                                    doctorDetailPageViewModel
                                                        .hospital!
                                                        .services[index])
                                            ? Colors.white
                                            : ColorConstant.BLue05,
                                        height: 1,
                                        fontSize: 15,
                                        fontWeight: FontWeight.w500,
                                        fontFamily: 'Merriweather Sans',
                                      ),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 20,
                                  ),
                                  Align(
                                    alignment: Alignment.topRight,
                                    child: Text(
                                      "${doctorDetailPageViewModel.hospital!.services[index].price}00đ",
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                        overflow: TextOverflow.ellipsis,
                                        height: 1,
                                        fontSize: 15,
                                        color: Colors.orange,
                                        fontWeight: FontWeight.w500,
                                        fontFamily: 'Merriweather Sans',
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ))),
          ],
        ),
      ),
    );
  }

  Widget selectDay() {
    return SliverToBoxAdapter(
        child: Padding(
      padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
      child: Container(
        width: double.maxFinite,
        height: 220,
        decoration: const BoxDecoration(
            // color: Colors.amber
            ),
        child: const SelectDayDoctor(),
      ),
    ));
  }

  Widget selectTime() {
    final doctorDetailPageViewModel =
        Provider.of<DoctorDetailPageViewModel>(context, listen: false);

    final scheduleDoctorInfoPageViewModel =
        Provider.of<ScheduleDoctorInfoPageViewModel>(context, listen: false);

    doctorDetailPageViewModel.setWorkingDayDetailsCheck(
        doctorDetailPageViewModel.hospital!.workingDayDetails,
        scheduleDoctorInfoPageViewModel.weekday);

    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    orderHospitalDataViewModel.setWorkingDayDetailsCheck(
        doctorDetailPageViewModel.workingDayDetailsCheck);

    return Consumer<ScheduleDoctorInfoPageViewModel>(
      builder: (context, scheduleDoctorInfoPageProvider, child) =>
          SliverPadding(
        padding: const EdgeInsets.symmetric(horizontal: 5.0),
        sliver: SliverToBoxAdapter(
          child: SizedBox(
            height: 100,
            child: Column(
              children: [
                Container(
                    margin: const EdgeInsets.fromLTRB(10, 10, 20, 10),
                    child: const Align(
                      alignment: Alignment.topLeft,
                      child: Text(
                        'Thời gian ',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 20.0,
                        ),
                      ),
                    )),
                doctorDetailPageViewModel.workingDayDetailsCheck.isNotEmpty && doctorDetailPageViewModel.workingDayDetailsCheck[0].startHour.isNotEmpty
                    ? GridView.count(
                        //padding: const EdgeInsets.symmetric(horizontal: 8.0),
                        crossAxisCount: 3,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        childAspectRatio: (1 / .4),
                        children: List.generate(
                          doctorDetailPageViewModel
                              .workingDayDetailsCheck.length,
                          (index) {
                            if (doctorDetailPageViewModel.workingDayDetailsCheck[index].startHour != null &&
                                doctorDetailPageViewModel.workingDayDetailsCheck[index].endHour != null &&
                                doctorDetailPageViewModel.workingDayDetailsCheck[index].startHour.toString().isNotEmpty &&
                                doctorDetailPageViewModel.workingDayDetailsCheck[index].endHour.toString().isNotEmpty){
                              return GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _selectedTime = index;

                                    orderHospitalDataViewModel.setSession(doctorDetailPageViewModel.workingDayDetailsCheck[index].session);

                                    orderHospitalDataViewModel.setTimeSelected("${doctorDetailPageViewModel.workingDayDetailsCheck[index].startHour} - ${doctorDetailPageViewModel.workingDayDetailsCheck[index].endHour}");

                                  });
                                },
                                child: Container(
                                  margin: const EdgeInsets.symmetric(
                                      horizontal: 5.0),
                                  decoration: BoxDecoration(
                                    color: _selectedTime == index
                                        ? ColorConstant.BLue02
                                        : const Color(0xFFf6f6f6),
                                    borderRadius: BorderRadius.circular(20.0),
                                  ),
                                  child: Padding(
                                    padding: const EdgeInsets.all(0.0),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.center,
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          doctorDetailPageViewModel.workingDayDetailsCheck[index].session == "Sáng" ? "Sáng" :
                                          (doctorDetailPageViewModel.workingDayDetailsCheck[index].session == "Chiều" ? "Chiều" :
                                          (doctorDetailPageViewModel.workingDayDetailsCheck[index].session == "Tối" ? "Tối" : "")),
                                          style: TextStyle(
                                            fontSize: 15,
                                            fontWeight: FontWeight.w400,
                                            fontFamily: 'Poppins',
                                            color: _selectedTime == index
                                                ? Colors.white
                                                : Colors.black,
                                          ),
                                        ),
                                        Text(
                                          "${doctorDetailPageViewModel.workingDayDetailsCheck[index].startHour} - ${doctorDetailPageViewModel.workingDayDetailsCheck[index].endHour}",
                                          style: TextStyle(
                                            fontSize: 15,
                                            fontWeight: FontWeight.w400,
                                            fontFamily: 'Poppins',
                                            color: _selectedTime == index
                                                ? Colors.white
                                                : Colors.black,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              );

                            }else{
                              return Container(); // Không hiển thị container cho buổi không có giờ
                            }
                            // return GestureDetector(
                            //   onTap: () {
                            //     setState(() {
                            //       _selectedTime = index;
                            //       orderHospitalDataViewModel.setSession(
                            //           doctorDetailPageViewModel
                            //                       .workingDayDetailsCheck[index]
                            //                       .session ==
                            //                   "MORNING"
                            //               ? "Sáng"
                            //               : "Chiều");
                            //       orderHospitalDataViewModel.setTimeSelected(
                            //           "${doctorDetailPageViewModel.workingDayDetailsCheck[index].startHour} - ${doctorDetailPageViewModel.workingDayDetailsCheck[index].endHour}");
                            //     });
                            //   },
                            //   child: Container(
                            //     //height: 100,
                            //     margin:
                            //         const EdgeInsets.symmetric(horizontal: 5.0),
                            //     decoration: BoxDecoration(
                            //       color: _selectedTime == index
                            //           ? ColorConstant.BLue02
                            //           : const Color(0xFFf6f6f6),
                            //       borderRadius: BorderRadius.circular(20.0),
                            //     ),
                            //     child: Padding(
                            //       padding: const EdgeInsets.all(0.0),
                            //       child: Column(
                            //         children: [
                            //           Text(
                            //             doctorDetailPageViewModel
                            //                         .workingDayDetailsCheck[
                            //                             index]
                            //                         .session ==
                            //                     "MORNING"
                            //                 ? "Sáng"
                            //                 : "Chiều",
                            //             style: TextStyle(
                            //               fontSize: 15,
                            //               fontWeight: FontWeight.w400,
                            //               fontFamily: 'Poppins',
                            //               color: _selectedTime == index
                            //                   ? Colors.white
                            //                   : Colors.black,
                            //             ),
                            //           ),
                            //           Text(
                            //             "${doctorDetailPageViewModel.workingDayDetailsCheck[index].startHour} - ${doctorDetailPageViewModel.workingDayDetailsCheck[index].endHour}",
                            //             style: TextStyle(
                            //               fontSize: 15,
                            //               fontWeight: FontWeight.w400,
                            //               fontFamily: 'Poppins',
                            //               color: _selectedTime == index
                            //                   ? Colors.white
                            //                   : Colors.black,
                            //             ),
                            //           ),
                            //         ],
                            //       ),
                            //     ),
                            //   ),
                            // );
                          },
                        ),
                      )
                    : Container(
                        margin: const EdgeInsets.only(top: 15),
                        child: const Text(
                            "Không Thuộc Ngày Làm Việc Của Bệnh Viện")),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget symptom() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 5, 10, 10),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
          ),
          child: ExpansionTile(
            title: const Text(
              'Triệu chứng của bạn',
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: 20.0,
              ),
            ),
            onExpansionChanged: (isExpanded) {
              setState(() {
                _isExpanded = isExpanded;
              });
            },
            initiallyExpanded: _isExpanded,
            children: [
              Container(
                margin: const EdgeInsets.only(left: 10, right: 0),
                padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                decoration: BoxDecoration(
                    borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(30),
                        topRight: Radius.circular(30)),
                    border: Border.all(width: 0.5, color: Colors.grey)),
                child: TextFormField(
                  controller: _controllerTextWord,
                  maxLines: 10,
                  maxLength: 350,
                  decoration: const InputDecoration(
                    hintText: 'Triệu chứng của bạn',
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget shareHistory() {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 5, 10, 10),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
          ),
          child: ExpansionTile(
            title: const Text(
              'Chia sẻ lịch sử khám chữa bệnh',
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: 20.0,
              ),
            ),
            onExpansionChanged: (isExpanded) {
              setState(() {
                _isExpanded = isExpanded;
              });
            },
            initiallyExpanded: _isExpanded,
            children: [
              orderHospitalDataViewModel.listHistoryCheckBox.isNotEmpty
                  ? Column(
                      children: [
                        ...orderHospitalDataViewModel.listHistoryCheckBox.map(
                            (e) => Container(
                                margin:
                                    const EdgeInsets.only(left: 10, right: 0),
                                padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(30),
                                    border: Border.all(
                                        width: 0.5, color: Colors.transparent)),
                                child: Container(
                                    margin: const EdgeInsets.only(
                                        right: 0, top: 20, bottom: 10),
                                    height: 110,
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
                                        shape: MaterialStateProperty.all<
                                            RoundedRectangleBorder>(
                                          RoundedRectangleBorder(
                                            borderRadius:
                                                BorderRadius.circular(20.0),
                                          ),
                                        ),
                                      ),
                                      onPressed: () {},
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Center(
                                            child: Row(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.end,
                                              children: [
                                                ClipRRect(
                                                  borderRadius:
                                                      BorderRadius.circular(30),
                                                  child: Image.network(
                                                    e.historyCheck
                                                        .hospitalImage,
                                                    fit: BoxFit.fill,
                                                    width: 100,
                                                    height: 100,
                                                  ),
                                                ),
                                                Padding(
                                                  padding:
                                                      const EdgeInsets.fromLTRB(
                                                          5, 5, 0, 0),
                                                  child: Column(
                                                    children: [
                                                      SizedBox(
                                                          width: 190,
                                                          child: Text(
                                                              e.historyCheck
                                                                  .hospitalName,
                                                              maxLines: 2,
                                                              overflow:
                                                                  TextOverflow
                                                                      .ellipsis,
                                                              style: const TextStyle(
                                                                  fontSize: 13,
                                                                  color: Color(
                                                                      0xff1c335b),
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w600,
                                                                  fontFamily:
                                                                      'Merriweather Sans '))),
                                                      const SizedBox(
                                                        height: 3,
                                                      ),
                                                      Expanded(
                                                        flex: 1,
                                                        child: SizedBox(
                                                            width: 190,
                                                            child: Text(
                                                                e.historyCheck
                                                                    .address,
                                                                maxLines: 2,
                                                                overflow:
                                                                    TextOverflow
                                                                        .ellipsis,
                                                                style: const TextStyle(
                                                                    height: 1,
                                                                    fontSize:
                                                                        13,
                                                                    color: Colors
                                                                        .black,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .w600,
                                                                    fontFamily:
                                                                        'Merriweather Sans'))),
                                                      ),
                                                      Expanded(
                                                        flex: 1,
                                                        child: SizedBox(
                                                            width: 190,
                                                            child: Text(
                                                                date_util.DateUtils.convertDateTime(e
                                                                    .historyCheck
                                                                    .invoiceInformation
                                                                    .dateTimeInvoice),
                                                                maxLines: 2,
                                                                overflow:
                                                                    TextOverflow
                                                                        .ellipsis,
                                                                style: const TextStyle(
                                                                    fontSize:
                                                                        13,
                                                                    color: Colors
                                                                        .black,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .w600,
                                                                    fontFamily:
                                                                        'Merriweather Sans '))),
                                                      )
                                                    ],
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                          Checkbox(
                                            value: e.checked,
                                            onChanged: (newValue) {
                                              setState(() {
                                                e.checked = newValue!;
                                                orderHospitalDataViewModel
                                                    .setShareHistoryList();
                                              });
                                            },
                                          )
                                        ],
                                      ),
                                    ))))
                      ],
                    )
                  : const Text("Không có lịch sử")
            ],
          ),
        ),
      ),
    );
  }

  Widget bottomNavigationBar() {
    return Container(
      height: 80,
      color: Colors.transparent,
      child: Column(
        children: [continues()],
      ),
    );
  }

  Widget continues() {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    final doctorDetailPageViewModel =
        Provider.of<DoctorDetailPageViewModel>(context, listen: false);

    final loginPageViewModel =
        Provider.of<LoginPageViewModel>(context, listen: false);

    return Padding(
        padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
        child: Container(
          height: 70,
          width: double.infinity,
          decoration: BoxDecoration(borderRadius: BorderRadius.circular(20)),
          child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                elevation: 5,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30.0),
                ),
              ),
              onPressed: () {
                orderHospitalDataViewModel
                    .setName(_controllerTextWordFullName.text);
                orderHospitalDataViewModel.setAge(_controllerTextWordAge.text);
                orderHospitalDataViewModel
                    .setServices(doctorDetailPageViewModel.listServiceCheck);
                orderHospitalDataViewModel.setSymptom(_controllerTextWord.text);
                orderHospitalDataViewModel
                    .setUserLogin(loginPageViewModel.userLogin);
                orderHospitalDataViewModel
                    .setHospital(doctorDetailPageViewModel.hospital!);
                orderHospitalDataViewModel
                    .setDoctorSelected(doctorDetailPageViewModel.doctorDetail!);
                orderHospitalDataViewModel.setOrderWithDoctor(true);

                orderHospitalDataViewModel.validateDataOrder().isNotEmpty
                    ? Fluttertoast.showToast(
                        msg: orderHospitalDataViewModel.validateDataOrder(),
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.CENTER,
                        timeInSecForIosWeb: 1,
                        backgroundColor: Colors.red,
                        textColor: Colors.white,
                        fontSize: 16.0)
                    : Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const OrderSummary()));
              },
              child: const Padding(
                padding: EdgeInsets.only(
                  top: 10,
                  bottom: 10,
                ),
                child: Text(
                  "Tiếp Tục",
                  style: TextStyle(fontSize: 21, fontWeight: FontWeight.w600),
                ),
              )),
        ));
  }
}
