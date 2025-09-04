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

  // Inputs for Crop Production
  const [area, setArea] = useState(null)
  const [yieldRate, setYieldRate] = useState(null)

  // Inputs for Disease Impact Estimates
  const [disease, setDisease] = useState(null)
  const [incidence, setIncidence] = useState(50)
  const [areaOfEffect, setAreaOfEffect] = useState(50)
  const [severity, setSeverity] = useState(50)

  // Inputs for Treatment Cost Estimates
  const [seedCost, setSeedCost] = useState(null)
  const [firstApplicationCost, setFirstApplicationCost] = useState(null)
  const [secondApplicationCost, setSecondApplicationCost] = useState(null)
  const [otherOperationCost, setOtherApplicationCost] = useState(null)

  // Inputs for Harvest Estimates
  const [price, setPrice] = useState(null)
  const [downgradePrice, setDowngradePrice] = useState(null)
  const [yieldLoss, setYieldLoss] = useState(50)

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
            <CropProduction 
            area={area}
            setArea={setArea}
            yieldRate={yieldRate}
            setYieldRate={setYieldRate}/>
          </div>
          <div style={{display: "flex"}}>
            <DiseaseImpactEstimates 
            setDisease={setDisease}
            incidence={incidence}
            setIncidence={setIncidence}
            areaOfEffect={areaOfEffect}
            setAreaOfEffect={setAreaOfEffect}
            severity={severity}
            setSeverity={setSeverity}/>
            <TreatmentCostEstimates 
            setSeedCost={setSeedCost}
            setFirstApplicationCost={setFirstApplicationCost}
            setSecondApplicationCost={setSecondApplicationCost}
            setOtherApplicationCost={setOtherApplicationCost}/>
          </div>
          <HarvestEstimates 
          setPrice={setPrice}
          setDowngradePrice={setDowngradePrice}
          yieldLoss={yieldLoss}
          setYieldLoss={setYieldLoss}/>
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
    // TODO: Query for subregions in selected region
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
        <div style={{display: "flex", gap: "1rem", justifyContent: "space-evenly"}}>
          
          {/* Region Select */}
          <span><label>
            <p>Region</p>
            <select defaultValue="" onChange={handleRegionChange}>
              <option value="" disabled hidden>Select Region</option>
              {regionList.map((region) => (
                <option value={region}>{region}</option>
              ))}
            </select>
          </label></span>

          {/* Subregion Select */}
          <span><label>
              <p>Subregion</p>
              <select defaultValue="" onChange={handleSubregionChange}>
              <option value="" disabled hidden>Select Subregion</option>
              {subregionList.map((subregion) => (
                <option value={subregion}>{subregion}</option>
              ))}
            </select>
          </label></span>
          
          {/* Crop Select */}
          <span>
            <p>Crop</p>
            {cropList.map((crop) => (
              <label><p>
                <input type="radio" name="crop" value={crop} onSelect={handleCropChange}/>
                {crop}
              </p></label>
            ))}
          </span>

          {/* Season Select */}
          <span><label>
              <p>Season</p>
              <select defaultValue="" onChange={handleSeasonChange}>
              <option value="" disabled hidden>Select Season</option>
              {seasonList.map((season) => (
                <option value={season}>{season}</option>
              ))}
            </select>
          </label></span>

        </div>
      </div>
    </div>
  );
}

function CropProduction({area, setArea, yieldRate, setYieldRate}) {

  const handleAreaChange = (event) => {
    setArea(event.target.value)
  }

  const handleYieldChange = (event) => {
    setYieldRate(event.target.value)
  }

  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Crop Production</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        <div style={{display: "flex", gap: "1rem", justifyContent: "space-evenly"}}>
            
            {/* Planted Area Input */}
            <span>
              <label>
                <p>Planted Area</p>
                <input type="number" style={{width: "50%"}} onChange={handleAreaChange}/> hectares
              </label>
            </span>
            
            {/* Expected Yield Potential Input */}
            <span>
              <label>
                <p>Expected Yield Potential</p>
                <input type="number" style={{width: "50%"}} onChange={handleYieldChange}/> t/ha
              </label>
            </span>
        </div>

        {/* Expected Yield Display */}
        <div style={{padding: "1rem 0rem"}}>
          <h2>Expected yield: {Math.round(area * yieldRate * 1000)/1000} tonnes</h2>
        </div>

      </div>
    </div>
  );
}

function DiseaseImpactEstimates({setDisease, incidence, setIncidence, areaOfEffect, setAreaOfEffect, severity, setSeverity}) {
  const diseaseList = ["A", "B", "C"] // TODO: Query for disease

  const handleDiseaseChange = (event) => {
    setDisease(event.target.value)
  }

  const handleIncidenceChange = (event) => {
    setIncidence(event.target.value)
  }

  const handleAreaChange = (event) => {
    setAreaOfEffect(event.target.value)
  }

  const handleSeverityChange = (event) => {
    setSeverity(event.target.value)
  }

  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Disease Impact Estimates</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        <div style={{display: "flex", gap: "1rem", justifyContent: "space-evenly"}}>
          
          {/* Disease Select */}
          <span>
            <label>
              <p>Select disease present</p>
              <select defaultValue="" onChange={handleDiseaseChange}>
                <option value="" disabled hidden>Select Disease</option>
                {diseaseList.map((disease) => (
                  <option value={disease}>{disease}</option>
                ))}
              </select>
            </label>
          </span>

          {/* Disease Incidince Input */}
          <span>
            <label>
              <p>Disease Incidence (%)</p>
              <input type="range" min="0" max="100" onChange={handleIncidenceChange}/>
              <output>{incidence}</output>
            </label>
          </span>

        </div>
        <div style={{display: "flex", gap: "1rem", justifyContent: "space-evenly"}}>

          {/* Disease Area Input */}
          <span>
            <label>
              <p>Affected Area (%)</p>
              <input type="range" min="0" max="100" onChange={handleAreaChange}/>
              <output>{areaOfEffect}</output>
            </label>
          </span>

          {/* Disease Severity */}
          <span>
            <label>
              <p>Disease Severity (%)</p>
              <input type="range" min="0" max="100" onChange={handleSeverityChange}/>
              <output>{severity}</output>
            </label>
          </span>

        </div>
      </div>
    </div>
  );
}

function TreatmentCostEstimates({setSeedCost, setFirstApplicationCost, setSecondApplicationCost, setOtherApplicationCost}) {

  const handleSeedChange = (event) => {
    setSeedCost(event.target.value)
  }

  const handleFirstApplicationChange = (event) => {
    setFirstApplicationCost(event.target.value)
  }

  const handleSecondApplicationChange = (event) => {
    setSecondApplicationCost(event.target.value)
  }

  const handleOtherApplicationChange = (event) => {
    setOtherApplicationCost(event.target.value)
  }

  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Treatment Cost Estimates</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        <div style={{display: "flex", gap: "1rem", justifyContent: "space-evenly"}}>
          
          {/* Seed Cost */}
          <span><label>
            <p>Seed/In-furrow Cost ($/ha)</p>
            $<input type="number" min="0" style={{width: "80%"}} onChange={handleSeedChange}/>
          </label></span>

          {/* First Application Cost */}
          <span><label>
            <p>First Application Cost ($/ha)</p>
            $<input type="number" min="0" style={{width: "80%"}} onChange={handleFirstApplicationChange}/>
          </label></span>

        </div>
        <div style={{display: "flex", gap: "1rem", justifyContent: "space-evenly"}}>
          
          {/* Second Application Cost */}
          <span><label>
            <p>Second Application Cost ($/ha)</p>
            $<input type="number" min="0" style={{width: "80%"}} onChange={handleSecondApplicationChange}/>
          </label></span>

          {/* Other Operation Cost */}
          <span><label>
            <p>Other Operation Cost ($/ha)</p>
            $<input type="number" min="0" style={{width: "80%"}} onChange={handleOtherApplicationChange}/>
          </label></span>

        </div>
      </div>
    </div>
  );
}

function HarvestEstimates({setPrice, setDowngradePrice, yieldLoss, setYieldLoss}) {
  
  const handlePriceChange = (event) => {
    setPrice(event.target.value)
  }

  const handleDowngradePriceChange = (event) => {
    setDowngradePrice(event.target.value)
  }

  const handleYieldLossChange = (event) => {
    setYieldLoss(event.target.value)
  }

  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <h1>Harvest Estimates</h1>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        <div style={{display: "flex", gap: "1rem", justifyContent: "space-evenly"}}>
          
          {/* Market Price */}
          <span><label>
            <p>Market Price ($/t)</p>
            $<input type="number" min="0" style={{width: "80%"}} onChange={handlePriceChange}/>
          </label></span>

          {/* Downgraded Price */}
          <span><label>
            <p>Downgraded Price ($/t)</p>
            $<input type="number" min="0" style={{width: "80%"}} onChange={handleDowngradePriceChange}/>
          </label></span>

        </div>
        <div style={{display: "flex", gap: "1rem", justifyContent: "space-evenly"}}>

          {/* Yield Loss */}
          <span><label>
          <p>Proportion of yield loss to quality downgrade (%)</p>
              <input type="range" min="0" max="100" onChange={handleYieldLossChange}/>
              <output>{yieldLoss}</output>
          </label></span>

          {/* Average Price Display */}
          <span><label>
          {/* TODO: Investigate the average price statistic used in Harvest Stats for original prototype */}
          </label></span>

        </div>
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
