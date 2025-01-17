package org.fractal_tree.my_

import android.R.raw
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.WebChromeClient
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.viewinterop.AndroidView
import org.fractal_tree.my_.ui.theme.FractalTreeRuntimeTheme
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


        enableEdgeToEdge()

        setContent {
            FractalTreeRuntimeTheme {
                // A surface container using the 'background' color from the theme
                Surface(modifier = Modifier.fillMaxSize(), color = Color.White) {
                    RuntimeView()
                }
            }
        }
    }
}

@Composable
fun RuntimeView() {
    AndroidView(factory = {
        WebView(it).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        }
    }, update = {
        it.settings.allowFileAccess = true
        it.settings.allowContentAccess = true
        it.settings.javaScriptEnabled = true
        it.settings.domStorageEnabled = true
        it.webChromeClient = WebChromeClient()
        it.loadUrl("file:///android_res/raw/app.html")
    })
}
