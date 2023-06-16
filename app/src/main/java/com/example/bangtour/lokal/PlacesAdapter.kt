package com.example.bangtour.Local


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView
import com.example.bangtour.Local.PlacesResponse
import com.example.bangtour.R

class PlacesAdapter(private val list: ArrayList<PlacesResponse>) :
    RecyclerView.Adapter<PlacesAdapter.PlacesViewHolder>() {

    inner class PlacesViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val cardView: CardView = itemView.findViewById(R.id.tvText)
        private val txtOutput: TextView = itemView.findViewById(R.id.rvPlaces)

        fun bind(placesResponse: PlacesResponse) {
            val text =
                "Place_Id: ${placesResponse.Place_Id}\n" +
                        "Place_Name: ${placesResponse.Place_Name}\n" +
                        "Rating: ${placesResponse.Rating}\n" +
                        "Description: ${placesResponse.Description}"
            txtOutput.text = text
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PlacesViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_places, parent, false)
        return PlacesViewHolder(view)
    }

    override fun getItemCount(): Int = list.size

    override fun onBindViewHolder(holder: PlacesViewHolder, position: Int) {
        holder.bind(list[position])
    }

    // Method untuk memperbarui data dalam adapter
    fun updateData(newList: ArrayList<PlacesResponse>) {
        list.clear()
        list.addAll(newList)
        notifyDataSetChanged()
    }
}
