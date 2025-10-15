import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

import AustraliaMap from "../Maps/Australia";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

const sampleData = [
  { name: '2019', yield: 4000, price: 2400 },
  { name: '2020', yield: 3000, price: 1398 },
  { name: '2021', yield: 2000, price: 9800 },
  { name: '2022', yield: 2780, price: 3908 },
  { name: '2023', yield: 1890, price: 4800 },
];

function Historical() {
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
                <h3 className="title is-5" style={{ marginBottom: "0.5rem" }}>Growing Season Margins</h3>
                {/* Example Recharts Bar Chart. Replace with actual data. */}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width = {500}
                    height = {300}
                    data = {sampleData}
                    margin = {{
                      top: 5, right: 10, left: 10, bottom: 5,
                    }} >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend verticalAlign="top" />
                      <Bar dataKey="yield" fill="#8884d8" />
                      <Bar dataKey="price" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="column is-full-mobile is-half-table is-half-desktop">
              <div className="box table-container" style={{ aspectRatio: "16 / 9", width: "100%" }}>
                <table className="table is-striped is-fullwidth is-hoverable">
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Crop</th>
                      <th>Season</th>
                      <th>Disease</th>
                      <th>Gross Revenue ($M)</th>
                      <th>Production Cost ($M)</th>
                      <th>Gross Margin ($M)</th>
                      <th>ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      { /* Sample Data, replace with actual data */ }
                      <td>New South Wales</td>
                      <td>Wheat</td>
                      <td>2023</td>
                      <td>None</td>
                      <td>500</td>
                      <td>300</td>
                      <td>200</td>
                      <td>1.67</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="column is-full-mobile is-half-table is-half-desktop">
              <div className="box" style={{ aspectRatio: "16 / 9", width: "100%", height: "100%" }}>
                {/* Example Recharts Scatter Chart. Replace with actual data. */}
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    width={500}
                    height={300}
                    margin={{
                      top: 20, right: 20, bottom: 10, left: 10,
                    }}
                  >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="yield" name="Yield" unit="t/ha" />
                    <YAxis type="number" dataKey="price" name="Price" unit="$" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="A school" data={sampleData} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Historical;
