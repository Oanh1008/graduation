

import 'package:care_bookie_app/api_services/comment_api.dart';
import 'package:care_bookie_app/api_services/doctor_api.dart';
import 'package:care_bookie_app/api_services/hospital_api.dart';
import 'package:care_bookie_app/models/comment.dart';
import 'package:care_bookie_app/models/doctor.dart';
import 'package:care_bookie_app/models/history.dart';
import 'package:care_bookie_app/models/hospital.dart';
import 'package:flutter/widgets.dart';

import '../models/comment_data.dart';

class HistoryDetailPageViewModel extends ChangeNotifier{

  History? historyDetail;

  DoctorApi doctorApi = DoctorApi();

  HospitalApi hospitalApi = HospitalApi();

  CommentApi commentApi = CommentApi();

  List<Comment> listCommentDoctor = [];

  Doctor? doctorDetail;

  List<Comment> listCommentHospital = [];

  Hospital? hospitalDetail;

  void setHistoryDetail(History history) {
    historyDetail = history;
  }

  Future<bool> createCommentDoctorByUserId(CommentData commentDoctor) async {

    return await commentApi.createCommentDoctorByUserIdApi(commentDoctor);

  }

  Future<bool> createCommentHospitalByUserId(CommentData commentHospital) async {

    return await commentApi.createCommentHospitalByUserIdApi(commentHospital);

  }


  int starDefaultDoctor = 4;

  int starDefaultHospital = 4;

  void setStarDefaultDoctor(int value) {
    starDefaultDoctor = value;
  }

  void setStarDefaultHospital(int value) {
    starDefaultDoctor = value;
  }

  Future<void> getAllCommentByDoctorId(String doctorId) async {

    listCommentDoctor = await doctorApi.getAllCommentByDoctorIdApi(doctorId);

    doctorDetail = await doctorApi.getDoctorByIdApi(doctorId);

  }

  Future<void> getAllCommentByHospitalId(String hospitalId) async {

    listCommentHospital = await hospitalApi.getAllCommentByHospitalIdApi(hospitalId);

    hospitalDetail = await hospitalApi.getHospitalByIdApi(hospitalId);

  }

}