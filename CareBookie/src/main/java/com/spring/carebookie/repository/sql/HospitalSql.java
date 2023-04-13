package com.spring.carebookie.repository.sql;

public class HospitalSql {

    private HospitalSql() {
    }
    
    public static final String GET_ALL_HOSPITAL = 
            " WITH hospital_star AS (" +
            "       SELECT hospital_id, AVG(star) star" +
            "       FROM rating_hospital" +
            "       GROUP BY hospital_id" +
            " ) \n" +
            " SELECT h.hospital_id hospitalId,\n" +
            "        h.hospital_name hospitalName,\n" +
            "        h.phone_number phoneNumber,\n" +
            "        h.address,\n" +
            "        h.district,\n" +
            "        h.price,\n" +
            "        h.logo_key logoKey,\n" +
            "        h.working_time_from workingTimeFrom,\n" +
            "        h.working_time_to workingTimeTo,\n" +
            "        h.period_working_day_from periodWorkingDayFrom,\n" +
            "        h.period_working_day_to periodWorkingDayTo, \n" +
            "        hs.star, \n" +
            "        CONCAT(u.first_name,' ',u.last_name) 'adminName', \n" +
            "        u.user_id adminId " +
            " FROM hospital h" +
            " LEFT JOIN hospital_star  hs ON h.hospital_id = hs.hospital_id" +
            " LEFT JOIN user u on h.admin_id = u.user_id;";
}
