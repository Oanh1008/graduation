import 'package:care_bookie_app/api_services/invoice_api.dart';
import 'package:care_bookie_app/models/invoice_data.dart';
import 'package:care_bookie_app/models/user_login.dart';
import 'package:care_bookie_app/utils/date_utils.dart' as date_util;
import 'package:care_bookie_app/models/doctor.dart';
import 'package:care_bookie_app/models/hospital.dart';
import 'package:care_bookie_app/utils/date_utils.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import '../models/history.dart';
import '../models/history_checkbox.dart';
import '../models/schedule.dart';
import '../models/service.dart';
import '../models/working_day_detail.dart';

class OrderHospitalDataViewModel extends ChangeNotifier {

  InvoiceApi invoiceApi = InvoiceApi();

  Doctor? doctorSelected;

  List<Service> services = [];

  String? dateTimeSelected;

  String? timeSelected;

  int? weekdaySelected;

  String? symptom;

  Hospital? hospital;

  int? age;

  String? name;

  List<int> shareHistoryList = [];

  List<HistoryCheckBox> listHistoryCheckBox = [];

  List<WorkingDayDetail> workingDayDetailsCheck = [];

  String? session;

  int? gender;

  UserLogin? userLogin;

  num totalFee = 0;

  bool orderWithDoctor = false;

  List<Schedule> listScheduleCheckData = [];

  void setOrderWithDoctor(bool value) {
    orderWithDoctor = value;
  }

  void setUserLogin(UserLogin user) {
    userLogin = user;
  }

  void resetData() {
    age = null;
    name = null;
    gender = null;
  }

  void resetAllData() {
    doctorSelected = null;
    services = [];
    dateTimeSelected = null;
    timeSelected = null;
    weekdaySelected = null;
    symptom = null;
    hospital = null;
    age = null;
    name = null;
    shareHistoryList = [];
    listHistoryCheckBox = [];
    workingDayDetailsCheck = [];
    session = null;
    gender = null;
    userLogin = null;
    totalFee = 0;
    orderWithDoctor = false;
    notifyListeners();
  }


  void setDoctorSelected(Doctor doctor) {
    doctorSelected = doctor;
  }

  void setDateTimeSelected(String dateTime) {
    dateTimeSelected = dateTime;
  }

  void setWeekdaySelected(int weekday) {
    weekdaySelected = weekday;
  }

  void setSymptom(String symptom) {
    this.symptom = symptom;
  }

  void setHospital(Hospital hospital) {
    this.hospital = hospital;
  }

  void setAge(String ageStr) {
    if(ageStr.isNotEmpty) {
      age = int.parse(ageStr);
    }
  }

  void setName(String name) {
    this.name = name;
  }

  void setGender(String value) {
    value == "male" ? gender = 1 : gender = 0;
  }

  void setSession(String value) {
    session = value;
  }

  void setWorkingDayDetailsCheck(List<WorkingDayDetail> data) {
    workingDayDetailsCheck = data;
  }

  void setTimeSelected(String value) {
    timeSelected = value;
  }
  
  void setServices(List<Service> data){
    services = data;
  }

  void setListHistoryCheckBox(List<History> histories) {
    if(histories.isNotEmpty){
      listHistoryCheckBox = histories.map((e) => HistoryCheckBox(historyCheck: e)).toList();
    }
  }

  void setShareHistoryList() {
    shareHistoryList = [];
    for(int i = 0; i < listHistoryCheckBox.length ; i++) {
      if(listHistoryCheckBox[i].checked) {
        shareHistoryList.add(listHistoryCheckBox[i].historyCheck.invoiceInformation.id);
      }
    }
  }

  void setInfoUser(UserLogin userLogin) {
    if(name!.isEmpty) {

      userLogin.birthDay.isEmpty ? age = 0 : age = date_util.DateUtils.calculateAge(userLogin.birthDay);

      name = '${userLogin.lastName} ${userLogin.firstName}';
      userLogin.birthDay.isEmpty ? gender =1 : gender = userLogin.gender;
    }
  }

  void setListScheduleCheckData(List<Schedule> schedules) {

    listScheduleCheckData = [];

    for(var schedule in schedules) {
      if(schedule.bookInformation.status != "CANCEL") {
        listScheduleCheckData.add(schedule);
      }
    }

  }

  String validateDataOrder() {

    if(validateDataRelativesInfo()) {
      return "Vui lòng điền đầy đủ thông tin của người thân";
    }

    if(validateDataServices()) {
      return "Vui lòng chọn dịch vụ khám";
    }

    if(validateDataDateTime()) {
      return "Vui lòng chọn sau ngày hôm nay để bệnh viện có thể phục vụ";
    }

    if(validateDataWorkingDayDetail()) {
      return "Vui lòng chọn ngày đúng với ngày làm việc của bệnh viện";
    }

    if(validateDataWorkingDayDetailSelected()) {
      return "Vui lòng chọn thời gian hẹn khám bệnh";
    }

    if(validateCheckSchedule()) {
      return "Thời gian bị trùng với lịch hẹn bạn đã đặt trước đó";
    }

    if(validateSymptom()) {
      return "Vui lòng cung cấp triệu chứng bệnh của bạn";
    }

    return "";

  }

  bool validateDataRelativesInfo() {
    if (
    (name!.isNotEmpty && (age == null || gender == null) ||
    (age != null && (name!.isEmpty || gender == null)) ||
    (gender != null && (name!.isEmpty || age == null))
    )) {
      return true;
    }

    return false;

  }

  bool validateDataServices() {
    if(services.isEmpty) {
      return true;
    }
    return false;
  }

  bool validateDataDateTime() {
    if(dateTimeSelected == null) {
      return true;
    }
    if(date_util.DateUtils.isDateBeforeNow(dateTimeSelected!)) {
      return true;
    }
    return false;
  }

  bool validateDataWorkingDayDetail() {
    if(workingDayDetailsCheck.isEmpty) {
      return true;
    }
    return false;
  }

  bool validateDataWorkingDayDetailSelected() {
  if(session == null) {
      return true;
    }
    return false;
  }

  bool validateSymptom() {
    if(symptom!.isEmpty){
      return true;
    }
    return false;
  }

  bool validateCheckSchedule() {

    for(var schedule in listScheduleCheckData) {
      if(schedule.bookInformation.session == session && schedule.bookInformation.dateExamination == dateTimeSelected) {
        return true;
      }
    }

    return false;
  }

  Future<bool> createInvoice() async{

    List<int> servicesData = services.map((e) => e.id).toList();

    InvoiceData invoiceData = InvoiceData(
        hospitalId: hospital!.id,
        age: age!,
        gender: gender! == 1 ? "Nam" : "Nữ",
        services: servicesData,
        symptom: symptom!,
        name: name!,
        session: session!,
        userId: userLogin!.id,
        invoices: shareHistoryList,
        shareInvoice: shareHistoryList.isNotEmpty ? true : false,
        doctorId: doctorSelected == null ? "" : doctorSelected!.id,
        dateExamination: dateTimeSelected!,
        date: weekdaySelected!.toString()
    );
    bool isSuccess = await invoiceApi.createInvoiceApi(invoiceData);
    return isSuccess;
  }
}