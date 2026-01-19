plugins {
    id("java")
    alias(libs.plugins.spring.dependency)
    alias(libs.plugins.spotless)
    alias(libs.plugins.versions)
    alias(libs.plugins.dotenv)
}

group = "vn.aeoc"
version = "1.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

tasks.jar {
    exclude("**/test/**")
    exclude("**/*.md")
    exclude("META-INF/*.SF", "META-INF/*.DSA", "META-INF/*.RSA")
}

repositories {
    mavenCentral()
}

allprojects {
    group = "vn.aeoc"
    version = "1.0-SNAPSHOT"

    repositories {
        mavenCentral()
    }

    plugins.withId("java") {
        java {
            toolchain {
                languageVersion = JavaLanguageVersion.of(21)
            }
        }
    }
}

subprojects {

    plugins.apply("java")
    plugins.apply(rootProject.libs.plugins.spotless.get().pluginId)
    plugins.apply(rootProject.libs.plugins.versions.get().pluginId)

    plugins.withId("java") {

        tasks.withType<JavaCompile>().configureEach {
            options.encoding = "UTF-8"
        }

        extensions.configure<com.diffplug.gradle.spotless.SpotlessExtension> {
            java {
                target("**/*.java")

                eclipse().configFile(
                    rootProject.file("gradle/config/intellij-java-formatter.xml")
                )
                removeUnusedImports()
                trimTrailingWhitespace()
                endWithNewline()
            }
        }

        dependencies {
            implementation(platform(rootProject.libs.boms.spring))

            compileOnly(rootProject.libs.lombok)
            annotationProcessor(rootProject.libs.lombok)

            implementation(rootProject.libs.jakarta.annotation)
            implementation(rootProject.libs.validation)


        }
    }
}

val DB_REMOTE_HOST: String = env.fetch("DB_REMOTE_HOST")

if (DB_REMOTE_HOST.isBlank()) {
    throw GradleException("DB_REMOTE_HOST is not set or empty")
}

val DB_HOST: String = env.fetch("DB_HOST", "127.0.0.1")
val DB_PORT: String = env.fetch("DB_PORT", "5432")

tasks.register<Exec>("cloudflared") {
    group = "infra"
    description = "Run Cloudflared TCP Access for Postgres"

    commandLine(
        "cloudflared",
        "access", "tcp",
        "--hostname", DB_REMOTE_HOST,
        "--url", "$DB_HOST:$DB_PORT"
    )

    standardOutput = System.out
    errorOutput = System.err
}