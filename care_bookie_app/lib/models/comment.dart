
class Comment {

  final String content;
  final String fullName;
  final String image;
  final num star;
  final String dateTime;

  Comment({
    required this.content,
    required this.fullName,
    required this.image,
    required this.star,
    required this.dateTime
  });

  factory Comment.fromJson(Map<String,dynamic> json) {

    return Comment(
        content: json['comment'],
        fullName: json['fullName'],
        image: json['imageUrl'],
        star: json['star'],
        dateTime: json['dateTime']
    );

  }




}