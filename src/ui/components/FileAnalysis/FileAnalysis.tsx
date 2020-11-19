import  React , { useEffect } from "react";

import FileAttributes      from "./FileAttributes"
import ThreatAnalysis      from "./ThreatAnalysis"
import RenderAnalysis      from "./RenderAnalysis"

function original_extension(file_name:string) {
    return file_name?.split('.').pop()
}


// function parse_xml_report(xml_report,setResult) {
//     if (xml_report === 'report not found')
//         return

//     var XMLParser = require("react-xml-parser");
//     var analysisReport  = new XMLParser().parseFromString(xml_report)
//     if (analysisReport) {
//         var sanitisations   = analysisReport.getElementsByTagName("gw:SanitisationItem");
//         var remediations    = analysisReport.getElementsByTagName("gw:RemedyItem");
//         var issues          = analysisReport.getElementsByTagName("gw:IssueItem");
//         var fileType        = analysisReport.getElementsByTagName("gw:FileType")[0].value;
//         var fileSize        = analysisReport.getElementsByTagName("gw:TotalSizeInBytes")[0].value;
//         var fileVersion     = analysisReport.getElementsByTagName("gw:Version")[0].value;
//         //const target = remediations
//         setResult({ 'sanitisations': sanitisations,
//                     'remediations' : remediations ,
//                     'issues'       : issues       ,
//                     'fileType'     : fileType     ,
//                     'fileSize'     : fileSize     ,
//                     'fileVersion'  : fileVersion  })
//     }


// }

type AnalysisResult ={
    analysis      : any| undefined
}

export default function FileAnalysis({analysis}:AnalysisResult)  {
    const [result , setResult] = React.useState(analysis);

    // useEffect(() => {
    //     console.log("analysis.threats " + analysis.threats )
    //     analysis.threats =  analysis.threats.map((threat:any)=>{
    //         if(threat.name = "File Extensions match"){
    //             if(analysis.threat_analysis.fileType == original_extension(analysis.filename)){
    //                 threat.value = "ok"
                    
    //             }else{
    //                 threat.value = "extensions didn't match" +  original_extension(analysis.filename) +"!= " + analysis.threat_analysis.fileTyp
    //             }
    //             console.log("analysis.threats value " +threat.value )
    //         }
    //         return threat;
    //     });
    //     console.log("analysis.threats out " + analysis.threats )

    // },[])
    
    

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