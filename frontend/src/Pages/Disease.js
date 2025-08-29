import React from "react";
import { useNavigate } from "react-router-dom";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function Disease() {
  // States for input


  return (
    <>
      <title>Disease Risk</title>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="Disease Risk" />
        <div style={{ flex: 1, padding: "1rem" }}>
          <div style={{display: "flex"}}>
            <RegionCropSeason />
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

function RegionCropSeason() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <label><h1>Region, Crop & Season</h1></label>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        <p>Text</p>
        <p>Line 2</p>
        <p>3</p>
      </div>
    </div>
  );
}

function CropProduction() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <label><h1>Crop Production</h1></label>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

function DiseaseImpactEstimates() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <label><h1>Disease Impact Estimates</h1></label>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

function TreatmentCostEstimates() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <label><h1>Treatment Cost Estimates</h1></label>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

function HarvestEstimates() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <label><h1>Harvest Estimates</h1></label>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

function CostBenefitSummary() {
  return(
    <div style={{flex: 1, padding: "1rem"}}>
      <label><h1>Cost-Benefit Summary</h1></label>
      <div style={{flex: 1, padding: "1rem", border: "1px solid cyan", borderRadius: '10px'}}>
        Text
      </div>
    </div>
  );
}

export default Disease;
