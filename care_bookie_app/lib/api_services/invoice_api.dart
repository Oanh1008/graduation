
import 'dart:convert';

import 'package:care_bookie_app/models/invoice_data.dart';
import 'package:http/http.dart' as http;

import '../utils/host_util.dart';

class InvoiceApi {

  Future<bool> createInvoiceApi(InvoiceData invoiceData) async {

    String url = "${HostUtil.host}api/v1/care-bookie/user/book";

    Map<String,String> headers = { 'content-type' : 'application/json' };

    var response = await http.post(Uri.parse(url),headers: headers,body: jsonEncode(invoiceData.toJson()));

    if(response.statusCode == 200) {

      print("CREATE SUCCESS : ${jsonDecode(response.body)}");

      return true;

    } else {

      return false;

    }

  }

}