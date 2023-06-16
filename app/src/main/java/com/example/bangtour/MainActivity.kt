package com.example.bangtour

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.bangtour.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btn1.setOnClickListener {
            // Memulai activity lain saat tombol login diklik
            val intent = Intent(this, Login::class.java)
            startActivity(intent)
        }

        binding.btn2.setOnClickListener {
            // Memulai activity lain saat tombol register diklik
            val intent = Intent(this, Register::class.java)
            startActivity(intent)
        }
    }
}