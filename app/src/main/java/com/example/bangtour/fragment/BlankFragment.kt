package com.example.bangtour.fragment
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.bangtour.Local.PlacesAdapter
import com.example.bangtour.Local.PlacesResponse
import com.example.bangtour.Local.RetrofitClient
import com.example.bangtour.R
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class BlankFragment : Fragment() {
    private val list = ArrayList<PlacesResponse>()

    private lateinit var rvPlaces: RecyclerView
    private lateinit var tvResponseCode: TextView
    private lateinit var adapter: PlacesAdapter

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_blank, container, false)


        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        rvPlaces = view.findViewById(R.id.rvPlaces)
        tvResponseCode = view.findViewById(R.id.tvResponseCode)

        rvPlaces.setHasFixedSize(true)
        rvPlaces.layoutManager = LinearLayoutManager(requireContext())

        adapter = PlacesAdapter(list)
        rvPlaces.adapter = adapter

        fetchDataFromApi()
    }

    private fun fetchDataFromApi() {
        RetrofitClient.instance.getplaces().enqueue(object : Callback<ArrayList<PlacesResponse>> {
            override fun onResponse(call: Call<ArrayList<PlacesResponse>>, response: Response<ArrayList<PlacesResponse>>) {
                Toast.makeText(requireActivity(), "On Response", Toast.LENGTH_SHORT).show()
                if (response.isSuccessful) {
                    val places = response.body()
                    Log.d("BlankFragment",places!!.get(0).Place_Name.toString() )
                    places?.let {
                        list.clear()
                        list.addAll(it)
                        adapter.notifyDataSetChanged()
                    }
                } else {
                    Toast.makeText(requireActivity(), "Un Sukses bro", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<ArrayList<PlacesResponse>>, t: Throwable) {
                Toast.makeText(requireActivity(), "onFailure", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
