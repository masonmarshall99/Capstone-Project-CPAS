import { useCallback, useState, useEffect} from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useDropzone } from "react-dropzone";

import Top from "../Styling/Top";
import Sidebar from "../Styling/Sidebar";
import { useAuth } from "../CheckAuth";

import { ADD_CSV_ROW } from "../Query";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";
import "./../Styling/CSS/FileUpload.css";

function FileUpload() {
    return(
        <>
            <Top />
            <title>File Upload</title>
            <div className="panel-bottom">
                <Sidebar curWindow="File Upload" />
                <div>
                    <FileDropzone/>
                </div>
            </div>
        </>
    );
} 

function FileDropzone() {
    const [fileContent, setFileContent] = useState();
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState();
    const [completed, setCompleted] = useState(0);
    const [addToDatabase, { data, loading, error }] = useMutation(ADD_CSV_ROW);

    const GetUser = () => {
        const { loading, user, fetchUser } = useAuth()
        return user
        } 

    const user = GetUser();

    let fileName = null;
    
    //Logging
    // useEffect(() => console.log(total), [total]);
    // useEffect(() => console.log(fileContent), [fileContent]);
    // useEffect(() => console.log(completed), [completed]);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileReader = new FileReader;
        
        fileReader.onabort = () => console.log('File read aborted');
        fileReader.onerror = () => console.log('An error has occurred while reading the file');
        fileReader.onload = (e) => {
            const content = e.target.result; 
            const array = parseCSV(content)

            const extension = fileName.split('.').pop();

            if (user==null || !user.is_staff){
                setStatus("Only Admins can upload files")
            }
            else {
                if(extension != "csv")
                {
                    setStatus("Invalid File Type (CSV Only)")
                }
                else {
                    setTotal(array.length)
                    setFileContent(array);
                    mutate(array)
                }
            }
        }
        fileName = file.name
        fileReader.readAsText(file)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const parseCSV = (text) => {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        return values;
        });
    };

    const mutate = async (array) => {
        try{
            for (const row of array) {
                await addToDatabase({
                    variables: {
                        zone_name: row[0],
                        region_name: row[1],
                        sub_region: row[2],
                        year: row[3],
                        crop_name: row[4],
                        area_hectares: parseFloat(row[5]),
                        value_tonnes: parseFloat(row[6]),
                        disease_group: row[7],
                        disease_name: row[8],
                        disease_presence_status: row[9],
                        dis_inc_year_percent: parseFloat(row[10]),
                        dis_inc_area_percent: parseFloat(row[11]),
                        dis_severity_without_control_percent: parseFloat(row[12]),
                        dis_severity_with_control_percent: parseFloat(row[13]),
                        dis_severity_control_genetic_cont_percent: parseFloat(row[14]),
                        dis_severity_control_cultural_cont_percent: parseFloat(row[15]),
                        dis_severity_control_pesticide_cont_percent: parseFloat(row[16]),
                        avg_commodity_price: parseFloat(row[17]),
                        fungicide_resistance_risk: row[18]
                    }
                })
                setCompleted(completed=>completed+1)
            }
            setCompleted(0)
            setStatus("")
        }
         catch(error){
            console.error('Error updating items:', error);
            setStatus('Error updating items: '+ error)
         }
    }
    if (loading) {
        return(
            <div>
                <div className="container">
                    <aside>
                        <h1 className="title">File Upload</h1>
                        <div className="label">Uploading... {completed} of  {total} completed</div>
                    </aside>
                    <div className="box">
                        <div {...getRootProps()} className="file-upload">
                            <input {...getInputProps()} />{
                                isDragActive ?
                                <p>Upload File</p> :
                                <p className="label">Drag and drop a csv file, or click to select file</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (error) {
        return(
            <div>
                <div className="container">
                    <aside>
                        <h1 className="title">File Upload</h1>
                        <div className="label">{error}</div>
                    </aside>
                    <div className="box">
                        <div {...getRootProps()} className="file-upload">
                            <input {...getInputProps()} />{
                                isDragActive ?
                                <p></p> :
                                <p className="label">Drag and drop a csv file, or click to select file</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="container">
                <aside>
                    <h1 className="title">File Upload</h1>
                    <div className="label">{status}</div>
                </aside>
                <div className="box">
                    <div {...getRootProps()} className="file-upload">
                        <input {...getInputProps()} />{
                            isDragActive ?
                            <p></p> :
                            <p className="label">Drag and drop a csv file, or click to select file</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileUpload;