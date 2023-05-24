
import 'package:care_bookie_app/api_services/doctor_api.dart';
import 'package:care_bookie_app/api_services/favorite_api.dart';
import 'package:care_bookie_app/models/doctor.dart';
import 'package:care_bookie_app/models/favorite.dart';
import 'package:care_bookie_app/models/hospital.dart';
import 'package:care_bookie_app/models/service.dart';
import 'package:flutter/material.dart';
import '../api_services/hospital_api.dart';
import '../models/comment.dart';
import '../models/schedule.dart';
import '../models/working_day_detail.dart';


class DoctorDetailPageViewModel extends ChangeNotifier {

  DoctorApi doctorApi = DoctorApi();

  FavoriteApi favoriteApi = FavoriteApi();

  HospitalApi hospitalApi = HospitalApi();

  Doctor? doctorDetail;

  Hospital? hospital;

  List<Comment> comments = [];

  List<WorkingDayDetail> workingDayDetailsCheck = [];

  List<Service> listServiceCheck = [];

  bool check = false;

  Schedule? scheduleWithDoctor;

  bool isFavorite = false;

  int? favoriteId;

  bool isFavoritePage = false;
  
  DoctorFavorite? doctorFavorite;

  Schedule? scheduleWithHospital;

  void setScheduleWithHospital(List<Schedule> schedules) {
    for (var element in schedules) {
      if(element.bookInformation.hospitalId == hospital!.id && element.bookInformation.status != "CANCEL") {
        scheduleWithHospital = element;
      }
    }
  }

  void setIsFavoritePage(bool value){
    isFavoritePage = value;
  }

  void resetIsFavoritePage() {
    isFavoritePage = false;
  }

  void setDoctorDetail(Doctor doctor) {
    doctorDetail = doctor;
  }

  void setIsFavorite(bool value) {
    isFavorite = value;
  }

  void setFavoriteId(int id) {
    favoriteId = id;
  }

  Future<void> getDoctorById(String doctorId) async {
    doctorDetail = await doctorApi.getDoctorByIdApi(doctorId);
  }


  Future<void> getHospitalById(String id) async {
    hospital = await hospitalApi.getHospitalByIdApi(id);
  }

  Future<void> getAllCommentByDoctorId(String doctorId) async {

    comments = await doctorApi.getAllCommentByDoctorIdApi(doctorId);

  }

  void setWorkingDayDetailsCheck(List<WorkingDayDetail> workingDayDetails,int weekday) {
    workingDayDetailsCheck = [];
    for (var element in workingDayDetails) {
      if(element.date.isNotEmpty) {
        if(weekday == int.parse(element.date)) {
          workingDayDetailsCheck.add(element);
        }
      }
    }
  }

  void setCheck(bool value) {
    check = value;
  }

  void setListServiceCheck(Service service) {
    if(check) {
      listServiceCheck.remove(service);
    } else {
      listServiceCheck.add(service);
    }
  }

  void setScheduleWithDoctor(List<Schedule> schedules) {
    for (var element in schedules) {
      if(element.bookInformation.doctorId == doctorDetail!.id && element.bookInformation.status != "CANCEL") {
        scheduleWithDoctor = element;
      }
    }
  }

  void setSchedule(Schedule schedule) {
    scheduleWithDoctor = schedule;
  }

  void resetScheduleWithDoctor() {
    scheduleWithDoctor = null;
  }

  void resetScheduleWithHospital() {
    scheduleWithHospital = null;
  }
  
  void setDoctorFavorite(List<DoctorFavorite> favorites) {
    if(favorites.isNotEmpty) {
      for(var favorite in favorites) {
        if(favorite.doctor.id == doctorDetail!.id) {
          doctorFavorite = favorite;
          setFavoriteId(favorite.doctorFavouriteId);
        }
      }
    }
  }

  Future<int> createFavoriteDoctor(String doctorId, String userId) async {
    return await favoriteApi.createFavoriteDoctorApi(doctorId, userId);
  }

  Future<bool> deleteDoctorFavorite(String doctorFavoriteId) async {
    return await favoriteApi.deleteDoctorFavoriteApi(doctorFavoriteId);
  }

  changeFavoriteDoctor(String doctorId, String userId) async{

    if(isFavorite) {

      int responseId = await createFavoriteDoctor(doctorId, userId);

      setFavoriteId(responseId);

    } else {
      await deleteDoctorFavorite(favoriteId.toString());
    }

  }
  
  void checkFavorite() {
    
    if(doctorFavorite != null) {
      setIsFavorite(true);
    }
    
  }

  void resetDoctorFavorite() {
    doctorFavorite = null;
  }

}