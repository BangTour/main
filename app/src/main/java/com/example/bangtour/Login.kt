package com.example.bangtour

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.bangtour.databinding.ActivityLoginBinding
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser


class Login : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var firebaseAnalytics: FirebaseAnalytics

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()
        firebaseAnalytics = FirebaseAnalytics.getInstance(this)

        binding.login.setOnClickListener {
            val email = binding.email.text.toString().trim()
            val password = binding.password.text.toString().trim()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                loginUser(email, password)

                // Log event "login_button_click" ke Firebase Analytics
                val bundle = Bundle()
                bundle.putString(FirebaseAnalytics.Param.ITEM_ID, "login_button")
                bundle.putString(FirebaseAnalytics.Param.ITEM_NAME, "Login Button")
                firebaseAnalytics.logEvent("login_button_click", bundle)
            } else {
                Toast.makeText(this, "Mohon lengkapi email dan password", Toast.LENGTH_SHORT).show()
            }
        }

        binding.register.setOnClickListener {
            val intent = Intent(this, Register::class.java)
            startActivity(intent)
        }
    }

    private fun loginUser(email: String, password: String) {
        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val user: FirebaseUser? = auth.currentUser
                    // Login berhasil, pindah ke MainActivity
                    Toast.makeText(this, "Login berhasil", Toast.LENGTH_SHORT).show()
                    val intent = Intent(this, HalamanUtama::class.java)
                    startActivity(intent)
                    finish() // Menutup activity Login agar tidak dapat dikembalikan dengan tombol back
                } else {
                    if (task.exception?.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
                        // Akun pengguna belum terdaftar, tampilkan pesan kesalahan
                        Toast.makeText(this, "Akun pengguna belum terdaftar", Toast.LENGTH_SHORT).show()
                    } else {
                        // Login gagal, tampilkan pesan kesalahan
                        Toast.makeText(this, "Login gagal: " + task.exception?.message, Toast.LENGTH_SHORT).show()
                    }
                }
            }
    }
}