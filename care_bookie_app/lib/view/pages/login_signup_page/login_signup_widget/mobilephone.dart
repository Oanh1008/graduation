import 'package:flutter/material.dart';

class MobilePhone extends StatefulWidget {
  const MobilePhone({Key? key}) : super(key: key);

  @override
  State<MobilePhone> createState() => _MobilePhoneState();
}

class _MobilePhoneState extends State<MobilePhone> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(0, 20, 30, 0),
      width: 330,
      child: const TextField(
          style: TextStyle(color: Colors.black),
          decoration: InputDecoration(
            enabledBorder: UnderlineInputBorder(
                borderRadius: BorderRadius.all(
                  Radius.circular(0),
                )),
            label: Text("Phone number",
                style:
                TextStyle(color: Colors.black,
                fontFamily: 'Poppins')),
            hintText: "",
            hintStyle: TextStyle(
              color: Color.fromARGB(255, 94, 92, 88),
            ),
            prefixIcon: SizedBox(
              width: 0,
              child: Align(
                alignment: Alignment.centerLeft,
                child: Icon(
                  Icons.phone,
                  color: Colors.black,
                ),
              ),
            ),
          ),
        keyboardType: TextInputType.number,
      ),
    );
  }
}
