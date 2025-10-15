/*TODO:
    Write mutation
    Array to Bulk Mutation calls
    User Authentication
    CSS of Drag and Drop 
    Test
*/

import { useCallback, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useDropzone } from 'react-dropzone';

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

import { useAuth } from "../CheckAuth";


function APIAuthTest() {

    const AuthTest = () => {
        const { loading, user, fetchUser } = useAuth()
        console.log("USER STRING \n"+user);
        } 

    AuthTest();

    return(
        <>
            <Top />
            <title>API Test</title>
            <div className="panel-bottom">
                <Sidebar curWindow="CSVUpload" />
                <div>
                    <FileDropzone/>
                </div>
            </div>
        </>
    );
} 



// Component example

function FileDropzone() {
    const [fileContent, setFileContent] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileReader = new FileReader;
        
        fileReader.onabort = () => console.log('File read aborted');
        fileReader.onerror = () => console.log('An error has occurred while reading the file');
        fileReader.onload = (e) => {
            const content = e.target.result;
            const csv = parseCSV(content)
            csv.map(item => {
                    return <li>{item[0]}</li>;
                })
            console.log(csv)
            setFileContent(csv);
        }
        fileReader.readAsText(file)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const parseCSV = (text) => {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        console.log(values)
        // const row = {};
        // headers.forEach((header, index) => {
        //     row[header] = values[index] || '';
        // });
        return values;
        //}).filter(row => Object.values(row).some(value => value !== ''));
        });
    };

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />{
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <aside>
                <h4>Files</h4>
                {/*<ul>{fileContent}</ul>*/}
            </aside>
        </div>
    )
}

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
            }
            regions {
                region_name
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
                {data.regions.map(region => <option key={region.region_name}>{region.region_name}</option>)};
            </select>
            </div>
        </div>
    )
}


export default APIAuthTest;