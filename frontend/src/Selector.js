import React from "react";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react"
import { GET_REGIONS, GET_SUBREGIONS, GET_CROPS, GET_SEASONS, GET_DISEASES } from "./Query"


export function SelectRegion({region, handleRegionChange}) {
  const {loading, error, data} = useQuery(GET_REGIONS)
  if (loading) {
    return (
      <div>
        <label>
          <p>Region</p>
          <div class="select is-primary">
          <select defaultValue="">
            <option value="" hidden disabled>Loading...</option>
          </select>
        </div>
        </label>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <label>
          <p>Region</p>
          <div class="select is-primary">
          <select defaultValue="">
            <option value="" hidden disabled>Error!</option>
          </select>
        </div>
        </label>
      </div>
    )
  }
  return (
    <div>
      <label>
        <p>Region</p>
        <div class="select is-primary">
          <select defaultValue="" value={region} onChange={handleRegionChange}>
            <option value="" hidden disabled>Select Region</option>
            {data.regions.map(region => (
              <option value={region.region_name}>{region.region_name}</option>
            ))} 
          </select>
        </div>
      </label>
    </div>
  )
}

export function SelectSubregion({region, subregion, handleSubregionChange}) {
  const {loading, error, data} = useQuery(GET_SUBREGIONS)
  if (loading) {
    return (
      <div>
        <label>
          <p>Subregion</p>
          <div class="select is-primary">
          <select defaultValue="">
            <option value="" hidden disabled>Loading...</option>
          </select>
        </div>
        </label>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <label>
          <p>Subregion</p>
          <div class="select is-primary">
          <select defaultValue="">
            <option value="" hidden disabled>Error!</option>
          </select>
        </div>
        </label>
      </div>
    )
  }
  const subregions = data.locations
                      .filter(location => location.region.region_name == region)
                      .map(location => location.sub_region)
                      .sort()
  
  return (
    <div>
      <label>
        <p>Subregion</p>
        <div class="select is-primary">
          <select defaultValue="" value={subregion} onChange={handleSubregionChange}>
            <option value="" hidden disabled>Select Subregion</option>
            {subregions.map(subregion => (
              <option value={subregion}>{subregion}</option>
            ))} 
          </select>
        </div>
      </label>
    </div>
  )
}

export function SelectCrop({crop, handleCropChange}) {
  const {loading, error, data} = useQuery(GET_CROPS)

  if (loading) return (
    <div class="is-flex is-flex-direction-column">
      <p>Crop</p>
      <p>Loading...</p>
    </div>
  )
  if (error) return (
    <div class="is-flex is-flex-direction-column">
      <p>Crop</p>
      <p>Error!</p>
    </div>
  )

  return (
    <div class="is-flex is-flex-direction-column">
      <p>Crop</p>
      {data.crops.map((entry) => (
        <label class="radio px-1 py-1">
          <input type="radio" name="crop" value={entry.crop_name} checked={crop == entry.crop_name} onChange={handleCropChange}/>
          {entry.crop_name}
        </label>
      ))}
    </div>
  )
}

export function SelectSeason({season, handleSeasonChange}) {
  const {loading, error, data} = useQuery(GET_SEASONS)

  if (loading) return (
    <div>
      <label>
          <p>Season</p>
          <div class="select is-primary">
            <select defaultValue="">
              <option value="" disabled hidden>Loading...</option>
          </select>
        </div>
      </label>
    </div>
  )
  if (error) return (
    <div>
      <label>
          <p>Season</p>
          <div class="select is-primary">
            <select defaultValue="">
              <option value="" disabled hidden>Error!</option>
          </select>
        </div>
      </label>
    </div>
  )

  return (
    <div>
      <label>
          <p>Season</p>
          <div class="select is-primary">
            <select defaultValue="" value={season} onChange={handleSeasonChange}>
              <option value="" disabled hidden>Select Season</option>
              {data.seasons.map((season) => (
                <option value={season.year}>{season.year}</option>
              ))}
          </select>
        </div>
      </label>
    </div>
  )
}

export function SelectDisease({disease, handleDiseaseChange}) {
  const {loading, error, data} = useQuery(GET_DISEASES)

  if (loading) return (
    <div class="column">
      <label>
        <p>Select disease present</p>
        <div class="select is-primary">
          <select defaultValue="">
            <option value="" disabled hidden>Loading...</option>
          </select>
        </div>
      </label>
    </div>
  )
  if (error) return (
    <div class="column">
      <label>
        <p>Select disease present</p>
        <div class="select is-primary">
          <select defaultValue="">
            <option value="" disabled hidden>Error!</option>
          </select>
        </div>
      </label>
    </div>
  )

  return (
    <div class="column">
      <label>
        <p>Select disease present</p>
        <div class="select is-primary">
          <select defaultValue="" value={disease} onChange={handleDiseaseChange}>
            <option value="" disabled hidden>Select Disease</option>
            {data.diseases.map((item) => (
              <option value={item.disease_name}>{item.disease_name}</option>
            ))}
          </select>
        </div>
      </label>
    </div>
  )
}