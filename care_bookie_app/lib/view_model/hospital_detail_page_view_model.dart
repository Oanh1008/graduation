
import 'package:care_bookie_app/api_services/favorite_api.dart';
import 'package:care_bookie_app/api_services/hospital_api.dart';
import 'package:care_bookie_app/models/favorite.dart';
import 'package:care_bookie_app/models/schedule.dart';
import 'package:flutter/material.dart';

import '../api_services/doctor_api.dart';
import '../models/comment.dart';
import '../models/doctor.dart';
import '../models/hospital.dart';
import '../models/service.dart';
import '../models/working_day_detail.dart';

class HospitalDetailPageViewModel extends ChangeNotifier {

  DoctorApi doctorApi = DoctorApi();

  FavoriteApi favoriteApi = FavoriteApi();

  HospitalApi hospitalApi = HospitalApi();

  Hospital? hospitalDetail;

  List<Doctor> doctors = [];

  List<Comment> comments = [];

  List<WorkingDayDetail> workingDayDetailsCheck = [];

  List<Service> listServiceCheck = [];

  bool check = false;

  Schedule? scheduleWithHospital;

  bool isFavorite = false;

  int? favoriteId;

  HospitalFavorite? hospitalFavorite;

  bool isFavoritePage = false;

  void resetListServiceCheck() {
    listServiceCheck = [];
  }

  void setIsFavorite(bool value) {
    isFavorite = value;
  }

  void resetScheduleWithHospital() {
    scheduleWithHospital = null;
  }

  void setHospitalDetail(Hospital hospital) {
    hospitalDetail = hospital;
  }

  Future<void> getHospitalById(String id) async {
    hospitalDetail = await hospitalApi.getHospitalByIdApi(id);
  }

  Future<void> getAllDoctorByHospitalId(String hospitalId) async {

    doctors = await doctorApi.getAllDoctorByHospitalIdApi(hospitalId);

  }

  Future<void> getAllCommentByHospitalId(String hospitalId) async {

    comments = await hospitalApi.getAllCommentByHospitalIdApi(hospitalId);

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

  void setFavoriteId(int id) {
    favoriteId = id;
  }

  void setListServiceCheck(Service service) {
    if(check) {
      listServiceCheck.remove(service);
    } else {
      listServiceCheck.add(service);
    }
  }

  void setScheduleWithHospital(List<Schedule> schedules) {
    for (var element in schedules) {
      if(element.bookInformation.hospitalId == hospitalDetail!.id && element.bookInformation.status != "CANCEL") {
        scheduleWithHospital = element;
      }
    }
  }

  Future<int> createFavoriteHospital(String hospitalId, String userId) async {
    return await favoriteApi.createFavoriteHospitalApi(hospitalId, userId);
  }

  Future<bool> deleteHospitalFavorite(String hospitalFavoriteId) async {
    return await favoriteApi.deleteHospitalFavoriteApi(hospitalFavoriteId);
  }

  changeFavoriteHospital(String hospitalId, String userId) async{

    if(isFavorite) {

      int responseId = await createFavoriteHospital(hospitalId, userId);

      setFavoriteId(responseId);

    } else {

      await deleteHospitalFavorite(favoriteId.toString());

    }

  }

  void resetHospitalFavorite() {
    hospitalFavorite = null;
  }

  void resetIsFavoritePage() {
    isFavoritePage = false;
  }

  void checkFavorite() {

    if(hospitalFavorite != null) {
      setIsFavorite(true);
    }

  }

  void setIsFavoritePage(bool value){
    isFavoritePage = value;
  }

  void setHospitalFavorite(List<HospitalFavorite> favorites) {
    if(favorites.isNotEmpty) {
      for(var favorite in favorites) {
        if(favorite.hospital.id == hospitalDetail!.id) {
          hospitalFavorite = favorite;
          setFavoriteId(favorite.hospitalFavouriteId);
        }
      }
    }
  }


}