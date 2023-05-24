import 'package:care_bookie_app/models/doctor.dart';
import 'package:care_bookie_app/utils/date_utils.dart' as date_util;
import 'package:care_bookie_app/view_model/history_page_view_model.dart';
import 'package:care_bookie_app/view_model/hospital_detail_page_view_model.dart';
import 'package:care_bookie_app/view_model/schedule_info_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:provider/provider.dart';
import '../../../../res/constants/colors.dart';
import '../../../../view_model/login_page_view_model.dart';
import '../../../../view_model/order_hospital_data_view_model.dart';
import '../main_page_widget/order_widget/select_day_order.dart';
import '../order_sumary.dart';

class OrderDetailClinic extends StatefulWidget {
  const OrderDetailClinic({Key? key}) : super(key: key);

  @override
  State<OrderDetailClinic> createState() => _OrderDetailClinicState();
}

class _OrderDetailClinicState extends State<OrderDetailClinic> {
  bool _isAppBarCollapsed = false;
  bool _isExpanded = false;
  bool isSelectedServices = false;
  int _selectedDoctor = -1;
  int _selectedTime = -1;
  String? _gender;

  late ScrollController _scrollController;
  final TextEditingController _controllerTextWord = TextEditingController();
  final TextEditingController _controllerTextWordFullName =
      TextEditingController();
  final TextEditingController _controllerTextWordAge = TextEditingController();
  late List<Doctor> _options = [];

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

    final hospitalDetailPageViewModel =
        Provider.of<HospitalDetailPageViewModel>(context, listen: false);

    _options = hospitalDetailPageViewModel.doctors;

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
      body: Consumer<ScheduleInfoPageViewModel>(
        builder: (context, scheduleInfoPageViewModel, child) =>
            CustomScrollView(
          controller: _scrollController,
          slivers: <Widget>[
            sliverAppbar(),
            bookingForOtherPerson(),
            selectDoctorTitle(),
            selectDoctor(),
            selectServices(),
            selectDay(),
            selectTime(),
            symptom(),
            shareHistory(),
            //const ShareHistory()
          ],
        ),
      ),
      bottomNavigationBar: bottomNavigationBar(),
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

  Widget sliverAppbar() {
    final hospitalDetailPageViewModel =
        Provider.of<HospitalDetailPageViewModel>(context, listen: false);
    return SliverAppBar(
      title: Text(
        hospitalDetailPageViewModel.hospitalDetail!.hospitalName,
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
          final orderHospitalDataViewModel =
              Provider.of<OrderHospitalDataViewModel>(context, listen: false);

          orderHospitalDataViewModel.resetAllData();

          Navigator.pop(context);
        },
      ),

      expandedHeight: 280,
      //collapsedHeight: 70,
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        background: Stack(
          fit: StackFit.expand,
          children: <Widget>[
            ClipRRect(
              borderRadius: const BorderRadius.only(
                  bottomLeft: Radius.circular(0),
                  bottomRight: Radius.circular(0)),
              child: Image.network(
                hospitalDetailPageViewModel.hospitalDetail!.image,
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
        stretchModes: const <StretchMode>[
          StretchMode.zoomBackground,
        ],
      ),
    );
  }

  Widget selectDoctorTitle() {
    return SliverToBoxAdapter(
      child: Container(
        margin: const EdgeInsets.fromLTRB(15, 10, 20, 0),
        child: const Text(
          'Lựa chọn bác sỹ',
          style: TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 20.0,
          ),
        ),
      ),
    );
  }

  Widget selectDoctor() {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    return SliverList(
      delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          final option = _options[index];
          return Column(
            children: <Widget>[
              RadioListTile<int>(
                activeColor: ColorConstant.BLue02,
                title: Text(
                  "Dr. ${option.lastName} ${option.firstName}",
                  style: TextStyle(
                    fontWeight: FontWeight.w500,
                    color: _selectedDoctor == index
                        ? ColorConstant.BLue02
                        : Colors.grey[800],
                    fontSize: 17.0,
                  ),
                ),
                value: index,
                groupValue: _selectedDoctor,
                onChanged: (int? value) {
                  setState(() {
                    _selectedDoctor = value!;
                    orderHospitalDataViewModel.setDoctorSelected(option);
                  });
                },
              ),
            ],
          );
        },
        childCount: _options.length,
      ),
    );
  }

  Widget selectServices() {
    final hospitalDetailPageViewModel =
        Provider.of<HospitalDetailPageViewModel>(context, listen: false);

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
                    hospitalDetailPageViewModel.hospitalDetail!.services.length,
                    (index) => GestureDetector(
                          onTap: () {
                            setState(() {
                              hospitalDetailPageViewModel.setCheck(
                                  hospitalDetailPageViewModel.listServiceCheck
                                      .contains(hospitalDetailPageViewModel
                                          .hospitalDetail!.services[index]));
                              hospitalDetailPageViewModel.setListServiceCheck(
                                  hospitalDetailPageViewModel
                                      .hospitalDetail!.services[index]);
                            });
                          },
                          child: Container(
                            margin: const EdgeInsets.symmetric(horizontal: 5),
                            padding: const EdgeInsets.symmetric(horizontal: 10),
                            height: 100,
                            decoration: BoxDecoration(
                                color: hospitalDetailPageViewModel
                                        .listServiceCheck
                                        .contains(hospitalDetailPageViewModel
                                            .hospitalDetail!.services[index])
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
                                      hospitalDetailPageViewModel
                                          .hospitalDetail!
                                          .services[index]
                                          .serviceName,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: TextStyle(
                                        overflow: TextOverflow.ellipsis,
                                        color: hospitalDetailPageViewModel
                                                .listServiceCheck
                                                .contains(
                                                    hospitalDetailPageViewModel
                                                        .hospitalDetail!
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
                                      "${hospitalDetailPageViewModel.hospitalDetail!.services[index].price}00đ",
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
        child: const SelectDay(),
      ),
    ));
  }

  Widget selectTime() {
    final hospitalDetailPageViewModel =
        Provider.of<HospitalDetailPageViewModel>(context, listen: false);

    final scheduleInfoPageViewModel =
        Provider.of<ScheduleInfoPageViewModel>(context, listen: false);

    hospitalDetailPageViewModel.setWorkingDayDetailsCheck(
        hospitalDetailPageViewModel.hospitalDetail!.workingDayDetails,
        scheduleInfoPageViewModel.weekday);

    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    orderHospitalDataViewModel.setWorkingDayDetailsCheck(
        hospitalDetailPageViewModel.workingDayDetailsCheck);

    return Consumer<ScheduleInfoPageViewModel>(
      builder: (context, scheduleInfoPageProvider, child) => SliverPadding(
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
                hospitalDetailPageViewModel.workingDayDetailsCheck.isNotEmpty && hospitalDetailPageViewModel.workingDayDetailsCheck[0].startHour.isNotEmpty
                    ? GridView.count(
                        //padding: const EdgeInsets.symmetric(horizontal: 8.0),
                        crossAxisCount: 3,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        childAspectRatio: (1 / .4),
                        children: List.generate(
                          hospitalDetailPageViewModel
                              .workingDayDetailsCheck.length,
                          (index) {
                            if (hospitalDetailPageViewModel.workingDayDetailsCheck[index].startHour != null &&
                                hospitalDetailPageViewModel.workingDayDetailsCheck[index].endHour != null &&
                                hospitalDetailPageViewModel.workingDayDetailsCheck[index].startHour.toString().isNotEmpty &&
                                hospitalDetailPageViewModel.workingDayDetailsCheck[index].endHour.toString().isNotEmpty) {
                              return GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _selectedTime = index;

                                    orderHospitalDataViewModel.setSession(hospitalDetailPageViewModel.workingDayDetailsCheck[index].session);

                                    orderHospitalDataViewModel.setTimeSelected("${hospitalDetailPageViewModel.workingDayDetailsCheck[index].startHour} - ${hospitalDetailPageViewModel.workingDayDetailsCheck[index].endHour}");

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
                                      hospitalDetailPageViewModel.workingDayDetailsCheck[index].session == "Sáng" ? "Sáng" :
                                      (hospitalDetailPageViewModel.workingDayDetailsCheck[index].session == "Chiều" ? "Chiều" :
                                      (hospitalDetailPageViewModel.workingDayDetailsCheck[index].session == "Tối" ? "Tối" : "")),
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
                                          "${hospitalDetailPageViewModel.workingDayDetailsCheck[index].startHour} - ${hospitalDetailPageViewModel.workingDayDetailsCheck[index].endHour}",
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
                            } else {
                              return Container(); // Không hiển thị container cho buổi không có giờ
                            }
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
              'Triệu chứng của bạn (Người thân)',
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
                    hintText: 'Triệu chứng của bạn hoặc người thân',
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
        children: [continuous()],
      ),
    );
  }

  Widget continuous() {
    final orderHospitalDataViewModel =
        Provider.of<OrderHospitalDataViewModel>(context, listen: false);

    final hospitalDetailPageViewModel =
        Provider.of<HospitalDetailPageViewModel>(context, listen: false);

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
                    .setServices(hospitalDetailPageViewModel.listServiceCheck);
                orderHospitalDataViewModel.setSymptom(_controllerTextWord.text);
                orderHospitalDataViewModel
                    .setUserLogin(loginPageViewModel.userLogin);
                orderHospitalDataViewModel
                    .setHospital(hospitalDetailPageViewModel.hospitalDetail!);

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
