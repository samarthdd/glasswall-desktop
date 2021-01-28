import  React , { useEffect } from "react";

import FileAttributes      from "./FileAttributes"
import ThreatAnalysis      from "./ThreatAnalysis"
import RenderAnalysis      from "./RenderAnalysis"

function original_extension(file_name:string) {
    return file_name?.split('.').pop()
}


type AnalysisResult ={
    analysis      : any| undefined
}

export default function FileAnalysis({analysis}:AnalysisResult)  {
    const [result , setResult] = React.useState(analysis);

    return (
        <div id='file-stats'>
            <h2>File Analysis</h2>

            <FileAttributes file_name           = {analysis.filename}
                            file_size           = {analysis.fileSize}
                            file_mime           = {original_extension(analysis.filename)}
                            file_type           = {analysis.threat_analysis.fileType}
                            original_file_size  = {analysis.threat_analysis.fileSize}
                            file_version        = {analysis.threat_analysis.fileVersion} />
            <br />
            <ThreatAnalysis analysis             ={analysis}
                            level               ={analysis.threat_level}
                             />
            <br />
            <RenderAnalysis
                            remediations        = {analysis.threat_analysis.remediations}
                            sanitisations       = {analysis.threat_analysis.sanitisations}
                            issues              = {analysis.threat_analysis.issues}    
            />

                            
        </div>
    )
}