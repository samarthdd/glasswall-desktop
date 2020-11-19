import React from 'react';
import './FileAnalysis.css'

function original_extension(file_name:string) {
  return file_name?.split('.').pop()
}

type Threat={
    analysis: any
    level: string
}

function ThreatAnalysis({analysis,level}: Threat) {
  
  const getThreatValue = (name:string)=>{
    let value: string;
    value ="";

    if(name == "File Extensions match"){
        if(analysis.threat_analysis.fileType == original_extension(analysis.filename)){
          value = "ok"
            
        }else{
          value = "extensions didn't match " +  original_extension(analysis.filename) +" != " + analysis.threat_analysis.fileType
        }
        console.log("analysis.threats value " +value )
    }
    return value;
    
  }
  return(
    <div className="file-attributes table-container">
      <h1 className={`table-header threat-${level}`}>Threat Level: {level}</h1>
      <table>
        <tbody className="table-body">
            { analysis.threats.map((threat:any) => {
                return (
                    <tr>
                        <td><b>{threat.name} </b></td>
                        <td className={`threat-item-${threat.level}`}>{threat.name == "File Extensions match" ?getThreatValue(threat.name):threat.value}</td>
                    </tr>
                )})}
        </tbody>
      </table>
    </div>)
}

export default ThreatAnalysis;
