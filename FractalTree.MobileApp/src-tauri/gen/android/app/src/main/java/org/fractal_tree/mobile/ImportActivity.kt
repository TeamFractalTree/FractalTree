package org.fractal_tree.mobile

import android.webkit.WebView
import kotlin.io.encoding.Base64
import kotlin.io.encoding.ExperimentalEncodingApi

class ImportActivity : BaseActivity() {

  @OptIn(ExperimentalEncodingApi::class)
  fun updateImportedContent() {
    
    if (intent.data == null) {
      return;
    }
    
    val inputStream = super.getApplicationContext().contentResolver.openInputStream(intent.data!!)
    val value = inputStream!!.reader().readText()
    
    super.webView.evaluateJavascript("localStorage.tryToImport = `" + Base64.Default.encode(value.encodeToByteArray()) + "`")
    { {} }
  }
  
  override fun onWebViewCreate(newWebView: WebView) {
    super.onWebViewCreate(newWebView)
    
    try {
      updateImportedContent()
    }
    catch (e : Exception) { null }
  }

  override fun onResume() {

    try {
      updateImportedContent()
    }
    catch (e : Exception) { null }
    
    super.onResume()
  }

    
}