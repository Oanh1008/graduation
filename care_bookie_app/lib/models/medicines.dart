
class Medicine {

  final int amount;
  final num medicinePrice;
  final String medicineName;
  final String medicineUnit;

  Medicine({
    required this.amount,
    required this.medicinePrice,
    required this.medicineName,
    required this.medicineUnit
  });

  factory Medicine.fromJson(Map<String,dynamic> json) {

    return Medicine(
        amount: json['amount'],
        medicinePrice: json['medicinePrice'],
        medicineName: json['medicineName'],
        medicineUnit: json['medicineUnit']
    );

  }

}