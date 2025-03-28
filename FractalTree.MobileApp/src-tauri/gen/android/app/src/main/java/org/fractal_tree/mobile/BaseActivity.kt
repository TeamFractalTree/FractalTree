package org.fractal_tree.mobile

import android.content.res.Configuration
import android.graphics.Color
import android.os.Bundle
import android.webkit.WebView
import android.annotation.SuppressLint

abstract class BaseActivity : TauriActivity() {

    public lateinit var webView: WebView

    override fun onWebViewCreate(webView: WebView) {
        this.webView = webView
    }

    private fun isDarkMode(): Boolean {
        return when (resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) {
          Configuration.UI_MODE_NIGHT_YES -> true
          Configuration.UI_MODE_NIGHT_NO -> false
          Configuration.UI_MODE_NIGHT_UNDEFINED -> false
          else -> false
        }
    }

      
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set the color of the status bar based on dark mode
        if (isDarkMode()) {
            window.statusBarColor = Color.parseColor("#170d16") // Fractal Tree dark pink color
        } else {
            window.statusBarColor = android.graphics.Color.WHITE
        }
    }

    @SuppressLint("MissingSuperCall", "SetTextI18n")
    @Deprecated("")
    override fun onBackPressed() {
        // Executes window.tauriHandleBackButton and falls back to console.log
        webView.evaluateJavascript("(window.tauriHandleBackButton || console.log)()") 
        { 
            result ->
            if (result == "true") {
                super.onBackPressed();
            }
        }
    }
}