plugins {
    id("java-library")
}

group = "vn.aeoc.modules.order"

dependencies {
    implementation(project(":packages:entity:api"))
    implementation(project(":packages:auth:rbac"))
    implementation(project(":packages:common"))
    implementation(project(":modules:product"))
    implementation(project(":packages:infra:jooq"))
    implementation("org.springframework.boot:spring-boot-starter-web")
}