package com.spring.carebookie.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.amazonaws.services.dynamodbv2.xspec.M;
import com.spring.carebookie.dto.response.InvoiceResponseDto;
import com.spring.carebookie.dto.response.UserInvoiceResponse;
import com.spring.carebookie.entity.BookEntity;
import com.spring.carebookie.entity.HospitalEntity;
import com.spring.carebookie.entity.InvoiceEntity;
import com.spring.carebookie.entity.ServiceEntity;
import com.spring.carebookie.entity.UserEntity;
import com.spring.carebookie.exception.ResourceNotFoundException;
import com.spring.carebookie.repository.BookRepository;
import com.spring.carebookie.repository.HospitalRepository;
import com.spring.carebookie.repository.InvoiceRepository;
import com.spring.carebookie.repository.UserRepository;
import com.spring.carebookie.repository.projection.InvoiceMedicineAmountProjection;
import com.spring.carebookie.repository.projection.TotalInvoiceProjection;

import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    private final HospitalRepository hospitalRepository;

    private final UserRepository userRepository;

    private final CommonService commonService;

    private final BookRepository bookRepository;

    public List<InvoiceResponseDto> getAllInvoiceByHospitalId(String hospitalId) {
        List<InvoiceEntity> invoices = invoiceRepository.getALlByHospitalId(hospitalId);
        return getInvoiceByIdCommon(invoices);
    }

    public List<InvoiceResponseDto> getAllInvoiceByDoctorId(String hospitalId, String doctorId) {
        List<InvoiceEntity> invoices = invoiceRepository.getALlByHospitalId(hospitalId)
                .stream()
                .filter(i -> i.getDoctorId().equals(doctorId))
                .collect(Collectors.toList());
        return getInvoiceByIdCommon(invoices);
    }

    public List<InvoiceResponseDto> getAllInvoiceByUserId(String userId) {
        List<InvoiceEntity> invoices = invoiceRepository.getALlByUserId(userId);
        return getInvoiceByIdCommon(invoices);
    }

    public List<InvoiceResponseDto> getInvoiceByIdCommon(List<InvoiceEntity> invoices) {
        List<InvoiceResponseDto> invoiceResponseDtos = new ArrayList<>();
        Map<Long, Double> servicePrice = getInvoicePriceService();
        Map<Long, Double> medicinePrice = getInvoicePriceMedicine();
        invoices.forEach(i -> {
            List<ServiceEntity> serviceInvoice = invoiceRepository.getAllServiceByInvoiceId(i.getId());
            List<InvoiceMedicineAmountProjection> medicineInvoice = invoiceRepository.getAllMedicineByInvoiceId(i.getId());

            HospitalEntity hospital = hospitalRepository.getHospitalId(i.getHospitalId());
            String hospitalName = hospital.getHospitalName();
            String address = hospital.getAddress();
            Double star = commonService.getHospitalStar().get(i.getHospitalId());
            String imageUrl = hospital.getImageUrl();

            UserEntity doctor = userRepository.findByUserId(i.getDoctorId());
            String doctorName = doctor == null ? null : doctor.getLastName() + " " + doctor.getFirstName();

            UserInvoiceResponse user = new UserInvoiceResponse();
            BookEntity b = bookRepository.findById(i.getBookId()).orElseThrow(() -> new ResourceNotFoundException("Book not found"));

            UserEntity e = userRepository.findByUserId(i.getUserId());
            String[] bd = e.getBirthDay().split("-");
            int year = LocalDate.now().getYear() - Integer.parseInt(bd[2]);

            user.setFullNameBook(b.getName());
            user.setAgeBook(b.getAge());
            user.setGenderBook(b.getGender());
            user.setUserId(e.getUserId());
            user.setFullName(e.getLastName() + " " + e.getFirstName());
            user.setGender(e.getGender() == 1 ? "Nam" : "Nữ");
            user.setAge(year);


            invoiceResponseDtos.add(
                    new InvoiceResponseDto(user, hospitalName, address, star, imageUrl, doctorName, servicePrice.get(i.getId()) == null ? 0 : servicePrice.get(i.getId()) +
                            (medicinePrice.get(i.getId()) == null ? 0 : medicinePrice.get(i.getId())),
                            i, serviceInvoice, medicineInvoice));
        });
        return invoiceResponseDtos;
    }

    public Map<Long, Double> getInvoicePriceService() {
//        return invoiceRepository.getTotalByService()
//                .stream()
//                .collect(Collectors.toMap(TotalInvoiceProjection::getId, TotalInvoiceProjection::getPrice));

        if (invoiceRepository.getTotalByService() == null || invoiceRepository.getTotalByService().size() == 0) {
            return new HashMap<>();
        }
        Map<Long, Double> services = new HashMap<>();
        invoiceRepository.getTotalByService()
                .forEach(t -> {
                    if (t.getId() != null && t.getPrice() != null) {
                        services.put(t.getId(), t.getPrice());
                    }
                });
        return services;
    }

    public Map<Long, Double> getInvoicePriceMedicine() {
        if (invoiceRepository.getTotalByMedicine() == null || invoiceRepository.getTotalByMedicine().size() == 0) {
            return new HashMap<>();
        }
        Map<Long, Double> medicines = new HashMap<>();
        invoiceRepository.getTotalByMedicine()
                .forEach(t -> {
                    if (t.getId() != null && t.getPrice() != null) {
                        medicines.put(t.getId(), t.getPrice());
                    }
                });
        return medicines;
    }
}
