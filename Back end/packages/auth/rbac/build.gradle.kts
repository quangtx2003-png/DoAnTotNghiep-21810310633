plugins {
    id("java-library")
}

group = "vn.aeoc.packages.auth.rbac"

dependencies {
    implementation(libs.spring.dotenv)
    api(libs.bundles.jjwt)
    implementation(project(":packages:common"))
    implementation("org.springframework:spring-context")
    compileOnly("org.springframework.boot:spring-boot-autoconfigure")
    implementation("org.springframework.boot:spring-boot-starter-web")
    compileOnly("jakarta.servlet:jakarta.servlet-api:6.0.0")
    api(libs.jbcrypt)
}
