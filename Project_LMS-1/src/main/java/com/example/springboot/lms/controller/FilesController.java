package com.example.springboot.lms.controller;

import com.example.springboot.lms.exception.DataNotFoundException;
import com.example.springboot.lms.payloads.BasicDTO;
import com.example.springboot.lms.services.FilesStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLConnection;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/upload")
public class FilesController {
    @Autowired
    FilesStorageService storageService;

    @Value("${files.upload.url}")
    private String uploadBaseUrl;
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        String mimeType = URLConnection.guessContentTypeFromName(file.getFilename());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION).contentType(MediaType.parseMediaType(mimeType)).body(file);
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping(value = "/save", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BasicDTO<String>> uploadFileToServer(@ModelAttribute MultipartFile file){

        Optional<String> fileName = storageService.save(file);
        if(fileName.isEmpty())
            throw new DataNotFoundException("File not uploaded. error");
        return ResponseEntity.ok(new BasicDTO<>(uploadBaseUrl +fileName.get()));
    }
}
