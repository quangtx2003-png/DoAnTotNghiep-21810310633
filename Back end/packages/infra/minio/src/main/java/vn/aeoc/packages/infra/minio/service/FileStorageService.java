package vn.aeoc.packages.infra.minio.service;
import io.minio.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;

import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final MinioClient minioClient;

    @Value("${minio.bucket}")
    private String bucket;

    @Value("${system.domain}")
    private String domain;

    public String upload(MultipartFile file) {
        try (InputStream stream = file.getInputStream()) {
            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();

            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
                setPublicBucketPolicy();
            }

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(filename)
                            .stream(stream, file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );

            return "http://localhost:9000" + "/" + bucket + "/" + filename;
        } catch (Exception e) {
            throw new AppException(ErrorCode.UPLOAD_FILE_FAILED);
        }
    }

    private void setPublicBucketPolicy() throws Exception {
        String policy = """
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": "*",
              "Action": ["s3:GetObject"],
              "Resource": ["arn:aws:s3:::%s/*"]
            }
          ]
        }
        """.formatted(bucket);

        minioClient.setBucketPolicy(
                SetBucketPolicyArgs.builder()
                        .bucket(bucket)
                        .config(policy)
                        .build()
        );
    }
}