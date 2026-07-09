# 异常处理文档

本文档记录开发过程中遇到的所有异常及处理过程，每条记录包含：原文报错、中文翻译、解决方案思路、代码、执行记录。

---

## 2026-07-09 | APK 构建相关异常

### 异常 1: Toolchain installation does not provide the required capabilities: [JAVA_COMPILER]
- **原文**: `Toolchain installation 'C:\Users\T\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\vm\tools\app\jre' does not provide the required capabilities: [JAVA_COMPILER]`
- **中文翻译**: 工具链安装目录中的 Java 运行时环境（JRE）不提供 Java 编译器（javac）能力。这是一个仅包含运行时的 JRE，缺少 JDK 中的编译工具。
- **解决方案思路**: 系统自带的 Java 是 JRE 而非 JDK，需要用户安装完整的 JDK（包含 javac 编译器）。检测到用户已安装 JDK 17 和 JDK 21，后续使用 JDK 21 构建。
- **代码**: 设置 `JAVA_HOME` 为 JDK 路径：`$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.11"`
- **执行记录**: 用户确认已安装 JDK 17 和 JDK 21，后续构建切换至 JDK 21。

---

### 异常 2: 无效的源发行版：21
- **原文**: `无效的源发行版：21` / `invalid source release: 21`
- **中文翻译**: Gradle 编译目标设定为 Java 21，但当前使用的 JDK 版本低于 21，无法完成编译。capacitor-android 模块的 Gradle 插件要求 Java 21。
- **解决方案思路**: 将 `JAVA_HOME` 从 JDK 17 切换为 JDK 21。JDK 21 的安装路径为 `C:\Program Files\Java\jdk-21.0.11`。
- **代码**:
  ```powershell
  $javaHome = "C:\Program Files\Java\jdk-21.0.11"
  $env:JAVA_HOME = $javaHome
  $env:PATH = "$javaHome\bin;$env:PATH"
  ```
- **执行记录**: 2026-07-09 切换至 JDK 21 后重新执行构建。

---

### 异常 3: AAPT stableIds.txt 数据无效
- **原文**: `AAPT: ... stableIds.txt: error: failed to open: 数据无效。 (13).`
- **中文翻译**: Android 资源打包工具（AAPT）无法读取 `stableIds.txt` 文件，错误码 13 表示文件句柄打开失败。根本原因是项目路径中包含中文和空格（`TRAE SOLO CN`），AAPT 对此类路径存在兼容性问题。
- **解决方案思路**: 将 Android 项目复制到纯英文无空格路径（如 `C:\temp\ai-cards-build`）下重新构建。同时需要修复 `capacitor.settings.gradle` 中对 `node_modules` 的相对路径引用。
- **代码**:
  ```powershell
  New-Item -ItemType Directory -Force -Path "C:\temp\ai-cards-build"
  Copy-Item -Recurse -Force "...\pwa\android\*" "C:\temp\ai-cards-build\"
  ```
- **执行记录**: 2026-07-09 复制到 `C:\temp\ai-cards-build` 后，`capacitor.settings.gradle` 中 `../node_modules` 引用断裂，需手动修正为绝对路径。

---

### 异常 4: capacitor.settings.gradle BOM 头导致解析失败
- **原文**: `Unexpected character: '﻿' @ line 1, column 1.`
- **中文翻译**: Gradle 脚本解析器在文件第一行第一列遇到了一个无法识别的字符。这是因为文件以 UTF-8 BOM（字节序标记）开头，而 Gradle 不支持 BOM 头。
- **解决方案思路**: 使用无 BOM 的 UTF-8 编码重新写入 `capacitor.settings.gradle` 文件。
- **代码**:
  ```powershell
  [System.IO.File]::WriteAllText(
      "C:\temp\ai-cards-build\capacitor.settings.gradle",
      $content,
      [System.Text.UTF8Encoding]::new($false)
  )
  ```
- **执行记录**: 2026-07-09 重新写入无 BOM 文件后，构建成功通过。

---

## 构建成功记录

- **时间**: 2026-07-09
- **产物**: `app-debug.apk`
- **大小**: 3.97 MB
- **输出路径**: `.../ai-learning-cards/pwa/android/app/build/outputs/apk/debug/app-debug.apk`
- **关键配置**: 竖屏锁定（`android:screenOrientation="portrait"`），适配 vivo/OPPO 等主流安卓机型
