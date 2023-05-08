package com.spring.carebookie.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.carebookie.dto.edit.MedicineRemoveInvoiceDto;
import com.spring.carebookie.dto.edit.ServiceRemoveInvoiceDto;
import com.spring.carebookie.dto.response.InvoiceResponseDto;
import com.spring.carebookie.dto.response.UserInvoiceResponse;
import com.spring.carebookie.dto.save.InvoiceSaveDto;
import com.spring.carebookie.dto.save.MedicineIntoInvoiceDto;
import com.spring.carebookie.dto.save.ServiceIntoInvoiceDto;
import com.spring.carebookie.entity.BookEntity;
import com.spring.carebookie.entity.HospitalEntity;
import com.spring.carebookie.entity.InvoiceEntity;
import com.spring.carebookie.entity.InvoiceMedicineEntity;
import com.spring.carebookie.entity.InvoiceServiceEntity;
import com.spring.carebookie.entity.ServiceEntity;
import com.spring.carebookie.entity.UserEntity;
import com.spring.carebookie.exception.ResourceNotFoundException;
import com.spring.carebookie.repository.BookRepository;
import com.spring.carebookie.repository.HospitalRepository;
import com.spring.carebookie.repository.InvoiceMedicineRepository;
import com.spring.carebookie.repository.InvoiceRepository;
import com.spring.carebookie.repository.InvoiceServiceRepository;
import com.spring.carebookie.repository.UserRepository;
import com.spring.carebookie.repository.projection.InvoiceMedicineAmountProjection;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    private final HospitalRepository hospitalRepository;

    private final InvoiceServiceRepository invoiceServiceRepository;

    private final UserRepository userRepository;

    private final CommonService commonService;

    private final BookRepository bookRepository;

    private final InvoiceMedicineRepository invoiceMedicineRepository;

    public InvoiceResponseDto getInvoiceByHospitalIdAndUserId(String hospitalId,String userId) {
        return getAllInvoiceByHospitalId(hospitalId)
                .stream()
                .filter(i -> i.getInvoiceInformation().getUserId().equals(userId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
    }

    @Transactional
    public InvoiceResponseDto updateInvoice(InvoiceSaveDto dto) {

        // add service
        List<InvoiceServiceEntity> services = dto.getServices()
                .stream()
                .map(d -> new InvoiceServiceEntity(null, d.getInvoiceId(), d.getServiceId()))
                .collect(Collectors.toList());

        invoiceServiceRepository.saveAll(services);

        // add medicine
        List<InvoiceMedicineEntity> medicines = dto.getMedicines()
                .stream()
                .map(d -> new InvoiceMedicineEntity(null, d.getInvoiceId(), d.getMedicineId(), d.getAmount()))
                .collect(Collectors.toList());

        invoiceMedicineRepository.saveAll(medicines);

        invoiceRepository.updateExamined(dto.getDiagnose(), dto.getAdvices(),dto.getSymptomDetail());

        InvoiceEntity i = invoiceRepository.findById(dto.getInvoiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));

        return convertEntityToResponse(i);

    }

    @Transactional
    public InvoiceResponseDto removeService(ServiceRemoveInvoiceDto dto) {
        invoiceServiceRepository.deleteByInvoiceIdAndMedicineId(dto.getInvoiceId(), dto.getServiceId());
        InvoiceEntity i = invoiceRepository.findById(dto.getInvoiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));

        return convertEntityToResponse(i);
    }

    @Transactional
    public InvoiceResponseDto addService(ServiceIntoInvoiceDto dto) {
        InvoiceServiceEntity entity = invoiceServiceRepository.save(new InvoiceServiceEntity(null, dto.getInvoiceId(), dto.getServiceId()));

        if (entity == null) {
            throw new RuntimeException("Can not add service $1 into invoice $2"
                    .replace("$1", dto.getServiceId().toString())
                    .replace("$2", dto.getInvoiceId().toString()));
        }

        InvoiceEntity i = invoiceRepository.findById(dto.getInvoiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));

        return convertEntityToResponse(i);
    }

    @Transactional
    public InvoiceResponseDto confirmExamined(Long invoiceId, Double discountInsurance) {

        invoiceRepository.confirmExamined(invoiceId, discountInsurance);

        InvoiceEntity i = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));

        return convertEntityToResponse(i);

    }

    @Transactional
    public InvoiceResponseDto removeMedicine(MedicineRemoveInvoiceDto dto) {
        invoiceMedicineRepository.deleteByInvoiceIdAndMedicineId(dto.getInvoiceId(), dto.getMedicineId());
        InvoiceEntity i = invoiceRepository.findById(dto.getInvoiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));

        return convertEntityToResponse(i);
    }

    @Transactional
    public InvoiceResponseDto addMedicine(MedicineIntoInvoiceDto dto) {

        InvoiceMedicineEntity entity = invoiceMedicineRepository
                .save(new InvoiceMedicineEntity(null, dto.getInvoiceId(), dto.getMedicineId(), dto.getAmount()));

        if (entity == null) {
            throw new RuntimeException("Can not add medicine $1 into invoice $2"
                    .replace("$1", dto.getMedicineId().toString())
                    .replace("$2", dto.getInvoiceId().toString()));
        }

        InvoiceEntity i = invoiceRepository.findById(dto.getInvoiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));

        return convertEntityToResponse(i);
    }

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
        invoices.forEach(i -> {
            invoiceResponseDtos.add(convertEntityToResponse(i));
        });
        return invoiceResponseDtos;
    }

    public Map<Long, Double> getInvoicePriceService() {

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
        Map<Long, Double> medicines = new HashMap<>();
        invoiceRepository.getTotalByMedicine()
                .forEach(t -> {
                    if (t.getId() != null && t.getPrice() != null) {
                        medicines.put(t.getId(), t.getPrice());
                    }
                });
        return medicines;
    }


    public InvoiceResponseDto convertEntityToResponse(InvoiceEntity i) {

        Map<Long, Double> servicePrice = getInvoicePriceService();
        Map<Long, Double> medicinePrice = getInvoicePriceMedicine();
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

        Double totalPrice = (servicePrice.get(i.getId()) == null ? 0 : servicePrice.get(i.getId())) +
                (medicinePrice.get(i.getId()) == null ? 0 : medicinePrice.get(i.getId()));

        totalPrice = totalPrice - (totalPrice * (i.getDiscountInsurance() / 100));
        return new InvoiceResponseDto(user, hospitalName, address, star, imageUrl, doctorName, totalPrice,
                i, serviceInvoice, medicineInvoice);
    }

}
