
import 'package:care_bookie_app/api_services/favorite_api.dart';
import 'package:flutter/cupertino.dart';

import '../models/favorite.dart';

class FavoritePageViewModel extends ChangeNotifier {

  FavoriteApi favoriteApi = FavoriteApi();

  List<DoctorFavorite> listDoctorFavorite = [];

  List<HospitalFavorite> listHospitalFavorite = [];

  Future<void> getAllDoctorFavoriteByUserId(String userId) async {
    if(listDoctorFavorite.isEmpty) {
      listDoctorFavorite = await favoriteApi.getAllDoctorFavoriteByUserIdApi(userId);
    }
  }

  void resetListDoctorFavorite() {
    listDoctorFavorite = [];
  }

  void resetListHospitalFavorite() {
    listHospitalFavorite = [];
  }

  Future<void> getAllHospitalFavoriteByUserId(String userId) async {
    if(listHospitalFavorite.isEmpty) {
      listHospitalFavorite = await favoriteApi.getAllHospitalFavoriteByUserIdApi(userId);
    }
  }

  Future<void> deleteDoctorFavorite(String doctorFavoriteId,DoctorFavorite doctorFavorite) async{

    bool isSuccess = await favoriteApi.deleteDoctorFavoriteApi(doctorFavoriteId);

    if(isSuccess) {
      listDoctorFavorite.remove(doctorFavorite);
    }

  }

  Future<void> deleteHospitalFavorite(String hospitalFavoriteId,HospitalFavorite hospitalFavorite) async{

    bool isSuccess = await favoriteApi.deleteHospitalFavoriteApi(hospitalFavoriteId);

    if(isSuccess) {
      listHospitalFavorite.remove(hospitalFavorite);
    }

  }


}