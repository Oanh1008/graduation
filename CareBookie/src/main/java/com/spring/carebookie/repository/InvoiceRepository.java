package com.spring.carebookie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.carebookie.entity.InvoiceEntity;
import com.spring.carebookie.entity.ServiceEntity;
import com.spring.carebookie.repository.projection.InvoiceMedicineAmountProjection;
import com.spring.carebookie.repository.projection.TotalInvoiceProjection;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long> {

    @Query(value = "select  s \n" +
            "from InvoiceEntity i \n" +
            "left join InvoiceServiceEntity iser on i.id = iser.invoiceId \n" +
            "join ServiceEntity s on iser.serviceId = s.id \n" +
            "where i.id = :invoiceId")
    List<ServiceEntity> getAllServiceByInvoiceId(Long invoiceId);

    @Query(value = "select  me, ime.amount \n" +
            "from InvoiceEntity i \n" +
            "left join InvoiceMedicineEntity ime on i.id = ime.invoiceId \n" +
            "join MedicineEntity me on ime.medicineId = me.id \n" +
            "where i.id = :invoiceId")
    List<InvoiceMedicineAmountProjection> getAllMedicineByInvoiceId(Long invoiceId);


    @Query("select i from InvoiceEntity i where i.userId = ?1")
    List<InvoiceEntity> getALlByUserId(String userId);

    @Query(value = "select i.id, sum(s.price) price\n" +
            "from invoice i\n" +
            "left join invoice_service ise on i.id = ise.invoice_id\n" +
            "left join service s on ise.service_id = s.id\n" +
            "group by i.id", nativeQuery = true)
    List<TotalInvoiceProjection> getTotalByService();

    @Query(value = "select i.id , sum(s.medicine_price) price\n" +
            "from invoice i\n" +
            "left join invoice_medicine ise on i.id = ise.invoice_id\n" +
            "left join medicine s on ise.medicine_id = s.id\n" +
            "group by i.id", nativeQuery = true)
    List<TotalInvoiceProjection> getTotalByMedicine();
}
