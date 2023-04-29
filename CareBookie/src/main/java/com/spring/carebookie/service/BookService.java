package com.spring.carebookie.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.spring.carebookie.common.constants.BookStatus;
import com.spring.carebookie.common.mappers.BookMapper;
import com.spring.carebookie.dto.save.BookSaveDto;
import com.spring.carebookie.entity.BookEntity;
import com.spring.carebookie.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    private static final BookMapper BOOK_MAPPER = BookMapper.INSTANCE;

    public BookEntity saveBook(BookSaveDto dto) {

        BookEntity entity = BOOK_MAPPER.convertSaveDtoToEntity(dto);
        entity.setStatus(BookStatus.PENDING.toString());
        entity.setDateTimeBook(LocalDateTime.now());
        // Todo add service in
        return bookRepository.save(entity);
    }
}
