// Quick example of how the API is called from the frontend

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function APITest() {
    
    return(
        <>
            <Top />
            <title>API Test</title>
            <div className="panel-bottom">
                <Sidebar curWindow="APITest" />
                <div>
                    <div style={{display: "flex", margin: "5rem"}}>
                        <DisplayZones />
                        <span style={{paddingLeft: "5rem"}}>
                            <DisplayLocations />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
} 


// Component example
function DisplayZones() {
    // Example query
    // I (believe) best practice is to have a separate js file with every query needed
    const GET_ZONES = gql`
        query {
            zones {
                zone_name
            }
        }`;

    // Query response is an array of JSON objects
    const { loading, error, data } = useQuery(GET_ZONES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <p>Zones</p>
            <div className="select is-primary">
            <select defaultValue={""} >
                <option value="" disabled>
                    -- Zones --
                </option>
                {data.zones.map(zone => <option key={zone.zone_name}>{zone.zone_name}</option>)};
            </select>
            </div>
        </div>
    )
}


// Location example with two drop-down tables
function DisplayLocations() {
    
    const GET_ZONES = gql`
        query {
            locations {
                sub_region
                region
            }
        }`;

    const { loading, error, data } = useQuery(GET_ZONES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <p>Sub Region</p>
            <div className="select is-primary">
            <select defaultValue={""} >
                <option value="" disabled>
                    -- Sub Regions --
                </option>
                {data.locations.map(location => <option key={location.sub_region}>{location.sub_region}</option>)};
            </select>
            </div>
            <p>Region</p>
            <div className="select is-primary">
            <select defaultValue={""} >
                <option value="" disabled>
                    -- Regions --
                </option>
                {data.locations.map(location => <option key={location.region}>{location.region}</option>)};
            </select>
            </div>
        </div>
        
    )
}

export default APITest;