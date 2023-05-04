package com.spring.carebookie.dto.response;

import java.util.List;

import com.spring.carebookie.entity.InvoiceEntity;
import com.spring.carebookie.entity.MedicineEntity;
import com.spring.carebookie.entity.ServiceBookEntity;
import com.spring.carebookie.entity.ServiceEntity;
import com.spring.carebookie.repository.projection.InvoiceMedicineAmountProjection;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponseDto {

    private Double totalPrice;

    private InvoiceEntity invoiceInformation;

    private List<ServiceEntity> services;

    private List<InvoiceMedicineAmountProjection> medicines;

    public InvoiceResponseDto(InvoiceEntity i, List<ServiceEntity> serviceInvoice, List<InvoiceMedicineAmountProjection> medicineInvoice) {
        this.invoiceInformation = i;
        this.services = serviceInvoice;
        this.medicines =  medicineInvoice;
    }
}
