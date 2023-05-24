
import 'package:care_bookie_app/models/doctor.dart';
import 'package:care_bookie_app/models/hospital.dart';

class DoctorFavorite {

  final int doctorFavouriteId;
  final Doctor doctor;

  DoctorFavorite({
    required this.doctorFavouriteId,
    required this.doctor
  });

  factory DoctorFavorite.fromJson(Map<String,dynamic> json) {

    Doctor doctor = Doctor.fromJson(json['doctor']);

    return DoctorFavorite(
        doctorFavouriteId: json['doctorFavouriteId'],
        doctor: doctor
    );

  }
}

class HospitalFavorite {

  final int hospitalFavouriteId;
  final Hospital hospital;

  HospitalFavorite({
    required this.hospital,
    required this.hospitalFavouriteId
  });

  factory HospitalFavorite.fromJson(Map<String,dynamic> json) {

    Hospital hospital = Hospital.fromJson(json['hospital']);

    return HospitalFavorite(
        hospital: hospital,
        hospitalFavouriteId: json['hospitalFavouriteId']
    );

  }
}
