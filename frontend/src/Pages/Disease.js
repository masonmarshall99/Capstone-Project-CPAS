import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react"
import { GET_REGIONS, GET_SUBREGIONS, GET_CROPS, GET_SEASONS, GET_DISEASES } from "./../Query"

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
              region={region}
              subregion={subregion}
              crop={crop}
              season={season}
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
              disease={disease} 
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

function RegionCropSeason({region, subregion, crop, season, setRegion, setSubregion, setCrop, setSeason}) {
  
  const handleRegionChange = (event) => {
    setRegion(event.target.value)
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

  function SelectRegion() {
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

  function SelectSubregion() {
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

  function SelectCrop() {
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

  function SelectSeason() {
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

  return(
    <div class="is-flex is-flex-direction-column">
      <p class="is-size-4">Region, Crop & Season</p>
      <div class="box is-flex is-flex-direction-row is-justify-content-space-evenly">
        
        {/* Region Select */}
        <SelectRegion/>

        {/* Subregion Select */}
        <SelectSubregion/>

        {/* Crop Select */}
        <SelectCrop/>
        
        {/* Season Select */}
        <SelectSeason/>

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

function DiseaseImpactEstimates({disease, setDisease, incidence, setIncidence, areaOfEffect, setAreaOfEffect, severity, setSeverity}) {
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

  function SelectDisease() {
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

  return(
    <div class="is-flex is-flex-direction-column">
      <p class="is-size-4">Disease Impact Estimates</p>
      <div class="box is-flex is-flex-direction-column is-justify-content-space-evenly">
        <div class="columns">
          
          {/* Disease Select */}
          <SelectDisease/>

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
    <div class="is-flex is-flex-direction-column">
      <p class="is-size-4">Harvest Estimates</p>
      <div class="box is-flex is-flex-direction-column is-justify-content-space-evenly">
        <div class="columns">
          
          {/* Market Price */}
          <div class="column is-5 field">
            <label>
              <p>Market Price ($/t)</p>
              <p class="control has-icons-left">
                <input class="input is-primary" type="number" min="0" onChange={handlePriceChange}/>
                <span class="icon is-left is-small">
                  <i class="fas fa-dollar-sign"></i>
                </span>
              </p>
            </label>
          </div>

          {/* Downgraded Price */}
         <div class="column is-5 field">
            <label>
              <p>Downgraded Price ($/t)</p>
              <p class="control has-icons-left">
                <input class="input is-primary" type="number" min="0" onChange={handleDowngradePriceChange}/>
                <span class="icon is-left is-small">
                  <i class="fas fa-dollar-sign"></i>
                </span>
              </p>
            </label>
          </div>

        </div>
        <div>

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
    <div class="is-flex is-flex-direction-column mt-3">
      <p class="is-size-4">Cost-Benefit Summary</p>
      <div class="box is-flex is-flex-direction-column is-justify-content-space-evenly">
        Text
      </div>
    </div>
  );
}

export default Disease;
