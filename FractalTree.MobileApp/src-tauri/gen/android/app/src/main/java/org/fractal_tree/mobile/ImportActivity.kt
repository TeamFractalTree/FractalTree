package org.fractal_tree.mobile

import android.content.res.Configuration
import android.graphics.Color
import android.os.Bundle
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import android.webkit.WebView
import android.annotation.SuppressLint
import java.io.FileOutputStream
import java.io.Reader

class ImportActivity : MainActivity() {

  fun updateImportedContent() {
    
    val inputStream = super.getApplicationContext().contentResolver.openInputStream(intent.data!!)
    val value = inputStream!!.reader().readText()
    
    super.webView.evaluateJavascript("window.tryToImport = " + value)
    { {} }
  }
  
  override fun onWebViewCreate(newWebView: WebView) {
    super.onWebViewCreate(newWebView)
    updateImportedContent()
  }
  
    
}