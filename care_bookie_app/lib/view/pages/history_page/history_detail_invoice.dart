import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:provider/provider.dart';
import 'package:care_bookie_app/utils/date_utils.dart' as date_util;
import '../../../res/constants/colors.dart';
import '../../../view_model/history_detail_page_view_model.dart';
import '../review_page/review_clinic_page/add_review_clinic.dart';
import '../review_page/review_doctor_page/add_review_doctor.dart';

class HistoryDetailInvoice extends StatefulWidget {
  const HistoryDetailInvoice({Key? key}) : super(key: key);

  @override
  State<HistoryDetailInvoice> createState() => _HistoryDetailInvoiceState();
}

class _HistoryDetailInvoiceState extends State<HistoryDetailInvoice> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: ColorConstant.BackGroundColor,
        appBar: AppBar(
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(10),
            ),
          ),
          backgroundColor: Colors.grey,
          title: const Center(
            child: Text(
              "Lịch sử khám bệnh",
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w600,
                fontSize: 22,
              ),
            ),
          ),
          leading: IconButton(
            icon: const Icon(
              IconlyBroken.arrowLeft,
              color: Colors.white,
              size: 30,
            ),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
          shadowColor: Colors.white,
        ),
        body: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              children: [
                infoOrderDetail(),
                symptom(),
                diagnose(),
                noteFromDoctor(),
                contentNoteDrug(),
                price(),
                const SizedBox(
                  height: 30,
                )
              ],
            )),
        bottomNavigationBar: bottomNavigatorBar());
  }

  Widget infoOrderDetail() {
    final historyDetailPageViewModel =
        Provider.of<HistoryDetailPageViewModel>(context, listen: false);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 10),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Trung tâm khám bệnh",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              Expanded(
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                      historyDetailPageViewModel.historyDetail!.hospitalName,
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 15,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Bác sỹ điều trị",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                      historyDetailPageViewModel.historyDetail!.doctorName,
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 15,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Thời gian",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 140,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                      date_util.DateUtils.convertDateTime(
                          historyDetailPageViewModel.historyDetail!
                              .invoiceInformation.dateTimeInvoice),
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 15,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Bệnh nhân điều trị",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                      historyDetailPageViewModel.historyDetail!.fullNameBook,
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Tuổi",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                      "${historyDetailPageViewModel.historyDetail!.ageBook}",
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Giới tính",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(historyDetailPageViewModel.historyDetail!.gender,
                      maxLines: 2,
                      style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text("Chia sẻ lịch sử",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
              SizedBox(
                width: 200,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text("Có",
                      maxLines: 2,
                      style: TextStyle(
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                          fontSize: 17,
                          overflow: TextOverflow.ellipsis)),
                ),
              ),
            ],
          ),
          const Divider(
            height: 30,
            color: Colors.grey,
            thickness: 0.25,
          ),
        ],
      ),
    );
  }

  Widget symptom() {
    final historyDetailPageViewModel =
        Provider.of<HistoryDetailPageViewModel>(context, listen: false);

    return Column(
      children: [
        Row(
          children: const [
            Padding(
              padding: EdgeInsets.only(left: 8.0),
              child: Text("Mô tả triệu chứng",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
            ),
          ],
        ),
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 10),
          width: double.maxFinite,
          decoration: BoxDecoration(
              //color: Colors.white,
              borderRadius: BorderRadius.circular(25),
              border:
                  Border.all(color: CupertinoColors.systemGrey3, width: 0.5)),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                  historyDetailPageViewModel
                      .historyDetail!.invoiceInformation.symptomDetail,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    color: Colors.black54,
                    height: 1.4,
                    fontSize: 17,
                  )),
            ),
          ),
        ),
      ],
    );
  }

  Widget diagnose() {
    final historyDetailPageViewModel =
        Provider.of<HistoryDetailPageViewModel>(context, listen: false);

    return Column(
      children: [
        Row(
          children: const [
            Padding(
              padding: EdgeInsets.only(left: 8.0),
              child: Text("Chuẩn đoán từ Bác sỹ",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
            ),
          ],
        ),
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 10),
          width: double.maxFinite,
          decoration: BoxDecoration(
              //color: Colors.white,
              borderRadius: BorderRadius.circular(25),
              border:
                  Border.all(color: CupertinoColors.systemGrey3, width: 0.5)),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                  historyDetailPageViewModel
                      .historyDetail!.invoiceInformation.diagnose,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    color: Colors.black54,
                    height: 1.4,
                    fontSize: 17,
                  )),
            ),
          ),
        ),
        const Divider(
          height: 10,
          color: Colors.transparent,
          thickness: 0.5,
        ),
      ],
    );
  }

  Widget noteFromDoctor() {
    final historyDetailPageViewModel =
        Provider.of<HistoryDetailPageViewModel>(context, listen: false);

    return Column(
      children: [

        Row(
          children: const [
            Padding(
              padding: EdgeInsets.only(left: 8.0),
              child: Text("Dặn dò từ Bác sỹ",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
            ),
          ],
        ),
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 10),
          width: double.maxFinite,
          decoration: BoxDecoration(
              //color: Colors.white,
              borderRadius: BorderRadius.circular(25),
              border:
                  Border.all(color: CupertinoColors.systemGrey3, width: 0.5)),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                  historyDetailPageViewModel
                      .historyDetail!.invoiceInformation.advices,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    color: Colors.black54,
                    height: 1.4,
                    fontSize: 17,
                  )),
            ),
          ),
        ),
        const Divider(
          height: 30,
          color: Colors.transparent,
          thickness: 0.25,
        ),
      ],
    );
  }

  Widget contentNoteDrug() {
    final historyDetailPageViewModel =
        Provider.of<HistoryDetailPageViewModel>(context, listen: false);

    return Container(
      margin: const EdgeInsets.fromLTRB(10, 0, 10, 10),
      padding: const EdgeInsets.fromLTRB(10, 10, 10, 10),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          border: Border.all(width: 1.0, color: ColorConstant.Grey01)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text("Đơn thuốc",
              style: TextStyle(
                  fontWeight: FontWeight.w500,
                  fontSize: 20,
                  overflow: TextOverflow.visible)),
          ...historyDetailPageViewModel.historyDetail!.medicines
              .map((e) => Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(
                          width: 130,
                          child: Text(e.medicineName,
                              maxLines: 3,
                              style: const TextStyle(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 18,
                                  overflow: TextOverflow.visible)),
                        ),
                        SizedBox(
                          width: 50,
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                                "${e.amount} ${e.medicineUnit}",
                                maxLines: 2,
                                style: const TextStyle(
                                    fontWeight: FontWeight.w500,
                                    color: Colors.black54,
                                    fontSize: 17,
                                    overflow: TextOverflow.ellipsis)),
                          ),
                        ),
                        SizedBox(
                          width: 150,
                          child: Align(
                            alignment: Alignment.centerRight,
                            child: Text(
                                "${e.medicinePrice.toInt()}.000đ",
                                maxLines: 2,
                                style: const TextStyle(
                                    fontWeight: FontWeight.w500,
                                    color: Colors.amber,
                                    fontSize: 17,
                                    overflow: TextOverflow.ellipsis)),
                          ),
                        ),
                      ],
                    ),
                  ))
        ],
      ),
    );
  }

  Widget price() {
    final historyDetailPageViewModel =
    Provider.of<HistoryDetailPageViewModel>(context, listen: false);

    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Padding(
              padding: EdgeInsets.only(left: 8.0),
              child: Text("Dịch vụ",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
            ),
          ],
        ),
        ...historyDetailPageViewModel.historyDetail!.services.map((e) => Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 10, 0, 0),
              child: SizedBox(
                width: 190,
                child: Text(e.serviceName,
                    style: const TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 18,
                        overflow: TextOverflow.visible)),
              ),
            ),
            SizedBox(
              width: 200,
              child: Align(
                alignment: Alignment.centerRight,
                child: Text("${e.price.toInt()}.000đ",
                    maxLines: 2,
                    style: const TextStyle(
                        fontWeight: FontWeight.w500,
                        color: Colors.amber,
                        fontSize: 17,
                        overflow: TextOverflow.ellipsis)),
              ),
            ),
          ],
        )),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Padding(
              padding: EdgeInsets.only(left: 8.0, top: 10),
              child: Text("Giảm giá bảo hiểm",
                  style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
            ),
            Text("${historyDetailPageViewModel
                .historyDetail!.invoiceInformation.discountInsurance} %",
                maxLines: 2,
                style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    color: Colors.amber,
                    fontSize: 17,
                    overflow: TextOverflow.ellipsis))
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Padding(
              padding: EdgeInsets.only(left: 8.0, top: 10),
              child: Text("Tổng tiền",
                  style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 18,
                      overflow: TextOverflow.visible)),
            ),
            Text("${historyDetailPageViewModel.historyDetail!.totalPrice}00đ",
                maxLines: 2,
                style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    color: Colors.amber,
                    fontSize: 17,
                    overflow: TextOverflow.ellipsis))
          ],
        ),
        const Divider(
          height: 30,
          color: Colors.grey,
          thickness: 0.25,
        ),
      ],
    );
  }

  Widget bottomNavigatorBar() {
    return Container(
      height: 130,
      color: Colors.white,
      child: Column(
        children: [
          notifyReview(),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [reviewDoctor(), reviewClinic()],
          )
        ],
      ),
    );
  }

  Widget notifyReview() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(10, 0, 20, 10),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: const [
          Padding(
            padding: EdgeInsets.fromLTRB(0, 5, 0, 0),
            child: SizedBox(
              height: 50,
              width: 320,
              child: Align(
                alignment: Alignment.center,
                child: Text(
                    "Vui lòng thêm nhận xét của bạn về bác sỹ và dịch vụ phòng khám",
                    style: TextStyle(fontSize: 17, color: Colors.grey)),
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget reviewDoctor() {
    return Container(
      width: 160,
      height: 60,
      decoration: BoxDecoration(
          border: Border.all(width: 1, color: Colors.transparent),
          borderRadius: BorderRadius.circular(15)),
      child: ElevatedButton(
        onPressed: () {
          Navigator.push(context,
              MaterialPageRoute(builder: (context) => const AddReviewDoctor()));
        },
        style: ElevatedButton.styleFrom(
          primary: Colors.white,
          elevation: 1,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: const [
                Text(
                  "Đánh giá",
                  style: TextStyle(
                      fontSize: 15,
                      color: Colors.amber,
                      fontWeight: FontWeight.w600),
                ),
                Text(
                  "bác sỹ",
                  style: TextStyle(
                      fontSize: 16,
                      color: Colors.amber,
                      fontWeight: FontWeight.w600),
                ),
              ],
            ),
            const Icon(
              IconlyBold.editSquare,
              color: Colors.amber,
              size: 25,
            )
          ],
        ),
      ),
    );
  }

  Widget reviewClinic() {
    return Container(
      margin: const EdgeInsets.fromLTRB(10, 0, 0, 0),
      width: 160,
      height: 60,
      decoration: BoxDecoration(
          border: Border.all(width: 1, color: Colors.transparent),
          borderRadius: BorderRadius.circular(15)),
      child: ElevatedButton(
        onPressed: () {
          Navigator.push(context,
              MaterialPageRoute(builder: (context) => const AddReviewClinic()));
        },
        style: ElevatedButton.styleFrom(
          primary: Colors.white,
          elevation: 1,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: const [
                Text(
                  "Đánh giá",
                  style: TextStyle(
                      fontSize: 15,
                      color: Colors.amber,
                      fontWeight: FontWeight.w600),
                ),
                Text(
                  "phòng khám",
                  style: TextStyle(
                      fontSize: 16,
                      color: Colors.amber,
                      fontWeight: FontWeight.w600),
                ),
              ],
            ),
            const Icon(
              IconlyBold.editSquare,
              color: Colors.amber,
              size: 25,
            )
          ],
        ),
      ),
    );
  }
}
