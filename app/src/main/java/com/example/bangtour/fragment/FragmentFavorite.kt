package com.example.bangtour.fragment
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.bangtour.R

class FragmentFavorite : Fragment() {
    private lateinit var favoritesList: ListView
    private lateinit var adapter: ArrayAdapter<String>

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_favorite, container, false)

        favoritesList = view.findViewById(R.id.favoritesList)
        adapter = ArrayAdapter(requireContext(), android.R.layout.simple_list_item_1)
        favoritesList.adapter = adapter

        return view
    }

    fun like(view: View) {
        adapter.add("New favorite item")
        adapter.notifyDataSetChanged()
        Toast.makeText(requireContext(), "Item added to favorites", Toast.LENGTH_SHORT).show()
    }
}
