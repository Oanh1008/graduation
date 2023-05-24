import 'package:care_bookie_app/view/pages/history_page/history_detail_invoice.dart';
import 'package:care_bookie_app/view_model/history_detail_page_view_model.dart';
import 'package:care_bookie_app/view_model/history_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../models/history.dart';
import '../../../res/constants/colors.dart';
import '../schedule/schedule_detail_cancel.dart';

class HistorylistClinics extends StatefulWidget {
  const HistorylistClinics({Key? key}) : super(key: key);

  @override
  State<HistorylistClinics> createState() => _HistorylistClinicsState();
}

class _HistorylistClinicsState extends State<HistorylistClinics> {
  @override
  Widget build(BuildContext context) {
    final historyPageViewModel =
        Provider.of<HistoryPageViewModel>(context, listen: false);

    return Padding(
      padding: const EdgeInsets.only(bottom: 110.0),
      child: Column(
        children: [
          ...historyPageViewModel.histories.map((history) => Padding(
                padding: const EdgeInsets.fromLTRB(20, 10, 0, 5),
                child: containerHistoryFinish(history),
              ))
        ],
      ),
    );
  }

  Widget containerHistoryFinish(History history) {
    return Container(
        margin: const EdgeInsets.only(right: 15, bottom: 0),
        height: 120,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(27),
          color: Colors.white,
          boxShadow: [
            BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 0,
                blurRadius: 7,
                offset: const Offset(0, 10))
          ],
        ),
        child: TextButton(
          style: ButtonStyle(
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20.0),
              ),
            ),
          ),
          onPressed: () {
            final historyDetailPageViewModel =
                Provider.of<HistoryDetailPageViewModel>(context, listen: false);

            historyDetailPageViewModel.setHistoryDetail(history);

            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const HistoryDetailInvoice()));
          },
          child: Stack(
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(5, 5, 0, 5),
                child: Row(
                  //mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    ClipRRect(
                        borderRadius: BorderRadius.circular(30),
                        child: Image.network(
                          history.hospitalImage,
                          scale: 2,
                          fit: BoxFit.cover,
                          width: 120,
                          height: 150,
                        )),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(15, 5, 0, 0),
                      child: Column(
                        children: [
                          SizedBox(
                              width: 190,
                              //height: 40,
                              //color: Colors.grey,
                              child: Text(history.hospitalName,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                      fontSize: 15,
                                      color: Color(0xff1c335b),
                                      fontWeight: FontWeight.w600,
                                      fontFamily: 'Merriweather Sans '))),
                          const SizedBox(
                            height: 3,
                          ),
                          Expanded(
                            flex: 1,
                            child: SizedBox(
                                width: 190,
                                //height: 40,
                                //color: Colors.grey,
                                child: Text(history.address,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
                                        height: 1,
                                        fontSize: 13,
                                        color: ColorConstant.Grey01,
                                        fontWeight: FontWeight.w400,
                                        fontFamily: 'Merriweather Sans'))),
                          ),
                          Expanded(
                            flex: 2,
                            child: Container(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 0),
                              width: 210,
                              //color: Colors.black,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  const Icon(
                                    Icons.star,
                                    size: 19,
                                    color: Colors.amber,
                                  ),
                                  const SizedBox(
                                    width: 5,
                                  ),
                                  Text("${history.star}",
                                      style: const TextStyle(
                                          height: 0.9,
                                          fontSize: 15,
                                          color: ColorConstant.Grey01,
                                          fontWeight: FontWeight.w500,
                                          fontFamily: 'Merriweather Sans')),
                                  Container(
                                    margin: const EdgeInsets.only(
                                        left: 30, right: 10),
                                    child: const Text("| ",
                                        style: TextStyle(
                                            height: 0.8,
                                            fontSize: 18,
                                            letterSpacing: 0.1,
                                            color: ColorConstant.Grey01,
                                            fontWeight: FontWeight.w500,
                                            fontFamily: 'Merriweather Sans')),
                                  ),
                                  const Text("Chi tiết",
                                      style: TextStyle(
                                          fontSize: 13,
                                          letterSpacing: 0.1,
                                          color: ColorConstant.BLueText,
                                          fontWeight: FontWeight.w500,
                                          fontFamily: 'Merriweather Sans'))
                                ],
                              ),
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                ),
              ),
              Positioned(
                  top: 75,
                  left: 287,
                  right: 15,
                  bottom: 0,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.transparent,
                      borderRadius: BorderRadius.circular(30),
                    ),
                    child: const Text(
                      "Hoàn tất",
                      style: TextStyle(
                          color: Colors.grey, fontWeight: FontWeight.bold),
                    ),
                  )),
            ],
          ),
        ));
  }

// Widget contentHistory() {
//    return Padding(
//      padding: const EdgeInsets.fromLTRB(5, 5, 0, 5),
//      child: Row(
//        //mainAxisAlignment: MainAxisAlignment.spaceBetween,
//        crossAxisAlignment: CrossAxisAlignment.end,
//        children: [
//          ClipRRect(
//              borderRadius: BorderRadius.circular(30),
//              child: Image.asset("assets/images/cisdemo.png",
//                scale: 2,
//                fit: BoxFit.cover,
//              )
//          ),
//          Padding(
//            padding: const EdgeInsets.fromLTRB(15, 5, 0, 0),
//            child: Column(
//              children: [
//                const SizedBox(
//                    width: 190,
//                    //height: 40,
//                    //color: Colors.grey,
//                    child: Text("Supporting the CIS",
//                        maxLines: 2,
//                        overflow: TextOverflow.ellipsis,
//                        style: TextStyle(
//                            fontSize: 18,
//                            color: Color(0xff1c335b),
//                            fontWeight: FontWeight.w600,
//                            fontFamily: 'Merriweather Sans '))),
//                const SizedBox(
//                  height: 3,
//                ),
//                const Expanded(
//                  flex: 1,
//                  child: SizedBox(
//                      width: 190,
//                      //height: 40,
//                      //color: Colors.grey,
//                      child: Text("15A/21 Nguyen Van Duong",
//                          maxLines: 2,
//                          overflow: TextOverflow.ellipsis,
//                          style: TextStyle(
//                              height: 1,
//                              fontSize: 15,
//                              color: ColorConstant.Grey01,
//                              fontWeight: FontWeight.w400,
//                              fontFamily: 'Merriweather Sans'))),
//                ),
//                Expanded(
//                  flex: 2,
//                  child: Container(
//                    padding: const EdgeInsets.symmetric(horizontal: 0),
//                    width: 210,
//                    //color: Colors.black,
//                    child: Row(
//                      mainAxisAlignment: MainAxisAlignment.start,
//                      //textBaseline: TextBaseline.alphabetic,
//                      children: [
//                        const Icon(
//                          Icons.star,
//                          size: 19,
//                          color: Colors.amber,
//                        ),
//                        const SizedBox(
//                          width: 5,
//                        ),
//                        const Text("4.5",
//                            style: TextStyle(
//                                height: 0.9,
//                                fontSize: 15,
//                                color: ColorConstant.Grey01,
//                                fontWeight: FontWeight.w500,
//                                fontFamily: 'Merriweather Sans')),
//                        RichText(
//                            text: const TextSpan(children: [
//                              WidgetSpan(
//                                  child: Padding(
//                                    padding: EdgeInsets.only(left: 15),
//                                    child: Text("10.00 AM ",
//                                        style: TextStyle(
//                                            letterSpacing: 0.2,
//                                            fontSize: 15,
//                                            color: ColorConstant.Grey01,
//                                            fontWeight: FontWeight.w500,
//                                            fontFamily: 'Merriweather Sans')),
//                                  )),
//                            ])),
//                        const Text("| ",
//                            style: TextStyle(
//                                height: 0.8,
//                                fontSize: 18,
//                                letterSpacing: 0.1,
//                                color: ColorConstant.Grey01,
//                                fontWeight: FontWeight.w500,
//                                fontFamily: 'Merriweather Sans')),
//                        const Text("Chi tiết",
//                            style: TextStyle(
//                                fontSize: 13,
//                                letterSpacing: 0.1,
//                                color: ColorConstant.BLueText,
//                                fontWeight: FontWeight.w500,
//                                fontFamily: 'Merriweather Sans'))
//                      ],
//                    ),
//                  ),
//                )
//              ],
//            ),
//          )
//        ],
//      ),
//    );
//  }
}
