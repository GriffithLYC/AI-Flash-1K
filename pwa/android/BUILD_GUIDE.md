# AI学习卡片 - 安卓安装包打包指南

本文档提供三种将PWA网页应用打包为安卓APK安装包的方案，按复杂度从低到高排列。

---

## 方案一：PWA添加到主屏幕（推荐，零成本）

最简单的方式，无需打包，用户像安装APP一样使用。

### 操作步骤

1. 将 `pwa/index.html` 部署到任意静态托管（GitHub Pages、Vercel、腾讯云COS等）
2. 用户在安卓Chrome浏览器中打开网页
3. 浏览器会自动提示"添加到主屏幕"
4. 用户点击添加后，桌面上会出现APP图标
5. 点击图标即可全屏运行，体验与原生APP几乎一致

### 优点
- 零打包成本
- 自动更新（网页更新后APP同步更新）
- 支持离线使用（Service Worker已内置）
- 安装包体积极小

### 缺点
- 需要通过浏览器安装
- 部分国产安卓浏览器可能不支持PWA安装提示

---

## 方案二：Capacitor打包（推荐用于正式分发）

使用Ionic Capacitor将PWA封装为原生APK，可上架应用商店。

### 环境要求

- Node.js 18+
- Android Studio（含SDK和Gradle）
- JDK 17

### 操作步骤

```bash
# 1. 全局安装Capacitor CLI
npm install -g @capacitor/cli

# 2. 在pwa目录初始化Capacitor项目
cd pwa
npm init -y
npm install @capacitor/core @capacitor/cli

# 3. 初始化Capacitor
npx cap init AI学习卡片 com.example.ai_learning_cards --web-dir .

# 4. 添加安卓平台
npm install @capacitor/android
npx cap add android

# 5. 同步资源到安卓项目
npx cap sync

# 6. 用Android Studio打开并构建APK
npx cap open android
# 在Android Studio中：Build -> Build Bundle(s) / APK(s) -> Build APK(s)
```

### 构建产物

APK文件位于：`android/app/build/outputs/apk/debug/app-debug.apk`

### 优点
- 真正的原生APK安装包
- 可上架各大安卓应用商店
- 支持原生推送通知（可选）
- 用户体验与原生APP完全一致

### 缺点
- 需要安装Android Studio（约2GB）
- 每次更新需要重新打包

---

## 方案三：WebView封装（最灵活）

使用Android Studio手动创建WebView项目，适合需要深度定制的场景。

### 操作步骤

1. 打开Android Studio，创建新项目
2. 选择"Empty Views Activity"模板
3. 在 `app/src/main/res/layout/activity_main.xml` 中添加WebView：

```xml
<WebView
    android:id="@+id/webview"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

4. 在 `app/src/main/java/.../MainActivity.kt` 中配置WebView：

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val webView: WebView = findViewById(R.id.webview)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.webViewClient = WebViewClient()

        // 加载本地HTML文件
        webView.loadUrl("file:///android_asset/index.html")
    }
}
```

5. 将 `pwa/index.html` 复制到 `app/src/main/assets/` 目录
6. 在 `app/src/main/AndroidManifest.xml` 中添加权限：

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

7. Build -> Build APK(s)

### 优点
- 完全可控的WebView行为
- 可添加原生功能（如震动反馈、原生分享等）
- APK体积最小（仅WebView壳+HTML）

### 缺点
- 需要Android开发知识
- 手动维护WebView配置

---

## 推荐方案选择

| 场景 | 推荐方案 |
|------|----------|
| 快速验证/个人使用 | 方案一（PWA添加到主屏幕） |
| 正式上架应用商店 | 方案二（Capacitor打包） |
| 需要深度定制原生功能 | 方案三（WebView封装） |

---

## 安卓适配注意事项

1. **触摸事件**：PWA已同时支持touch和mouse事件，确保Android和iOS都能正常滑动
2. **安全区域**：CSS已包含 `env(safe-area-inset-bottom)` 适配全面屏手机的底部导航栏
3. **返回键**：Capacitor和WebView方案中，需要处理安卓物理返回键，可在JS中监听 `backbutton` 事件
4. **屏幕方向**：建议在AndroidManifest中锁定为竖屏 `<activity android:screenOrientation="portrait">`
5. **深色模式**：PWA已使用深色主题，适配Android系统的深色模式设置
