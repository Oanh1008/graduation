
import 'package:care_bookie_app/models/comment_data.dart';
import 'package:care_bookie_app/view/pages/review_page/review_doctor_page/review_doctor_success.dart';
import 'package:care_bookie_app/view_model/history_detail_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:provider/provider.dart';
import '../../../../res/constants/colors.dart';
import '../../layouts_page/navbar_layout.dart';

class AddReviewDoctor extends StatefulWidget {
  const AddReviewDoctor({Key? key}) : super(key: key);

  @override
  State<AddReviewDoctor> createState() => _AddReviewDoctorState();
}

class _AddReviewDoctorState extends State<AddReviewDoctor> {
  final TextEditingController _controllerTextWord = TextEditingController();

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
        backgroundColor: ColorConstant.BackGroundColor,
        title: const Text(
          "Thêm đánh giá bác sỹ ",
          style: TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.w500,
            fontSize: 19,
            fontFamily: 'Poppins',
          ),
        ),
        leading: IconButton(
          icon: const Icon(
            IconlyBroken.arrowLeft,
            color: Colors.black,
            size: 30,
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        bottomOpacity: 0,
        elevation: 0,
      ),
      body: addYourComment(),
      bottomNavigationBar: bottomNavigatorBar(),
    );
  }

  Widget addYourComment() {

    final historyDetailPageViewModel = Provider.of<HistoryDetailPageViewModel>(context,listen: false);

    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: [
            const Center(
              child: Text(
                "Bao nhiêu sao nhỉ?",
                style: TextStyle(
                    fontSize: 18,
                    color: ColorConstant.BLueText,
                    fontWeight: FontWeight.w400,
                    fontFamily: 'Poppins'),
              ),
            ),
            Center(
              child: Padding(
                padding: const EdgeInsets.only(top: 20),
                child: RatingBar.builder(
                  initialRating: historyDetailPageViewModel.starDefaultDoctor.toDouble(),
                  minRating: 1,
                  direction: Axis.horizontal,
                  allowHalfRating: false,
                  itemCount: 5,
                  itemPadding: const EdgeInsets.symmetric(horizontal: 4.0),
                  itemBuilder: (context, _) => const Icon(
                    Icons.star,
                    color: Colors.amber,
                  ),
                  onRatingUpdate: (rating) {
                    historyDetailPageViewModel.setStarDefaultDoctor(rating.toInt());
                  },
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 50.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Nhận xét của bạn',
                  style: TextStyle(
                      fontSize: 20,
                      color: ColorConstant.BLueText,
                      fontWeight: FontWeight.w400,
                      fontFamily: 'Poppins'),
                ),
              ),
            ),
            Container(
              height: 450,
              padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
              decoration: BoxDecoration(
                color: ColorConstant.Grey00.withOpacity(0.25),
                borderRadius: BorderRadius.circular(30),
              ),
              child: TextFormField(
                controller: _controllerTextWord,
                maxLines: 100,
                //inputFormatters: [WhitelistingTextInputFormatter(RegExp("[a-zA-ZÀ-ỹ ]"))],
                //maxLength: 350,
                decoration: InputDecoration(
                    hintText: 'Thêm nhận xét của bạn...',
                    hintStyle: TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 18,
                        color: ColorConstant.Grey00.withOpacity(0.9))),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget bottomNavigatorBar() {
    return Container(
      height: 80,
      color: Colors.white,
      child: Column(
        children: [submit()],
      ),
    );
  }

  Widget submit() {
    
    final historyDetailPageViewModel = Provider.of<HistoryDetailPageViewModel>(context,listen: false);

    return Padding(
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
        child: Container(
          width: double.maxFinite,
          height: 70,
          decoration: BoxDecoration(
              color: ColorConstant.BackGroundColor,
              borderRadius: BorderRadius.circular(10)),
          child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                elevation: 5,
                backgroundColor: ColorConstant.BLueText,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              onPressed: () async{

                CommentData commentDoctor = CommentData(
                    comment:  _controllerTextWord.text,
                    id: historyDetailPageViewModel.historyDetail!.invoiceInformation.doctorId,
                    star: historyDetailPageViewModel.starDefaultDoctor,
                    userId: historyDetailPageViewModel.historyDetail!.invoiceInformation.userId
                );
                
                 bool isSuccess = await historyDetailPageViewModel.createCommentDoctorByUserId(commentDoctor);

                 if(isSuccess) {

                   Fluttertoast.showToast(
                       msg: "Đánh giá thành công",
                       toastLength: Toast.LENGTH_SHORT,
                       gravity: ToastGravity.CENTER,
                       timeInSecForIosWeb: 1,
                       backgroundColor: Colors.green,
                       textColor: Colors.white,
                       fontSize: 16.0
                   );

                   await historyDetailPageViewModel.getAllCommentByDoctorId(historyDetailPageViewModel.historyDetail!.invoiceInformation.doctorId);

                   // ignore: use_build_context_synchronously
                   Navigator.push(
                       context,
                       MaterialPageRoute(
                         builder: (context) => const ReviewDoctorSuccess(),
                       )
                   );
                 } else {
                   Fluttertoast.showToast(
                       msg: "Đánh giá không thành công",
                       toastLength: Toast.LENGTH_SHORT,
                       gravity: ToastGravity.CENTER,
                       timeInSecForIosWeb: 1,
                       backgroundColor: Colors.red,
                       textColor: Colors.white,
                       fontSize: 16.0
                   );
                 }


              },
              child: const Padding(
                padding: EdgeInsets.only(
                  top: 10,
                  bottom: 10,
                ),
                child: Text(
                  "Gửi nhận xét",
                  style: TextStyle(fontSize: 21, fontWeight: FontWeight.w600),
                ),
              )),
        ));
  }
}
