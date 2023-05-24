import 'package:flutter/material.dart';

import '../../../../res/constants/colors.dart';
class FavoriteInfos extends StatefulWidget {
  const FavoriteInfos({Key? key}) : super(key: key);

  @override
  State<FavoriteInfos> createState() => _FavoriteInfosState();
}

class _FavoriteInfosState extends State<FavoriteInfos> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Container(
          margin: const EdgeInsets.fromLTRB(35, 50, 35, 0),
          height: 150,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(37),
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.centerRight,
              //end: Alignment(0.9, 0.2),
              colors: <Color>[
                Color(0xFF237be5),
                Color(0xFF1e81e7),
                Color(0xFF1885ea),
                Color(0xFF1589ec),
                Color(0xFF118dee),
                Color(0xFF0e8eef),
                Color(0xFF0994f1),
                Color(0xFF0697f3),
              ],
            ),
            boxShadow: [
              BoxShadow(
                  color: const Color(0xFF0e8eef).withOpacity(0.5),
                  spreadRadius: 0.5,
                  blurRadius: 15,
                  offset: const Offset(0, 5))
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(50, 18.3, 0, 0),
          child: Image.asset(
            'assets/images/doctor.png',
            scale: 3.0,
          ),
        ),
        Container(
          width: 200,
          height: 140,
          // color: Colors.orange,
          margin: const EdgeInsets.fromLTRB(170, 60, 0, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                'Phòng tránh Covid 19',
                style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 19,
                    color: Colors.white,
                    fontFamily: 'Poppins'),
              ),
              Text(
                'Bảo vệ sức khỏe chính bạn và người thân khỏi Covid 19',
                style: TextStyle(
                    fontWeight: FontWeight.w400,
                    fontSize: 14,
                    color: ColorConstant.White00,
                    fontFamily: 'Poppins'),
              ),
            ],
          ),
        )
      ],
    );
  }
}
