
class WorkingDayDetail {

  final String date;
  final String session;
  final String startHour;
  final String endHour;
  final String hospitalId;

  WorkingDayDetail({
    required this.date,
    required this.session,
    required this.startHour,
    required this.endHour,
    required this.hospitalId
  });

  factory WorkingDayDetail.fromJson(Map<String,dynamic> json) {

    return WorkingDayDetail(
        date: json['date'] ?? "",
        session: json['session'],
        startHour: json['startHour'] ?? "",
        endHour: json['endHour'] ?? "",
        hospitalId: json['hospitalId']
    );

  }

}