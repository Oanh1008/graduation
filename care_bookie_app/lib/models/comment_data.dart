
class CommentData {

  final String comment;
  final String id;
  final int star;
  final String userId;

  CommentData({
    required this.comment,
    required this.id,
    required this.star,
    required this.userId
  });

  Map<String,dynamic> toJsonWithDoctor() => {
   'comment' : comment,
    'doctorId' : id,
    'star' : star,
    'userId' : userId
  };

  Map<String,dynamic> toJsonWithHospital() => {
    'comment' : comment,
    'hospitalId' : id,
    'star' : star,
    'userId' : userId
  };

}