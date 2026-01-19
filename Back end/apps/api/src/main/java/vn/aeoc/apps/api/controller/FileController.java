package vn.aeoc.apps.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.util.Mapper;
import vn.aeoc.packages.infra.minio.service.FileStorageService;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class FileController {
    private final FileStorageService fileStorageService;

    @PostMapping("/file/upload")
    public ResponseEntity<ApiResponse<String>> uploadFile(@RequestParam("file") MultipartFile file) {
        var result = fileStorageService.upload(file);
        return Mapper.map(result, ApiResponse::okEntity);
    }
}