import React from "react";
import { useState } from "react";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import { SelectRegion, SelectSubregion, SelectCrop, SelectSeason, SelectDisease } from "./../Selector"

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
  const [otherOperationCost, setOtherOperationCost] = useState(null)

  // Inputs for Harvest Estimates
  const [price, setPrice] = useState(null)
  const [downgradePrice, setDowngradePrice] = useState(null)
  const [yieldLoss, setYieldLoss] = useState(50)

  return (
    <>
      <title>Disease Risk</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <Top />
      <div
        style={{
          display: "flex",
          height: `100%`,
          gap: "12px",
        }}
      >
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
              setOtherOperationCost={setOtherOperationCost}/>
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
            <CostBenefitSummary 
            area={area}
            yieldRate={yieldRate}
            incidence={incidence}
            areaOfEffect={areaOfEffect}
            severity={severity}
            seedCost={seedCost}
            firstApplicationCost={firstApplicationCost}
            secondApplicationCost={secondApplicationCost}
            otherOperationCost={otherOperationCost}
            price={price}
            downgradePrice={downgradePrice}
            yieldLoss={yieldLoss}
            />
          </div>
          <div class="row">
          </div>
        </div>
      </div>
    </>
  );
}

function RegionCropSeason({region, subregion, crop, season, setRegion, setSubregion, setCrop, setSeason}) {
  
  const handleRegionChange = (event) => {
    setRegion(event.target.value)
    setSubregion(null)
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
        <SelectRegion
        region={region}
        handleRegionChange={handleRegionChange}
        />

        {/* Subregion Select */}
        <SelectSubregion
        region={region}
        subregion={subregion}
        handleSubregionChange={handleSubregionChange}
        />

        {/* Crop Select */}
        <SelectCrop
        crop={crop}
        handleCropChange={handleCropChange}
        />
        
        {/* Season Select */}
        <SelectSeason
        season={season}
        handleSeasonChange={handleSeasonChange}
        />

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
          <SelectDisease
          disease={disease}
          handleDiseaseChange={handleDiseaseChange}
          />

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

function TreatmentCostEstimates({setSeedCost, setFirstApplicationCost, setSecondApplicationCost, setOtherOperationCost}) {

  const handleSeedChange = (event) => {
    setSeedCost(event.target.value)
  }

  const handleFirstApplicationChange = (event) => {
    setFirstApplicationCost(event.target.value)
  }

  const handleSecondApplicationChange = (event) => {
    setSecondApplicationCost(event.target.value)
  }

  const handleOtherOperationChange = (event) => {
    setOtherOperationCost(event.target.value)
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
                <input class="input is-primary" type="number" min="0" onChange={handleOtherOperationChange}/>
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

function CostBenefitSummary({area, yieldRate, incidence, areaOfEffect, severity, seedCost, firstApplicationCost, secondApplicationCost, otherOperationCost, price, downgradePrice, yieldLoss}) {
  
  const grossRev = Math.round(area * yieldRate * price /1_000_000 * 100)/100
  const grossRev_pha = Math.round(yieldRate * price * 100)/100 

  const valueLossToDisease = Math.round((1 - (yieldLoss/100)) * (incidence/100) * (areaOfEffect/100) * (severity/100) * area * yieldRate * price /1_000_000 * 100)/100
  const valueLossToDisease_pha = Math.round((1 - (yieldLoss/100)) * (incidence/100) * (areaOfEffect/100) * (severity/100) * yieldRate * price * 100)/100

  const valueLossToQuality = Math.round((yieldLoss/100) * area * yieldRate * downgradePrice /1_000_000 * 100)/100
  const valueLossToQuality_pha = Math.round((yieldLoss/100) *  yieldRate * downgradePrice * 100)/100

  const productionCost = Math.round(( 1 * seedCost +  1 * firstApplicationCost +  1 * secondApplicationCost +  1 * otherOperationCost) * area / 1_000_000 * 100)/100
  const productionCost_pha = Math.round(( 1 * seedCost +  1 * firstApplicationCost +  1 * secondApplicationCost +  1 * otherOperationCost) * 100)/100

  const netBenefit = Math.round((grossRev - (valueLossToDisease + valueLossToQuality + productionCost)) * 100)/100
  const netBenefit_pha = Math.round((grossRev_pha - (valueLossToDisease_pha + valueLossToQuality_pha + productionCost_pha)) * 100)/100

  const ROI = Math.round(netBenefit/productionCost * 10)/10

  return(
    <div class="is-flex is-flex-direction-column mt-3">
      <p class="is-size-4">Cost-Benefit Summary</p>
      <div class="box is-flex is-flex-direction-column is-justify-content-space-evenly is-gap-2">
        <p>Total Gross Revenue: <b>${grossRev}M (${grossRev_pha}/ha)</b></p>
        <p>Value Loss To Disease: <b>${valueLossToDisease}M (${valueLossToDisease_pha}/ha)</b></p>
        <p>Value Loss to Downgrade: <b>${valueLossToQuality}M (${valueLossToQuality_pha}/ha)</b></p>
        <p>Total Production Cost: <b>${productionCost}M (${productionCost_pha}/ha)</b></p>
        <p>Net Revenue: <b>${netBenefit}M (${netBenefit_pha}/ha)</b></p>
        <p>Return on Investment (ROI): <b>{ROI}</b></p>
      </div>
    </div>
  );
}


export default Disease;
