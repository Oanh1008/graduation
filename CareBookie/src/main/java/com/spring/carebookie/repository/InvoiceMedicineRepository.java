package com.spring.carebookie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.spring.carebookie.entity.InvoiceMedicineEntity;
import com.spring.carebookie.repository.projection.InvoiceMedicineAmountProjection;

public interface InvoiceMedicineRepository extends JpaRepository<InvoiceMedicineEntity,Long> {

    @Modifying
    @Query("delete from InvoiceMedicineEntity i where i.invoiceId = ?1 and i.medicineId = ?2")
    void deleteByInvoiceIdAndMedicineId(Long invoiceId, Long medicineId);

}
