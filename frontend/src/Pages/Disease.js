import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function Disease() {
  // States for input

  // Inputs for Region/Crop/Season
  const [region, setRegion] = useState(null)
  const [subregion, setSubregion] = useState(null)
  const [crop, setCrop] = useState(null)
  const [season, setSeason] = useState(null)

  return (
    <>
      <title>Disease Risk</title>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="Disease Risk" />
        <div style={{ flex: 1, padding: "1rem" }}>
          <div style={{display: "flex"}}>
            <RegionCropSeason 
            setRegion={setRegion}
            setSubregion={setSubregion}
            setCrop={setCrop}
            setSeason={setSeason}
            />
            <CropProduction />
          </div>
          <div style={{display: "flex"}}>
            <DiseaseImpactEstimates />
            <TreatmentCostEstimates />
          </div>
          <HarvestEstimates />
          <CostBenefitSummary />
        </div>
      </div>
    </>
  );
}

function RegionCropSeason({setRegion, setSubregion, setCrop, setSeason}) {

  const regionList = ["Northern", "Southern", "Western"] // TODO: Query for regions
  let subregionList = [] // Will be filled in when region is selected
  const cropList = ["Barley", "Chickpeas", "Wheat"] // TODO: Query for crops
  const seasonList = ["21/22", "22/23", "23/24", "24/25"] // TODO: Query for seasons
  
  const handleRegionChange = (event) => {
    setRegion(event.target.value)
    // TODO: Query for subregions in region
  }

  const handleSubregionChange = (event) => {
    setSubregion(event.target.value)
  }

  const handleCropChange = (event) => {
    setCrop(event.target.value)
  }

  const handleSeasonChange = (event) => {
    setSeason(event.target.value)
  }

  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Region, Crop & Season</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        <div style={{display: "flex", gap: "1rem"}}>
          
          {/* Region Select */}
          <div><label>
            <p>Region</p>
            <select defaultValue="" onChange={handleRegionChange}>
              <option value="" disabled hidden>Select Region</option>
              {regionList.map((region) => (
                <option value={region}>{region}</option>
              ))}
            </select>
          </label></div>

          {/* Subregion Select */}
          <div><label>
              <p>Subregion</p>
              <select defaultValue="" onChange={handleSubregionChange}>
              <option value="" disabled hidden>Select Subregion</option>
              {subregionList.map((subregion) => (
                <option value={subregion}>{subregion}</option>
              ))}
            </select>
          </label></div>
          
          {/* Crop Select */}
          <div>
            <p>Crop</p>
            {cropList.map((crop) => (
              <label><p>
                <input type="radio" name="crop" value={crop} onSelect={handleCropChange}/>
                {crop}
              </p></label>
            ))}
          </div>

          {/* Season Select */}
          <div><label>
              <p>Season</p>
              <select defaultValue="" onChange={handleSeasonChange}>
              <option value="" disabled hidden>Select Season</option>
              {seasonList.map((season) => (
                <option value={season}>{season}</option>
              ))}
            </select>
          </label></div>
        </div>
      </div>
    </div>
  );
}

function CropProduction() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Crop Production</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

function DiseaseImpactEstimates() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Disease Impact Estimates</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

function TreatmentCostEstimates() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Treatment Cost Estimates</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

function HarvestEstimates() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Harvest Estimates</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

function CostBenefitSummary() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Cost-Benefit Summary</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

export default Disease;
