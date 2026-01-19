plugins {
    id("java-library")
}

group = "vn.aeoc.packages.infra.minio"

dependencies {
    api(libs.minio)
    implementation(project(":packages:common"))
    implementation("org.springframework:spring-context")
    implementation("org.springframework:spring-web")
    compileOnly("org.springframework.boot:spring-boot-autoconfigure")
}