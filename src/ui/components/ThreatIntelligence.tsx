import * as Utils                       from '../utils/utils'
const fs                                = require('fs-extra')
const path                              = require('path');
const moment                            = require('moment')
const xml2js                            = require('xml2js');
const xpath                             = require("xml2js-xpath");

const create_metadata_file = async (xmlReport:string, xmlFilePath:string, xmlFileName:string, rebuiltFilePath:string, rebuiltFileName:string,basePath:string) =>  {
    if(!fs.existsSync(basePath+'/analysed')){
        fs.mkdirSync(basePath+'/analysed');
    }
    let file_metadata = basePath+'/analysed/'+rebuiltFileName+"_metadata.json"
    const file_sanitized     = rebuiltFilePath+'/'+rebuiltFileName
    const file_xml_report    = xmlFilePath+"/"+xmlFileName

    const date_utc = moment().utc()
    const date_str = date_utc.format('D MMMM Y [at] hh:mm')

    const metadata = {
        "file_name"          : rebuiltFileName,
        "original_file_name" : rebuiltFileName              ,
        "file_mime_type"     : "NA"                         ,
        "sanitized_file_size": 0                            ,
        "sanitized"          : false                        ,
        "exported"           : false                        ,
        "quarantined"        : false                        ,
        "released"           : false                        ,        
        "entry_status"       : "NA"                         ,                
        "date"               : date_str                     ,
        "date_utc"           : date_utc
    }

    if(fs.existsSync(file_sanitized)){
        metadata.sanitized = true
        metadata["entry_status"] = "Sanitized"
    }
    else {
        metadata.quarantined = true
        metadata["entry_status"] = "Quarantined"
    }
    if (fs.existsSync(file_xml_report)){        
        const raw_analysis           = await raw_analysis_create(xmlReport,xmlFilePath,xmlFileName,rebuiltFileName,basePath)
        metadata.file_mime_type      = raw_analysis?.fileType
        metadata.sanitized_file_size = raw_analysis?.fileSize
        let threat_levels = apply_rules(raw_analysis,rebuiltFileName)
        let file_threats = basePath+'/analysed/'+rebuiltFileName+"_threat_levels.json"
        fs.writeJsonSync(file_threats, threat_levels, {spaces: 2}) 
        fs.writeJsonSync(file_metadata, metadata, {spaces: 2})
        //let threatsRet : Threat | undefined         
        let threatsRet = {threat_level:threat_levels.threat_level, threats:threat_levels.threats, threat_analysis: raw_analysis}
        return threatsRet;
    }    
    return {"threat_level" : "Unknown", "threats" : [],"threat_analysis":""}
}

const raw_analysis_create = async (xml_report:string,xmlFilePath:string,xmlFileName:string,rebuiltFileName:string,basePath:string) => {    
    const analysis = await raw_analysis(xml_report)
    if(analysis) {
        let file_raw_analysis_json = basePath+"/analysed/"+rebuiltFileName+"_analysis.json"
        fs.writeJsonSync(file_raw_analysis_json, analysis, {spaces: 2})
        return analysis
    }
}

const raw_analysis = async (xml_data:string) => {
    if (!xml_data)
        return

    const json_data = await Utils.xml_parser(xml_data)    
    const sanitisations = xpath.find(json_data, "//gw:SanitisationItem").map((match:any) => match['gw:TechnicalDescription'].pop())
    const remediations  = xpath.find(json_data, "//gw:RemedyItem"      ).map((match:any) => match['gw:TechnicalDescription'].pop())
    const issue_items   = xpath.find(json_data, "//gw:IssueItem"       ).map((match:any) => match['gw:TechnicalDescription'].pop())
    const fileType      = xpath.find(json_data, "//gw:FileType"        )[0]
    const fileSize      = xpath.find(json_data, "//gw:TotalSizeInBytes")[0]
    const fileVersion   = xpath.find(json_data, "//gw:Version"         )[0]    
    return  {   'sanitisations': sanitisations  ,
                'remediations' : remediations   ,
                'issue_items'  : issue_items    ,
                'fileType'     : fileType       ,
                'fileSize'     : fileSize       ,
                'fileVersion'  : fileVersion    }
}

const apply_rules = (file_data:any, originalFileName:string) =>  {
    const raw_analysis = file_data
    let threats = []
    if ( raw_analysis ) {
        threats.push(rule_file_extension_match(file_data,originalFileName))
        threats.push(rule_macros_detected     (file_data))
        threats.push(rule_javascript_detected (file_data))
        threats.push(rule_metadata_detected   (file_data))
        threats.push(rule_hyperlinks_detected (file_data))
    }
    let threat_level = calculate_threat_level(threats)
    return {"threat_level" : threat_level, "threats" : threats}
}

const calculate_threat_level = (threats:any) =>  {
    let level = 'ok'
    threats.forEach((value:any) =>{
        if (value.level === 'medium') level = 'medium'
    })
    threats.forEach((value:any) =>{
        if (value.level === 'high') level = 'high'
    })
    return level
}

const rule_file_extension_match = (file_data:any,originalFileName:string) =>  {
    const metadata = file_data.metadata;
    const file_type_original = originalFileName.split('.').pop()
    const file_type_rebuild = file_data.fileType
    const name  = 'File Extensions match'
    let level = 'ok'
    let value = 'ok'
    console.log('file_data '+JSON.stringify(file_data))
    if (file_type_rebuild === 'unknown')
    {
        value =  `could not calculate extension of file (original extension was '${file_type_original}')`
        level = 'medium'
    }
    else if (file_type_original !== file_type_rebuild)
    {
        value =  `extensions didn't match ${file_type_original} != ${file_type_rebuild}`
        level = 'high'
    }
    console.log('File match level '+level)
    return { name , value , level}
}

const rule_macros_detected = (file_data:any) =>  {
    const name  = 'Macros Detected'
    let level = 'ok'
    let value = 'none'
    file_data.sanitisations && file_data.sanitisations.map((item:any)=> {
        if (item.includes('Macro')) {
            value = "macros existed in original file"
            level = 'high'
        }
    })
    return { name , value , level}
}

const rule_javascript_detected = (file_data:any) =>  {
    const name  = 'Javascript Detected'
    let level = 'ok'
    let value = 'none'
    file_data.sanitisations && file_data.sanitisations.map((item:any)=> {
        if (item.includes('JavaScript')) {
            value = "javascript existed in original file"
            level = 'high'
        }
    })
    return { name , value , level}
}

const rule_hyperlinks_detected= (file_data:any) =>  {
    const name  = 'Hyperlinks Detected'
    let level = 'ok'
    let value = 'none'

    file_data.sanitisations && file_data.sanitisations.map((item:any)=> {
        if (item.includes('Hyperlinks')) {
            value = "hyperlinks existed in original file"
            level = 'medium'
        }
    })
    return { name , value , level}
}
const rule_metadata_detected= (file_data:any) =>  {
    const name  = 'Metadata Detected'
    let level = 'ok'
    let value = 'none'
    file_data.sanitisations && file_data.sanitisations.map((item:any)=> {
        if (item.includes('Metadata')) {
            value = "metadata removed from original file"
            level = 'medium'
        }
    })
    return { name , value , level}
}

export default create_metadata_file;