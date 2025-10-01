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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="Disease Risk" />
        <div class="rows mx-auto mt-3">
          <div class="row columns">
            <div class="column">
              <RegionCropSeason 
              setRegion={setRegion}
              setSubregion={setSubregion}
              setCrop={setCrop}
              setSeason={setSeason} />
            </div>
            <div class="column">
              <CropProduction 
              area={area}
              setArea={setArea}
              yieldRate={yieldRate}
              setYieldRate={setYieldRate} />
            </div>
          </div>
          <div class="row columns">
            <div class="column">
              <DiseaseImpactEstimates 
              setDisease={setDisease}
              incidence={incidence}
              setIncidence={setIncidence}
              areaOfEffect={areaOfEffect}
              setAreaOfEffect={setAreaOfEffect}
              severity={severity}
              setSeverity={setSeverity}/>
            </div>
            <div class="column">
              <TreatmentCostEstimates 
              setSeedCost={setSeedCost}
              setFirstApplicationCost={setFirstApplicationCost}
              setSecondApplicationCost={setSecondApplicationCost}
              setOtherApplicationCost={setOtherApplicationCost}/>
            </div>
          </div>
          <div class="row">
            <HarvestEstimates 
            setPrice={setPrice}
            setDowngradePrice={setDowngradePrice}
            yieldLoss={yieldLoss}
            setYieldLoss={setYieldLoss}/>
          </div>
          <div class="row">
            <CostBenefitSummary />
          </div>
        </div>
      </div>
    </>
  );
}

function RegionCropSeason({setRegion, setSubregion, setCrop, setSeason}) {

  const regionList = ["Northern", "Southern", "Western"] // TODO: Query for regions
  const cropList = ["Barley", "Chickpeas", "Wheat"] // TODO: Query for crops
  const seasonList = ["21/22", "22/23", "23/24", "24/25"] // TODO: Query for seasons

  var subregionList = [] // Will be filled in when region is selected
  
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
    <div class="is-flex is-flex-direction-column">
      <p class="is-size-4">Region, Crop & Season</p>
      <div class="box is-flex is-flex-direction-row is-justify-content-space-evenly">
        
        {/* Region Select */}
        <div>
          <label>
            <p>Region</p>
            <div class="select is-primary">
              <select defaultValue="" onChange={handleRegionChange}>
                <option value="" disabled hidden>Select Region</option>
                {regionList.map((region) => (
                  <option value={region}>{region}</option>
                ))}
              </select>
            </div>
          </label>
        </div>

        {/* Subregion Select */}
        <div>
          <label>
              <p>Subregion</p>
              <div class="select is-primary">
                <select defaultValue="" onChange={handleSubregionChange}>
                  <option value="" disabled hidden>Select Subregion</option>
                  {subregionList.map((subregion) => (
                    <option value={subregion}>{subregion}</option>
                  ))}
              </select>
            </div>
          </label>
        </div>

        {/* Crop Select */}
        <div class="is-flex is-flex-direction-column">
          <p>Crop</p>
          {cropList.map((crop) => (
            <label class="radio px-1 py-1">
              <input type="radio" name="crop" value={crop} onSelect={handleCropChange}/>
              {crop}
            </label>
          ))}
        </div>

        {/* Season Select */}
        <div>
          <label>
              <p>Season</p>
              <div class="select is-primary">
                <select defaultValue="" onChange={handleSeasonChange}>
                  <option value="" disabled hidden>Select Season</option>
                  {seasonList.map((season) => (
                    <option value={season}>{season}</option>
                  ))}
              </select>
            </div>
          </label>
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
    <div class="is-flex is-flex-direction-column">
      <p class="is-size-4">Crop Production</p>
      <div class="box is-align-items-center">
        <div class="columns">
            
            {/* Planted Area Input */}
            <div class="column is-5">
              <label>
                <p>Planted Area</p>
                <div class="field has-addons">
                  <p class="control">
                    <input class="input is-primary" type="number" onChange={handleAreaChange}/>
                  </p>
                  <p class="control">
                    <a class="button is-static">
                      hectares
                    </a>
                  </p>
                </div>
              </label>
            </div>
            
            {/* Expected Yield Potential Input */}
            <div class="column is-5">
              <label>
                <p>Expected Yield Potential</p>
                <div class="field has-addons">
                  <p class="control">
                    <input class="input is-primary" type="number" onChange={handleYieldChange}/>
                  </p>
                  <p class="control">
                    <a class="button is-static">
                      t/ha
                    </a>
                  </p>
                </div>
              </label>
            </div>

        </div>

        {/* Expected Yield Display */}
        <div>
          <p>Expected yield: {Math.round(area * yieldRate * 1000)/1000} tonnes</p>
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
    <div class="is-flex is-flex-direction-column">
      <p class="is-size-4">Disease Impact Estimates</p>
      <div class="box is-flex is-flex-direction-column is-justify-content-space-evenly">
        <div class="columns">
          
          {/* Disease Select */}
          <div class="column">
            <label>
              <p>Select disease present</p>
              <div class="select is-primary">
                <select defaultValue="" onChange={handleDiseaseChange}>
                  <option value="" disabled hidden>Select Disease</option>
                  {diseaseList.map((disease) => (
                    <option value={disease}>{disease}</option>
                  ))}
                </select>
              </div>
            </label>
          </div>

          {/* Disease Incidince Input */}
          <div class="column">
            <label>
              <p>Disease Incidence (%)</p>
              <input type="range" min="0" max="100" onChange={handleIncidenceChange}/>
              <output>{incidence}</output>
            </label>
          </div>

        </div>
        <div class="columns">

          {/* Disease Area Input */}
          <div class="column">
            <label>
              <p>Affected Area (%)</p>
              <input type="range" min="0" max="100" onChange={handleAreaChange}/>
              <output>{areaOfEffect}</output>
            </label>
          </div>

          {/* Disease Severity */}
          <div class="column">
            <label>
              <p>Disease Severity (%)</p>
              <input type="range" min="0" max="100" onChange={handleSeverityChange}/>
              <output>{severity}</output>
            </label>
          </div>

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
    <div class="is-flex is-flex-direction-column">
      <p class="is-size-4">Treatment Cost Estimates</p>
      <div class="box is-flex is-flex-direction-column is-justify-content-space-evenly">
        <div class="columns">
          
          {/* Seed Cost */}
          <div class="column is-5 field">
            <label>
              <p>Seed/In-furrow Cost ($/ha)</p>
              <p class="control has-icons-left">
                <input class="input is-primary" type="number" min="0" onChange={handleSeedChange}/>
                <span class="icon is-left is-small">
                  <i class="fas fa-dollar-sign"></i>
                </span>
              </p>
            </label>
          </div>

          {/* First Application Cost */}
          <div class="column is-5 field">
            <label>
              <p>First Application Cost ($/ha)</p>
              <p class="control has-icons-left">
                <input class="input is-primary" type="number" min="0" onChange={handleFirstApplicationChange}/>
                <span class="icon is-left is-small">
                  <i class="fas fa-dollar-sign"></i>
                </span>
              </p>
            </label>
          </div>

        </div>
        <div class="columns">
          
          {/* Second Application Cost */}
          <div class="column is-5 field">
            <label>
              <p>Second Application Cost ($/ha)</p>
              <p class="control has-icons-left">
                <input class="input is-primary" type="number" min="0" onChange={handleSecondApplicationChange}/>
                <span class="icon is-left is-small">
                  <i class="fas fa-dollar-sign"></i>
                </span>
              </p>
            </label>
          </div>

          {/* Other Operation Cost */}
          <div class="column is-5 field">
            <label>
              <p>Other Operation Cost ($/ha)</p>
              <p class="control has-icons-left">
                <input class="input is-primary" type="number" min="0" onChange={handleOtherApplicationChange}/>
                <span class="icon is-left is-small">
                  <i class="fas fa-dollar-sign"></i>
                </span>
              </p>
            </label>
          </div>

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
