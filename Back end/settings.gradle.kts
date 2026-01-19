rootProject.name = "spring-monorepo-starter"

fun includeRecursively(dir: File, path: String = "") {
    dir.listFiles()?.forEach { file ->
        if (file.isDirectory && File(file, "build.gradle.kts").exists()) {
            val projectPath = path + ":" + file.name
            include(projectPath)
            includeRecursively(file, projectPath)
        } else if (file.isDirectory) {
            includeRecursively(file, path + ":" + file.name)
        }
    }
}

includeRecursively(rootDir)
include("modules:product")
include("packages:infra:minio")
include("modules:cart")
include("modules:order")
include("modules:ai")