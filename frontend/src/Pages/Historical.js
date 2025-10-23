import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, LabelList, Label } from 'recharts';

import AustraliaMap from "../Maps/Australia";
import { SelectDisease, SelectRegion, SelectSubregion, SelectCrop, SelectSeason } from "../Selector";
import { GET_CROP_AREAS, GET_SEASONS, GET_DISEASE_CONTROLS } from "../Query";


import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";


function Historical() {
  const [region, setRegion] = useState("")
  const [subregion, setSubregion] = useState("")
  const [crop, setCrop] = useState("")
  const [season, setSeason] = useState("")
  const [disease, setDisease] = useState("")

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

  const handleDiseaseChange = (event) => {
    setDisease(event.target.value)
  }

  const handleReset = (event) => {
    setRegion("")
    setSubregion("")
    setCrop("")
    setSeason("")
    setDisease("")
  }

  return (
    <>
      <Top />
      <div className="panel-bottom">
        <div className="is-hidden-mobile">
          <Sidebar curWindow="Historical Analysis" />
        </div>
        <div style={{ flex: 1, padding: "1rem" }}>
          {/* Page Header */}
          <div className="box is-hidden-mobile">
            <h2 className="title is-5">5-Year Average Yield: <span className="has-text-danger">IMPLEMENT</span>. Average Yield for Current Season: <span className="has-text-link">IMPLEMENT</span>.</h2>
            <p className="subtitle is-6">Average commodity price: <span className="has-text-success">IMPLEMENT</span>.</p>
          </div>

          <div className="box is-hidden-tablet is-hidden-desktop">
            <h2 className="title is-5">5-Year Average Yield: <span className="has-text-danger">IMPLEMENT</span>. </h2>
            <h2 className="title is-5">Average Yield for Current Season: <span className="has-text-link">IMPLEMENT</span>.</h2>
            <br />
            <p className="subtitle is-6">Average commodity price: <span className="has-text-success">IMPLEMENT</span>.</p>
          </div>

          {/* Selection Inputs */}
          <div className="box is-flex is-gap-6">
            <SelectRegion
            region={region}
            handleRegionChange={handleRegionChange}
            />
            <SelectSubregion
            region={region}
            subregion={subregion}
            handleSubregionChange={handleSubregionChange}
            />
            <SelectCrop
            crop={crop}
            handleCropChange={handleCropChange}
            />
            <SelectSeason
            season={season}
            handleSeasonChange={handleSeasonChange}
            />
            <SelectDisease
            disease={disease}
            handleDiseaseChange={handleDiseaseChange}
            />
            <input class="is-primary button mt-4" type="reset" content="Reset" 
            style={{height: "3rem"}} onClick={handleReset}
            />
          </div>

          {/* Tabbed Section Dispaly */}
          <div className="tabs is-toggle">
            <ul>
              <li className="is-active"><a>Overview</a></li>
              <li><a>More tabs to be added</a></li>
            </ul>
          </div>

          {/* Chart Section */}
          <div className="columns is-variable is-5 is-multiline">
            <div className="column is-full-mobile is-half-table is-half-desktop">
              <div className="box" style={{ aspectRatio: "16 / 9", width: "100%" }}>
                <h3 className="title is-5" style={{ marginBottom: "1rem" }}>Select Zone for More Information</h3>
                <AustraliaMap />
              </div>
            </div>
            <div className="column is-full-mobile is-half-table is-half-desktop">
              <div className="box" style={{ aspectRatio: "16 / 9", width: "100%", height: "100%" }}>
                <h3 className="title is-5" style={{ marginBottom: "0.5rem" }}>Growing Season Yields</h3>
                {/* Example Recharts Bar Chart. Replace with actual data. */}
                <YieldChart
                  region={region}
                  subregion={subregion}
                  crop={crop}
                  season={season}
                  disease={disease}
                />
              </div>
            </div>

            <div className="column is-full-mobile is-half-table is-half-desktop">
              {/* Table Section */}
              <div className="box" style={{ aspectRatio: "16 / 9", width: "100%", height: "100%", overflowY: "auto" }}>
                <h3 className="title is-5" style={{ marginBottom: "1rem" }}>Detailed Yield Data</h3>
                <YieldTable
                  region={region}
                  subregion={subregion}
                  crop={crop}
                  season={season}
                  disease={disease}
                />
              </div>
              
            </div>
            <div className="column is-full-mobile is-half-table is-half-desktop">
              <div className="box" style={{ aspectRatio: "16 / 9", width: "100%", height: "100%" }}>
                {/* Example Recharts Scatter Chart. Replace with actual data. */}
                <h3 className="title is-5" style={{ marginBottom: "0.5rem" }}>Average Disease Severity (Controlled vs Uncontrolled)</h3>
                <DiseaseScatterPlot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function YieldChart({region, subregion, crop, season, disease}) {
  const {loading, error, data} = useQuery(GET_CROP_AREAS)
  if (loading) return (
    <div>Loading...</div>
  )
  if (error) return (
    <div>Error!</div>
  )

  /* Reorganize full data to be single-level */
  let crop_areas = data.cropAreas.map((crop_area) => (
    {
      crop: `${crop_area.crop.crop_name}`,
      zone: `${crop_area.location.zone.zone_name}`,
      region: `${crop_area.location.region.region_name}`,
      subregion: `${crop_area.location.subregion}`,
      season: `${crop_area.season.year}`,
      area: `${crop_area.area_hectares}`,
      value: `${crop_area.value_tonnes}`
    }
  ))
  
  // Filter
  if (!(subregion == "")) {
    crop_areas = crop_areas.filter((crop_area) => crop_area.subregion == subregion)
  }
  else if (!(region == "")) {
    crop_areas = crop_areas.filter((crop_area) => crop_area.region == region)
  }
  if (!(crop == "")) {
    crop_areas = crop_areas.filter((crop_area) => crop_area.crop == crop)
  }
  if (!(season == "")) {
    crop_areas = crop_areas.filter((crop_area) => crop_area.season == season)
  }

  // Reduce
  let seasonalData = crop_areas.reduce((acc, currentItem) => {
    let {crop, zone, region, subregion, season, area, value} = currentItem

    if (!acc[season]) {
      acc[season] = {season, value: 0}
    }
    acc[season].value += 1 * value

    return acc
  }, {})
  
  let graphData = Object.values(seasonalData)
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width = {500}
        height = {300}
        data = {graphData}
        margin = {{
          top: 5, right: 10, left: 10, bottom: 5,
        }} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="season" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar name="Total Yield" dataKey="value" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
  )
}

function YieldTable({region, subregion, crop, season, disease}) {
  const {loading, error, data} = useQuery(GET_CROP_AREAS);
  if (loading) return (
    <div>Loading...</div>
  );

  if (error) return (
    <div>Error!</div>
  );

  /* Reorganize full data to be single-level */
  let crop_areas = data.cropAreas.map((crop_area) => (
    {
      crop: `${crop_area.crop.crop_name}`,
      zone: `${crop_area.location.zone.zone_name}`,
      region: `${crop_area.location.region.region_name}`,
      subregion: `${crop_area.location.subregion}`,
      season: `${crop_area.season.year}`,
      area: `${crop_area.area_hectares}`,
      value: `${crop_area.value_tonnes}`
    }
  ));

  // Filter
  if (!(region == "")) {
    crop_areas = crop_areas.filter((crop_area) => crop_area.region == region);
  }
  if (!(crop == "")) {
    crop_areas = crop_areas.filter((crop_area) => crop_area.crop == crop);
  }
  if (!(season == "")) {
    crop_areas = crop_areas.filter((crop_area) => crop_area.season == season);
  }

  let seasonalData = crop_areas.reduce((acc, currentItem) => {
    let {crop, zone, region, subregion, season, area, value} = currentItem

    const key = `${season}-${region}-${crop}`;

    if (!acc[key]) {
      acc[key] = {
        season,
        region: region,
        crop: crop,
        area: area,
        value: 0
      }
    }
    acc[key].value += 1 * value

    return acc
  }, {})

  const tableData = Object.values(seasonalData);

  return (
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Region</th>
            <th>Season</th>
            <th>Crop</th>
            <th>Area (hectares)</th>
            <th>Value (tonnes)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.region}</td>
              <td>{row.season}</td>
              <td>{row.crop}</td>
              <td>{row.area}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
  
}

function DiseaseScatterPlot() {
  const {loading, error, data} = useQuery(GET_DISEASE_CONTROLS);
  if (loading) return (
    <div>Loading...</div>
  );

  if (error) return (
    <div>Error!</div>
  );

  /* Reorganize full data to be single-level */
  let disease_data = data.diseasePresences.map((disease_presence) => (
    {
      disease: `${disease_presence.disease.disease_name}`,
      with_control: `${disease_presence.disease_severity_with_control_percentage}`,
      without_control: `${disease_presence.disease_severity_without_control_percentage}`
    }
  ));

  const groupedData = Object.values(
  data.diseasePresences.reduce((acc, d) => {
    const name = d.disease.disease_name;
    if (!acc[name]) {
      acc[name] = {
        disease: name,
        with_control: Number(d.disease_severity_with_control_percentage),
        without_control: Number(d.disease_severity_without_control_percentage),
      };
    } else {
      // Optional averaging if duplicates exist
      acc[name].with_control = (acc[name].with_control + Number(d.disease_severity_with_control_percentage)) / 2;
      acc[name].without_control = (acc[name].without_control + Number(d.disease_severity_without_control_percentage)) / 2;
    }
    return acc;
  }, {})
);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        width={500}
        height={300}
        margin={{
          top: 20, right: 20, bottom: 10, left: 10,
        }}>
        <CartesianGrid />
        <XAxis label= "Severity (Without Control)" type="number" dataKey="without_control" name="Severity (Without Control)" unit="%"/>
        <YAxis type="number" dataKey="with_control" name="Severity (With Control)" unit="%">
          <Label 
            value="Severity (With Control)"
            angle={-90} position="insideLeft"
          />

          </YAxis>
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const p = payload[0].payload;
              return (
                <div className="custom-tooltip" style={{ backgroundColor: '--back-color', border: '1px solid #ccc', padding: '10px', opacity: 1 }}>
                  <p><strong>{p.disease}</strong></p>
                  <p>Severity (With Control): {p.with_control}%</p>
                  <p>Severity (Without Control): {p.without_control}%</p>
                </div>
              )
            }
          }} 
        />
        <Scatter name="Disease Severity" data={groupedData} fill="#8884d8"/>

      </ScatterChart>
    </ResponsiveContainer>
  )

}

export default Historical;
