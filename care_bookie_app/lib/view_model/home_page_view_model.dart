import 'package:care_bookie_app/api_services/doctor_api.dart';
import 'package:care_bookie_app/api_services/hospital_api.dart';
import 'package:care_bookie_app/api_services/schedule_api.dart';
import 'package:care_bookie_app/models/hospital.dart';
import 'package:care_bookie_app/models/schedule.dart';
import 'package:flutter/foundation.dart';

import '../models/doctor.dart';


class HomePageViewModel extends ChangeNotifier {

  DoctorApi doctorApi = DoctorApi();


  HospitalApi hospitalApi = HospitalApi();

  List<Doctor> doctors = [];

  List<Hospital> hospitals = [];

  Future<void> getAllDoctor() async {
    doctors = await doctorApi.getAllDoctorApi();
    notifyListeners();
  }

  Future<void> getAllHospital() async {
    hospitals = await hospitalApi.getAllHospitalApi();
    notifyListeners();
  }



}