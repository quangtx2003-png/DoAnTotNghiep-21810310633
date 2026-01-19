// #TODO: create 2 types of jooq packages including codegen for org.jooq.codegen.DefaultGenerator and org.jooq.meta.extensions.jpa.JPADatabase
plugins {
    id("java-library")
    alias(libs.plugins.jooq)
}

group = "vn.aeoc.packages.infra.jooq"

dependencies {
    api(libs.jooq)
    implementation(project(":packages:common"))
    jooqGenerator(libs.jooq.meta)
    jooqGenerator(libs.jooq.codegen)
    jooqGenerator(libs.mysql)
//    jooqGenerator(libs.postgresql)
    implementation(libs.mysql)
    api(libs.hikari)
    implementation("org.springframework:spring-context")
    compileOnly("org.springframework.boot:spring-boot-autoconfigure")
    api("org.springframework.boot:spring-boot-starter-jdbc")
//    implementation("org.jooq:jooq-jpa-extensions:3.20.1")
}

//jooq {
//    configuration {
//        generator {
//            database {
//                name = "org.jooq.meta.extensions.jpa.JPADatabase"
//                properties {
//
//                    property {
//                        key = "packages"
//                        value = "vn.aeoc.packages.entity.api"
//                    }
//
//                    property {
//                        key = "useAttributeConverters"
//                        value = "true"
//                    }
//
//                    property {
//                        key = "unqualifiedSchema"
//                        value = "none"
//                    }
//
//                    property {
//                        key = "renderNameStyle"
//                        value = "LOWER"
//                    }
//
//                    property {
//                        key = "renderNameCase"
//                        value = "LOWER"
//                    }
//                }
//            }
//
//            target {
//                packageName = "vn.aeoc.packages.infra.jooq.jpa"
//                directory = "build/generated-src/jooq/main"
//            }
//        }
//    }
//}

//tasks.named("jooqCodegen") {
//    dependsOn(":packages:entity:api:jar", ":packages:auth:rbac:jar")
//}

sourceSets {
    main {
        java {
            srcDir("build/generated-src/jooq/main")
        }
    }
}

fun requiredEnv(name: String): String =
    env.fetch(name)
        .takeIf { it.isNotBlank() }
        ?: throw GradleException("Environment variable '$name' is not set or blank")

env.allVariables()
val bootRunProfile: String = env.fetch("BOOT_RUN_PROFILE", "dev")
val DB_USER = requiredEnv("DB_USER")
val DB_PASSWORD = requiredEnv("DB_PASSWORD")
val DB_NAME = requiredEnv("DB_NAME")
val DB_HOST = env.fetch("DB_HOST", "localhost")
val DB_PORT = env.fetch("DB_PORT", "3306")

val DATABASE_URL = "jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}"

jooq {
    version = "3.20.5"
    edition.set(nu.studer.gradle.jooq.JooqEdition.OSS)
    configurations {
        val main = create("main")
        main.generateSchemaSourceOnCompilation.set(false)

        main.jooqConfiguration.apply {
            jdbc.apply {
                driver = "com.mysql.cj.jdbc.Driver"
                url = DATABASE_URL
                user = DB_USER
                password = DB_PASSWORD
            }

            generator.apply {
                name = "org.jooq.codegen.DefaultGenerator"

                database.apply {
                    name = "org.jooq.meta.mysql.MySQLDatabase"
                    inputSchema = DB_NAME
                }

                target.apply {
                packageName = "vn.aeoc.packages.infra.jooq"
                directory = "build/generated-src/jooq/main"
                }
            }
        }
    }
}