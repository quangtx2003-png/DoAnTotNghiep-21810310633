
plugins {
    application
    alias(libs.plugins.spring.boot)

}

group = "vn.aeoc.apps.api"

dependencies {
    implementation(project(":modules:user"))
    implementation(project(":modules:ai"))
    implementation(project(":modules:auth"))
    implementation(project(":modules:product"))
    implementation(project(":modules:order"))

    implementation(project(":packages:common"))
    implementation(project(":packages:infra:minio"))
    implementation(project(":packages:entity:api"))
    implementation(project(":packages:auth:rbac"))

    implementation("org.springframework.boot:spring-boot-starter-web")

    implementation(libs.spring.dotenv)
}

fun requiredEnv(name: String): String =
    env.fetch(name)
        .takeIf { it.isNotBlank() }
        ?: throw GradleException("Environment variable '$name' is not set or blank")

env.allVariables()
val BOOT_RUN_PROFILE: String = env.fetch("BOOT_RUN_PROFILE", "dev")

tasks.named<org.springframework.boot.gradle.tasks.run.BootRun>("bootRun") {
    systemProperty("spring.profiles.active", BOOT_RUN_PROFILE)
}

tasks.withType<JavaExec>().configureEach {
    systemProperty("springdotenv.directory", rootProject.projectDir.absolutePath)
}

application {
    mainClass.set("vn.aeoc.apps.api.ApiApplication")
}