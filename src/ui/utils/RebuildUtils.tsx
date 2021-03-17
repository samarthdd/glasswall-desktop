import * as Utils       from './utils'
var fs                  = require('fs');
const resolve           = require('path').resolve
const path              = require('path');

export const GW_DOCKER_IMG_NAME           = 'glasswallsolutions/evaluationsdk';
export const GW_DOCKER_IMG_TAG            = 'rebuild';
export const REBUILD_ENGINE_URL           =  'https://8oiyjy8w63.execute-api.us-west-2.amazonaws.com/Prod/api/rebuild/base64';
export const REBUILD_ANALYSIS_URL         =  'https://o7ymnow6vf.execute-api.us-west-2.amazonaws.com/Prod/api/Analyse/base64'
export const REBUILD_API_KEY_VALUE        =  'dp2Ug1jtEh4xxFHpJBfWn9V7fKB3yVcv60lhwOAG';

export const GW_DOCKER_PULL_IMG_OUTPUT    = 'Downloaded newer image for ';//glasswallsolutions/evaluationsdk';
export const GW_DOCKER_PULL_IMG_OUTPUT_2  = 'Image is up to date for ';//glasswallsolutions/evaluationsdk';
export const GW_DOCKER_EXTRACT_IMG_OUTPUT = 'Loaded image ID'

//Rebuild keys
export const REBUILD_URL_KEY              = "rebuild_url"
export const ANALYSIS_URL_KEY             = "anaylsis_url"
export const APIKEY_KEY                   = "apikey_key"
export const REBUILD_IMAGE_KEY            = "rebuild_image_key_2"
export const REBUILD_IMAGE_TAG_KEY        = "rebuild_image_tag_key_2"
export const REBUILD_URL_PROTOCOL_KEY     = "rebuild_url_is_https_key"
export const ANALYSIS_URL_PROTOCOL_KEY    = "analysis_url_is_https_key"

//Rebuild folders
export const _PROCESSED_FOLDER            = "processed"
export const _CLEAN_FOLDER                = "clean"
export const _ORIGINAL_FOLDER             = "original"
export const _REPORT_FOLDER               = "report"
export const _ANALYSIS_FOLDER             = "analysis"
export const DOCKER_OUPUT_DIR_KEY         = "DOCKER_OUPUT_DIR"
export const CLOUD_OUPUT_DIR_KEY          = "CLOUD_OUPUT_DIR"

export const HTTPS          = "https"
export const HTTP           = "http"


export const DOCKER_RUNNING               =  0; // Docker running;
export const DOCKER_NOT_INSTALLED         =  1; // Docker not installed;
export const DOCKER_NOT_STARTED           =  2; // Docker not started;
export const DOCKER_GW_IMAGE_NOT_PRESENT  =  3; // Image not present;
export const LICENSE_NOT_VALID            =  4; // License not valid
export const REBUILD_FAILED               =  5; // File failed rebuild
export const MISSING_OUTPUT_PROPERTY      =  6; //Does not have output property


// For rebuid
export const CONFIG_INI_REBUILD   = 
"[GWConfig]\n\
processMode=1\n\
reportMode=0\n\
fileStorageMode=2\n\
fileType=*\n\
inputLocation=/input\n\
useSubfolders=1\n\
outputLocation=/output\n\
createOutputFolders=1\n\
nonConformingDirName= NonConforming\n\
managedDirName= Managed\n\
quarantineNonconforming= 1\n\
writeOutput= 1\n";

export const CONFIG_XML_REBUILD   = 
"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<config>\n\
<pdfConfig>\n\
<watermark>Glasswall Protected</watermark>\n\
<metadata>sanitise</metadata>\n\
<javascript>sanitise</javascript>\n\
<acroform>sanitise</acroform>\n\
<actions_all>sanitise</actions_all>\n\
<embedded_files>sanitise</embedded_files>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<embedded_images>sanitise</embedded_images>\n\
</pdfConfig>\n\
<wordConfig>\n\
<metadata>sanitise</metadata>\n\
<macros>sanitise</macros>\n\
<embedded_files>sanitise</embedded_files>\n\
<review_comments>sanitise</review_comments>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<dynamic_data_exchange>sanitise</dynamic_data_exchange>\n\
<embedded_images>sanitise</embedded_images>\n\
</wordConfig>\n\
<pptConfig>\n\
<metadata>sanitise</metadata>\n\
<macros>sanitise</macros>\n\
<embedded_files>sanitise</embedded_files>\n\
<review_comments>sanitise</review_comments>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<embedded_images>sanitise</embedded_images>\n\
</pptConfig>\n\
<xlsConfig>\n\
<metadata>sanitise</metadata>\n\
<macros>sanitise</macros>\n\
<embedded_files>sanitise</embedded_files>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<review_comments>sanitise</review_comments>\n\
<dynamic_data_exchange>sanitise</dynamic_data_exchange>\n\
<embedded_images>sanitise</embedded_images>\n\
</xlsConfig>	\n\
<tiffConfig>\n\
<geotiff>sanitise</geotiff>\n\
</tiffConfig>\n\
</config>"; 
// For analysis
export const CONFIG_INI   = 
"[GWConfig]\n\
processMode=0\n\
reportMode=0\n\
fileStorageMode=2\n\
fileType=*\n\
inputLocation=/input\n\
useSubfolders=1\n\
outputLocation=/output\n\
createOutputFolders=1\n\
nonConformingDirName= NonConforming\n\
managedDirName= Managed\n\
quarantineNonconforming= 1\n\
writeOutput= 1\n";

export const CONFIG_XML   = 
"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<config>\n\
<pdfConfig>\n\
<watermark>Glasswall Protected</watermark>\n\
<metadata>sanitise</metadata>\n\
<javascript>sanitise</javascript>\n\
<acroform>sanitise</acroform>\n\
<actions_all>sanitise</actions_all>\n\
<embedded_files>sanitise</embedded_files>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<embedded_images>sanitise</embedded_images>\n\
</pdfConfig>\n\
<wordConfig>\n\
<metadata>sanitise</metadata>\n\
<macros>sanitise</macros>\n\
<embedded_files>sanitise</embedded_files>\n\
<review_comments>sanitise</review_comments>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<dynamic_data_exchange>sanitise</dynamic_data_exchange>\n\
<embedded_images>sanitise</embedded_images>\n\
</wordConfig>\n\
<pptConfig>\n\
<metadata>sanitise</metadata>\n\
<macros>sanitise</macros>\n\
<embedded_files>sanitise</embedded_files>\n\
<review_comments>sanitise</review_comments>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<embedded_images>sanitise</embedded_images>\n\
</pptConfig>\n\
<xlsConfig>\n\
<metadata>sanitise</metadata>\n\
<macros>sanitise</macros>\n\
<embedded_files>sanitise</embedded_files>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<review_comments>sanitise</review_comments>\n\
<dynamic_data_exchange>sanitise</dynamic_data_exchange>\n\
<embedded_images>sanitise</embedded_images>\n\
</xlsConfig>	\n\
<tiffConfig>\n\
<geotiff>sanitise</geotiff>\n\
</tiffConfig>\n\
</config>"; 

export const getRebuildEngineUrl=()=>{
    let url: string;
    if(!localStorage.getItem(REBUILD_URL_KEY))
      url = REBUILD_ENGINE_URL;
    else
      url = localStorage.getItem(REBUILD_URL_KEY) || ""
  
   return url;
  }
  
  export const getRebuildAnalysisUrl=()=>{
    let url: string;
    if(!localStorage.getItem(ANALYSIS_URL_KEY))
      url = REBUILD_ANALYSIS_URL;
    else
      url = localStorage.getItem(ANALYSIS_URL_KEY) || ""
  
   return url;
  }
  
  export const getRebuildApiKey=()=>{
    let key: string;
    if(!localStorage.getItem(APIKEY_KEY))
      key = REBUILD_API_KEY_VALUE;
    else
      key = localStorage.getItem(APIKEY_KEY) || ""
  
   return key;
  }
  
  export const getRebuildImage=()=>{
    let key: string;
    if(!localStorage.getItem(REBUILD_IMAGE_KEY))
      key = GW_DOCKER_IMG_NAME;
    else
      key = localStorage.getItem(REBUILD_IMAGE_KEY) || ""
  
   return key;
  }
  
  export const getRebuildImageTag=()=>{
    let key: string;
    if(!localStorage.getItem(REBUILD_IMAGE_TAG_KEY))
      key = GW_DOCKER_IMG_TAG;
    else
      key = localStorage.getItem(REBUILD_IMAGE_TAG_KEY) || ""
  
   return key;
  }
  
  export const getRebuildUrlProtocolType=()=>{
    let key: string;
    if(!localStorage.getItem(REBUILD_URL_PROTOCOL_KEY))
      key = HTTPS;
    else
      key = localStorage.getItem(REBUILD_URL_PROTOCOL_KEY) || ""
  
   return key;
  }

   
  export const getAnalysisUrlProtocolType=()=>{
    let key: string;
    if(!localStorage.getItem(ANALYSIS_URL_PROTOCOL_KEY))
      key = HTTPS;
    else
      key = localStorage.getItem(ANALYSIS_URL_PROTOCOL_KEY) || ""
  
   return key;
  }

  export const getDockerDefaultOutputFOlder =()=>{
    if(!fs.existsSync(getDefaultOuputCleanPath())){
        fs.mkdirSync(getDefaultOuputCleanPath());
    }
    return localStorage.getItem(DOCKER_OUPUT_DIR_KEY)?
      localStorage.getItem(DOCKER_OUPUT_DIR_KEY):
      getDefaultOuputCleanPath()
  
     
  }
   export const getCloudDefaultOutputFOlder=()=>{
    if(!fs.existsSync(getDefaultOuputCleanPath())){
      fs.mkdirSync(getDefaultOuputCleanPath());
    }
    return localStorage.getItem(CLOUD_OUPUT_DIR_KEY)?
      localStorage.getItem(CLOUD_OUPUT_DIR_KEY):
      getDefaultOuputCleanPath()
  }


export const getReportPath =()=>{
    return Utils.getAppDataPath() + Utils.getPathSep() + _REPORT_FOLDER;
  }
  export const getCleanPath =()=>{
    return Utils.getAppDataPath() + Utils.getPathSep() + _CLEAN_FOLDER
    
  }
  export const getOriginalPath =()=>{
    return Utils.getAppDataPath() + Utils.getPathSep() + _ORIGINAL_FOLDER
    
  }
  
  export const getProcessedPath =()=>{
    return Utils.getAppDataPath() + Utils.getPathSep() + _PROCESSED_FOLDER
  }
  
  export const getDefaultOuputCleanPath =()=>{
    return Utils.getAppDataPath() + Utils.getPathSep() + _CLEAN_FOLDER
  }

  export const create_config = () =>{
    let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'config');
      if (!fs.existsSync(configDir)){
          fs.mkdirSync(configDir);
      }
      if (!fs.existsSync(configDir+"/config.ini")){
          fs.openSync(path.join(configDir,"config.ini"),'w');
          fs.writeFileSync(path.join(configDir,"config.ini"),CONFIG_INI);        
      }    
      if (!fs.existsSync(configDir+"/config.xml")){
          fs.openSync(path.join(configDir,"config.xml"),'w');
          fs.writeFileSync(path.join(configDir,"config.xml"),CONFIG_XML);    
      }
      //Rebuild
      let configDirR = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'configR');
      if (!fs.existsSync(configDirR)){
          fs.mkdirSync(configDirR);
      }
      if (!fs.existsSync(configDirR+"/config.ini")){
          fs.openSync(path.join(configDirR,"config.ini"),'w');
          fs.writeFileSync(path.join(configDirR,"config.ini"),CONFIG_INI_REBUILD);        
      }    
      if (!fs.existsSync(configDirR+"/config.xml")){
          fs.openSync(path.join(configDirR,"config.xml"),'w');
          fs.writeFileSync(path.join(configDirR,"config.xml"),CONFIG_XML_REBUILD)    
      }
  }