package com.example.bangtour.Local

import com.google.gson.annotations.SerializedName

data class PlacesResponse(
    val Place_Id: String?,
    val Place_Name: String?,
    val Rating: String?,
    @SerializedName("Description")
    val Description: String?
)
