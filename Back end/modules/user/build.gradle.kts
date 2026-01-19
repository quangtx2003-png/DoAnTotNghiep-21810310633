plugins {
    id("java-library")
}

group = "vn.aeoc.modules.user"

dependencies {
    implementation(project(":packages:entity:api"))
    implementation(project(":packages:auth:rbac"))
    implementation(project(":packages:common"))
    implementation(project(":packages:infra:jooq"))
    implementation("org.springframework.boot:spring-boot-starter-web")
}