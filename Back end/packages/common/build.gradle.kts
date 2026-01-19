plugins {
    id("java-library")
}

group = "vn.aeoc.packages.common"

dependencies {
    implementation(libs.spring.dotenv)
    implementation("org.springframework:spring-context")
    compileOnly("org.springframework.boot:spring-boot-autoconfigure")
    implementation("org.springframework.boot:spring-boot-starter-web")
    api(libs.jackson.core)
    implementation("jakarta.servlet:jakarta.servlet-api:6.0.0")
    api("org.apache.commons:commons-lang3:3.13.0")
}
