# Android APK 构建指南

本指南说明如何将 PWA 离线网页打包为 Android APK 安装包。

---

## 前置要求

| 工具 | 版本 | 用途 |
|------|------|------|
| JDK | 21 | Java 编译（capacitor-android 要求 Java 21） |
| Android SDK | API 34 | Android 平台支持 |
| Gradle | 8.x | 构建系统（随项目自带） |
| Node.js | 18+ | Capacitor CLI |

### 安装检查

```bash
# 检查 Java 版本（必须显示 21）
java -version

# 检查 Android SDK 路径
$env:ANDROID_HOME
# 应指向类似 C:\Users\<用户名>\AppData\Local\Android\Sdk
```

---

## 构建步骤

### 1. 准备项目

```bash
# 进入 PWA 目录
cd pwa

# 确保 index.html 已准备就绪
# 该文件为单文件应用，内嵌了 CSS、JS 和 100 个关键词数据
```

### 2. 初始化 Capacitor（首次）

```bash
# 如未初始化，安装 Capacitor
npm install @capacitor/core @capacitor/cli

# 添加 Android 平台
npx cap add android
```

### 3. 同步并构建

```bash
# 同步 web 资源到 Android 项目
npx cap sync android

# 进入 Android 项目目录
cd android

# 构建 Debug APK
.\gradlew assembleDebug

# 或构建 Release APK
.\gradlew assembleRelease
```

### 4. 获取 APK

构建完成后，APK 文件位于：

```
pwa/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 关键配置

### 竖屏锁定

在 `pwa/android/app/src/main/AndroidManifest.xml` 中为 MainActivity 添加：

```xml
<activity
    android:name=".MainActivity"
    android:screenOrientation="portrait"
    ... >
</activity>
```

### 适配 vivo/OPPO 等国内机型

- 已设置竖屏锁定，确保在各种屏幕尺寸下正常显示
- 使用响应式 CSS 适配不同分辨率
- 无需特殊权限声明（纯本地应用，无网络请求）

---

## 常见问题

### Q1: `Toolchain installation does not provide the required capabilities: [JAVA_COMPILER]`

**原因**: 系统使用的是 JRE（运行时），缺少 JDK（开发工具包）中的编译器。

**解决**: 安装 JDK 21，并设置环境变量：

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.11"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
```

### Q2: `无效的源发行版：21` / `invalid source release: 21`

**原因**: 当前 JDK 版本低于 21，无法满足 capacitor-android 的编译要求。

**解决**: 切换至 JDK 21，确保 `java -version` 显示版本 21。

### Q3: `AAPT: stableIds.txt: error: failed to open: 数据无效。 (13)`

**原因**: 项目路径包含中文或空格（如 `TRAE SOLO CN`），Android 资源打包工具 AAPT 对此类路径存在兼容性问题。

**解决**: 将项目复制到纯英文无空格路径：

```powershell
New-Item -ItemType Directory -Force -Path "C:\temp\ai-cards-build"
Copy-Item -Recurse -Force "..\pwa\android\*" "C:\temp\ai-cards-build\"
# 然后修正 capacitor.settings.gradle 中的 node_modules 路径
```

### Q4: `Unexpected character: '﻿' @ line 1, column 1`

**原因**: `capacitor.settings.gradle` 文件使用了 UTF-8 BOM 编码，Gradle 不支持 BOM 头。

**解决**: 使用无 BOM 的 UTF-8 编码重新写入文件：

```powershell
$content = Get-Content "capacitor.settings.gradle" -Raw
[System.IO.File]::WriteAllText(
    "capacitor.settings.gradle",
    $content,
    [System.Text.UTF8Encoding]::new($false)
)
```

---

## 构建成功验证

| 检查项 | 标准 |
|--------|------|
| APK 大小 | 约 4MB |
| 安装方式 | 允许"未知来源"安装 |
| 运行方向 | 仅竖屏 |
| 离线可用 | 无需网络连接 |
| 数据持久化 | 学习记录自动保存 |

---

## 安装到手机

1. 将 `app-debug.apk` 传输到 Android 手机
2. 在手机上点击安装
3. 如提示"禁止安装未知来源应用"，前往设置 → 安全 → 允许未知来源
4. 安装完成后，桌面出现 "AI Learning Cards" 图标

> 优先适配 vivo、OPPO 等主流国产安卓机型。
