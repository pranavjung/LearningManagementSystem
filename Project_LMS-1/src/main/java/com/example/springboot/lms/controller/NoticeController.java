package com.example.springboot.lms.controller;

import com.example.springboot.lms.exception.DataNotFoundException;
import com.example.springboot.lms.model.Notice;
import com.example.springboot.lms.payloads.BasicDTO;
import com.example.springboot.lms.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/notice")
public class NoticeController {
    @Autowired
    private final NoticeRepository noticeRepository;

    public NoticeController(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @PostMapping
    public ResponseEntity<BasicDTO<Notice>> create(@RequestBody Notice r) {
        r.setCreatedOn(LocalDate.now());
        noticeRepository.save(r);
        return new ResponseEntity<>(new BasicDTO<>(r), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<BasicDTO<List<Notice>>> getAll() {
        List<Notice> notices = noticeRepository.findAll();
        return new ResponseEntity<>(new BasicDTO<>(notices), HttpStatus.OK);
    }
    @GetMapping("/{noticeId}")
    public ResponseEntity<BasicDTO<Notice>> get(@PathVariable("noticeId") Integer noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        if(notice.isEmpty()) throw new DataNotFoundException("Notice not found");
        return new ResponseEntity<>(new BasicDTO<>(notice.get()), HttpStatus.OK);
    }
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<BasicDTO<Notice>> delete(@PathVariable("noticeId") Integer noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        if(notice.isEmpty()) throw new DataNotFoundException("Notice not found");
        noticeRepository.delete(notice.get());
        return new ResponseEntity<>(new BasicDTO<>(null), HttpStatus.OK);
    }
}
