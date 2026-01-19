plugins {
    id("java-library")
}

group = "vn.aeoc.packages.entity.api"

dependencies {
    implementation(project(":packages:auth:rbac"))
//    api("org.springframework.boot:spring-boot-starter-data-jpa")
}