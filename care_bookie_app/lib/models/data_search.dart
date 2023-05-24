
class DataSearch {

  final List<HospitalSearch> hospitals;
  final List<DoctorSearch> doctors;

  DataSearch({
    required this.doctors,
    required this.hospitals
  });

  factory DataSearch.fromJson(Map<String,dynamic> json) {

    List<HospitalSearch> hospitals = [];

    List<DoctorSearch> doctors = [];

    List dataDoctorJson = json['doctors'];

    doctors = dataDoctorJson.map((e) => DoctorSearch.fromJson(e)).toList();

    List dataHospitalJson = json['hospitals'];

    hospitals = dataHospitalJson.map((e) => HospitalSearch.fromJson(e)).toList();

    return DataSearch(
        doctors: doctors,
        hospitals: hospitals
    );

  }

}

class HospitalSearch {

  final String hospitalId;
  final String hospitalName;
  final String imageUrl;
  final num star;
  final String address;

  HospitalSearch({
    required this.hospitalId,
    required this.hospitalName,
    required this.star,
    required this.address,
    required this.imageUrl,
  });

  factory HospitalSearch.fromJson(Map<String,dynamic> json) {

    return HospitalSearch(
        hospitalId: json['hospitalId'],
        hospitalName: json['hospitalName'],
        star: json['star'] ?? 0,
        address: json['address'],
        imageUrl: json['imageUrl']
    );

  }

}

class DoctorSearch {

  final String doctorId;
  final String doctorName;
  final String imageUrl;
  final String speciality;


  DoctorSearch({
    required this.imageUrl,
    required this.speciality,
    required this.doctorId,
    required this.doctorName
  });

  factory DoctorSearch.fromJson(Map<String,dynamic> json) {

    return DoctorSearch(
        imageUrl: json['imageUrl'] ?? "https://thumbs.dreamstime.com/b/generic-person-gray-photo-placeholder-man-silhouette-white-background-144511705.jpg",
        speciality: json['speciality'] ?? "",
        doctorId: json['doctorId'] ?? "",
        doctorName: json['doctorName'] ?? ""
    );

  }

}