package com.example.bangtour.Local


import retrofit2.Call
import retrofit2.http.GET

interface API {
    @GET("places")
    fun getplaces(): Call<ArrayList<PlacesResponse>>
}