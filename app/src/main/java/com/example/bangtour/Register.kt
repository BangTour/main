package com.example.bangtour

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.bangtour.databinding.ActivityRegisterBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.analytics.FirebaseAnalytics

class Register : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var firebaseAnalytics: FirebaseAnalytics

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()
        firebaseAnalytics = FirebaseAnalytics.getInstance(this)

        binding.register.setOnClickListener {
            val email = binding.email.text.toString().trim()
            val password = binding.password.text.toString().trim()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                registerUser(email, password)

                // Log event "register_button_click" ke Firebase Analytics
                val bundle = Bundle()
                bundle.putString(FirebaseAnalytics.Param.ITEM_ID, "register_button")
                bundle.putString(FirebaseAnalytics.Param.ITEM_NAME, "Register Button")
                firebaseAnalytics.logEvent("register_button_click", bundle)
            } else {
                Toast.makeText(this, "Mohon lengkapi email dan password", Toast.LENGTH_SHORT).show()
            }
        }

        binding.login.setOnClickListener {
            val intent = Intent(this, Login::class.java)
            startActivity(intent)
        }
    }

    private fun registerUser(email: String, password: String) {
        auth.createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val user: FirebaseUser? = auth.currentUser
                    // Registrasi berhasil, pindah ke LoginActivity
                    Toast.makeText(this, "Registrasi berhasil", Toast.LENGTH_SHORT).show()
                    val intent = Intent(this, Login::class.java)
                    startActivity(intent)
                    finish() // Menutup activity Register agar tidak dapat dikembalikan dengan tombol back
                } else {
                    // Registrasi gagal, tampilkan pesan kesalahan
                    Toast.makeText(this, "Registrasi gagal: " + task.exception?.message, Toast.LENGTH_SHORT).show()
                }
            }
    }

}
