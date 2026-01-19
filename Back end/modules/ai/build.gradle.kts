plugins {
    id("java-library")
}

group = "vn.aeoc.modules.ai"

dependencies {
    implementation(project(":packages:entity:api"))
    implementation(project(":packages:auth:rbac"))
    implementation(project(":packages:common"))
    implementation(project(":modules:product"))
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.theokanning.openai-gpt3-java:service:0.18.2")
    implementation(project(":packages:infra:jooq"))
}