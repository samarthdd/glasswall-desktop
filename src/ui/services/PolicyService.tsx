import * as Utils       from '../utils/utils'
const path              = require('path');
var fs                  = require('fs');
const resolve           = require('path').resolve
const xml2js            = require('xml2js');

export const getPolicyFlag = (action:string) => {
    if(action == "allow"){
      return 0
    }
    else if(action == "sanitise"){
      return 1
    }
    else if(action == "disallow"){
      return 2
    }
  }
  
  //0 - allow, 1 - sanitize, 2 - disallow 
  export  const  getPolicyInApiFormat=async()=>{
    let policyJson: any;
    let configPolicy: any;
    policyJson = await getPolicy();
    console.log("prolicy" + policyJson)
    configPolicy = null;
    if(policyJson){
  
      let pdfPolicy = {
        ExternalHyperlinks: getPolicyFlag(policyJson.config.pdfConfig[0].external_hyperlinks[0]),
        Acroform: getPolicyFlag(policyJson.config.pdfConfig[0].acroform[0]),
        Metadata: getPolicyFlag(policyJson.config.pdfConfig[0].metadata[0]),
        Javascript: getPolicyFlag(policyJson.config.pdfConfig[0].javascript[0]),
        ActionsAll: getPolicyFlag(policyJson.config.pdfConfig[0].actions_all[0]),
        InternalHyperlinks: getPolicyFlag(policyJson.config.pdfConfig[0].internal_hyperlinks[0]),
        EmbeddedFiles: getPolicyFlag(policyJson.config.pdfConfig[0].embedded_files[0]),
        EmbeddedImages: getPolicyFlag(policyJson.config.pdfConfig[0].embedded_images[0])
      }
      let wordPolicy = {        
        Macros: getPolicyFlag(policyJson.config.wordConfig[0].macros[0]),
        Metadata: getPolicyFlag(policyJson.config.wordConfig[0].metadata[0]),
        ReviewComments: getPolicyFlag(policyJson.config.wordConfig[0].review_comments[0]),
        EmbeddedFiles: getPolicyFlag(policyJson.config.wordConfig[0].embedded_files[0]),
        InternalHyperlinks: getPolicyFlag(policyJson.config.wordConfig[0].internal_hyperlinks[0]),
        ExternalHyperlinks: getPolicyFlag(policyJson.config.wordConfig[0].external_hyperlinks[0]),
        DynamicDataExchange: getPolicyFlag(policyJson.config.wordConfig[0].dynamic_data_exchange[0]),
        EmbeddedImages: getPolicyFlag(policyJson.config.wordConfig[0].embedded_images[0])
      }
      let excelPolicy = {
        Macros: getPolicyFlag(policyJson.config.xlsConfig[0].macros[0]),
        Metadata: getPolicyFlag(policyJson.config.xlsConfig[0].metadata[0]),
        ReviewComments: getPolicyFlag(policyJson.config.xlsConfig[0].review_comments[0]),
        EmbeddedFiles: getPolicyFlag(policyJson.config.xlsConfig[0].embedded_files[0]),
        InternalHyperlinks: getPolicyFlag(policyJson.config.xlsConfig[0].internal_hyperlinks[0]),
        ExternalHyperlinks: getPolicyFlag(policyJson.config.xlsConfig[0].external_hyperlinks[0]),
        DynamicDataExchange: getPolicyFlag(policyJson.config.xlsConfig[0].dynamic_data_exchange[0]),
        EmbeddedImages: getPolicyFlag(policyJson.config.xlsConfig[0].embedded_images[0])
      }
      let pptPolicy = {
        Macros: getPolicyFlag(policyJson.config.pptConfig[0].macros[0]),
        Metadata: getPolicyFlag(policyJson.config.pptConfig[0].metadata[0]),
        ReviewComments: getPolicyFlag(policyJson.config.pptConfig[0].review_comments[0]),
        EmbeddedFiles: getPolicyFlag(policyJson.config.pptConfig[0].embedded_files[0]),
        InternalHyperlinks: getPolicyFlag(policyJson.config.pptConfig[0].internal_hyperlinks[0]),
        ExternalHyperlinks: getPolicyFlag(policyJson.config.pptConfig[0].external_hyperlinks[0]),
        EmbeddedImages: getPolicyFlag(policyJson.config.pptConfig[0].embedded_images[0]),
      } 
      let tiffPolicy = {
        GeoTiff: getPolicyFlag(policyJson.config.tiffConfig[0].geotiff[0]),
       
      } 
       configPolicy ={
        "PdfContentManagement":pdfPolicy,
        "ExcelContentManagement":excelPolicy,
        "PowerPointContentManagement":pptPolicy,
        "WordContentManagement": wordPolicy,
        "TiffContentManagement": tiffPolicy
      }
      console.log("getPolicyInApiFormat" + JSON.stringify(configPolicy))
    } 
  
    return configPolicy;
  }

  export const getPolicy = async () =>{
    let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'config');
      if (!fs.existsSync(configDir)){
          fs.mkdirSync(configDir);
      }
      if (fs.existsSync(configDir+"/config.xml")){        
        const xml = fs.readFileSync(configDir+"/config.xml",{encoding:'utf8', flag:'r'});    
        console.log('File = '+(configDir+"/config.xml"))     
        console.log('xml = '+xml)     
        const json_data = await Utils.xml_parser(xml)
        console.log('json out = '+JSON.stringify(json_data))     
        return json_data    
      }
      return null;
  }
  
    export const savePolicy = async (json:any) =>{
      let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'config');
      let configDirR = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'configR');
        if (!fs.existsSync(configDir)){
            fs.mkdirSync(configDir);
        }      
        if (!fs.existsSync(configDirR)){
          fs.mkdirSync(configDirR);
      }      
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(json);
        fs.writeFileSync(path.join(configDir,"config.xml"),xml);            
        fs.writeFileSync(path.join(configDirR,"config.xml"),xml);            
    }
  
    export const saveAppliedPolicy = async (destDir:string) =>{    
      let configDirR = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'configR');          
      fs.copyFileSync(path.join(configDirR,"config.xml"), path.join(destDir,"config.xml"));
    }
  
    export const getPastPolicy = async () =>{
      let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'config');
        if (!fs.existsSync(configDir)){
            fs.mkdirSync(configDir);
        }
        if (fs.existsSync(configDir+"/past_config.xml")){        
          const xml = fs.readFileSync(configDir+"/past_config.xml",{encoding:'utf8', flag:'r'});    
          //console.log('File = '+(configDir+"/past_config.xml"))     
          //console.log('xml = '+xml)     
          const json_data = await Utils.xml_parser(xml)
          console.log('json out = '+JSON.stringify(json_data))     
          return json_data    
        }
        return null;
    }
    
      export const savePastPolicy = async (json:any) =>{
        let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'config');
        let configDirR = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'configR');
          if (!fs.existsSync(configDir)){
              fs.mkdirSync(configDir);
          }      
          if (!fs.existsSync(configDirR)){
            fs.mkdirSync(configDirR);
        }      
          var builder = new xml2js.Builder();
          var xml = builder.buildObject(json);
          fs.writeFileSync(path.join(configDir,"past_config.xml"),xml);            
          fs.writeFileSync(path.join(configDirR,"past_config.xml"),xml);            
      }
  