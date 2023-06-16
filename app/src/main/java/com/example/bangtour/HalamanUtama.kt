package com.example.bangtour
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.bangtour.databinding.ActivityHalamanutamaBinding
import com.example.bangtour.fragment.FragmentFavorite
import com.example.bangtour.fragment.BlankFragment
import com.example.bangtour.fragment.FragmentNotification
import com.example.bangtour.fragment.FragmentProfile
import com.google.android.material.bottomnavigation.BottomNavigationView

class HalamanUtama : AppCompatActivity() {

    private lateinit var binding: ActivityHalamanutamaBinding

    private val Fragmentblank = BlankFragment()
    private val favoriteFragment = FragmentFavorite()
    private val notificationFragment = FragmentNotification()
    private val profileFragment = FragmentProfile()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityHalamanutamaBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.bottomNav.setOnNavigationItemSelectedListener(onNavigationItemSelectedListener)

        supportFragmentManager.beginTransaction().apply {
            replace(R.id.container, Fragmentblank)
            commit()
        }
    }

    private val onNavigationItemSelectedListener = BottomNavigationView.OnNavigationItemSelectedListener { item ->
        when (item.itemId) {
            R.id.home -> {
                supportFragmentManager.beginTransaction().apply {
                    replace(R.id.container, Fragmentblank)
                    commit()
                }
                true
            }
            R.id.favorite -> {
                supportFragmentManager.beginTransaction().apply {
                    replace(R.id.container, favoriteFragment)
                    commit()
                }
                true
            }
            R.id.notification -> {
                supportFragmentManager.beginTransaction().apply {
                    replace(R.id.container, notificationFragment)
                    commit()
                }
                true
            }
            R.id.user -> {
                supportFragmentManager.beginTransaction().apply {
                    replace(R.id.container, profileFragment)
                    commit()
                }
                true
            }
            else -> false
        }
    }

}

