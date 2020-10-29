var child_process               = require("child_process");
const path                      = require('path');
var fs                          = require('fs');

export const GW_DOCKER_IMG_NAME         = 'glasswallsolutions/evaluationsdk:1';
export const GW_DOCKER_IMG_TAG          = '72216de678ab';
export const WEBSITE_URL                = 'https://glasswall-desktop.com';
export const RELEASE_URL                = 'https://github.com/k8-proxy/glasswall-desktop/releases';
export const LICENSE_URL                = 'https://github.com/k8-proxy/glasswall-desktop/blob/master/LICENSE';
export const FW_URL                     = 'https://forensic-workbench.com/';
export const FILE_DROP_URL              = 'https://file-drop.co.uk/';
export const REBUILD_ENGINE_URL         = 'https://8oiyjy8w63.execute-api.us-west-2.amazonaws.com/Prod/api/rebuild/base64';
export const REBUILD_ANALYSIS_URL       = 'https://o7ymnow6vf.execute-api.us-west-2.amazonaws.com/Prod/api/Analyse/base64';
export const REPO_GIT_ISSUE_URL         = "https://github.com/k8-proxy/glasswall-desktop/issues/new";

export const REBUILD_API_KEY            = 'dp2Ug1jtEh4xxFHpJBfWn9V7fKB3yVcv60lhwOAG';
export const VERSION                    = '0.5.0'
export const _PROCESSED_FOLDER                 = "processed"
export const _CLEAN_FOLDER                     = "clean"
export const _ORIGINAL_FOLDER                  = "original"
export const _REPORT_FOLDER                    = "report"

export const OUTPUT_DIR_FLAT            = "flat";
export const OUTPUT_DIR_HIERARCY        = "hierarcy";

export const WELCOME_PAGE_VISTIED_KEY   = "visited"
export const WELCOME_PAGE_VISTIED_VAL   = "yes"

export const RELEAE_NOTES           =[
                                        {
                                          "date":"October 15th 2020",
                                          "desc":"On uploading multiple files in the app at once, the rebuild api give 429 (TooManyRequests)."
                                        }, 
                                        {
                                          "date":"October 14th 2020",
                                          "desc":"Solution to install upgrades #30"
                                        },
                                        {
                                          "date":"October 13th  2020",
                                          "desc":"Publish a build to Github Release #75"
                                        }, 
                                        {
                                          "date":"October 12th  2020 ",
                                          "desc":" Notification for the updated version. #139"
                                        },
                                         {
                                          "date":"October 12th  2020 ",
                                          "desc":"Change default landing page from Welcome page to the direct File drop option. #137"
                                        }
                                      ]

export const sleepDelay = (milliseconds:number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  export const sleep = (delay:number) => {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

  const _p8=(s:boolean) =>{

    var p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
}
 export const guid=()=> {
   
    //return _p8(false) + _p8(true) + _p8(true) + _p8(false);
    //return _p8(false) + _p8(true);
    return _p8(false);
    
}

export const stipFileExt =(filename: string)=>{
  return filename.split('.').slice(0, -1).join('.')
}

export const getFileHash=(content: string)=> {
  var crypto = require('crypto');
  // change to 'md5' if you want an MD5 hash
  var hash = crypto.createHash('sha1');

  // change to 'binary' if you want a binary hash.
  hash.setEncoding('hex');

  // the text that you want to hash
  hash.write(content);

  // very important! You cannot read from the stream until you have called end()
  hash.end();

  // and now you get the resulting hash
  var sha1sum = hash.read();
  return sha1sum;
}

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


export const getPathSep=()=>{
  return path.sep;
}
export const getReportPath =()=>{
  return getAppDataPath() + getPathSep() + _REPORT_FOLDER;
}
export const getCleanPath =()=>{
  return getAppDataPath() + getPathSep() + _CLEAN_FOLDER
  
}
export const getOriginalPath =()=>{
  return getAppDataPath() + getPathSep() + _ORIGINAL_FOLDER
  
}

export const getProcessedPath =()=>{
  return getAppDataPath() + getPathSep() + _PROCESSED_FOLDER
}

export const getAppDataPath =() =>{
  switch (process.platform) {
    case "darwin": {
      return path.join(process.env.HOME, "Library", "Application Support", "glasswall-desktop");
    }
    case "win32": {
      return path.join(process.env.APPDATA, "glasswall-desktop");
    }
    case "linux": {
      return path.join(process.env.HOME, ".glasswall-desktop");
    }
    default: {
      console.log("Unsupported platform!");
      // process.exit(1);
    }
  }
}

 //save base64 file 
 export const saveBase64File = async(content: string, filePath: string, filename: string)=>{
  //console.log("filePath 1" + filePath)
  !fs.existsSync(filePath) && fs.mkdirSync(filePath, { recursive: true })
  fs.writeFile(filePath +  getPathSep() + filename, content, {encoding: 'base64'}, function(err: any) { if (err) {
          console.log('err', err);
      }
  });
}

//save any text file 
export const saveTextFile = async (xmlContent: string, filePath: string, filename: string) =>{
  //console.log("filePath 2" + filePath)
  !fs.existsSync(filePath) && fs.mkdirSync(filePath, { recursive: true })
  fs.writeFile(filePath + getPathSep() + filename, xmlContent, function(err: any) {if (err) {
              console.log('err', err);
      }
  });
}

export const open_file_exp=(fpath: string)=> {
  console.log("open_file_exp" + fpath )
  var command = '';
  switch (process.platform) {
    case 'darwin':
      command = 'open -R ' + "\'" + fpath +"\'";
      break;
    case 'win32':
      if (process.env.SystemRoot) {
        command = path.join(process.env.SystemRoot, 'explorer.exe');
      } else {
        command = 'explorer.exe';
      }
      fpath = fpath.replace(/\//g, '\\');
      command += ' /select, ' + fpath;
      break;
    default:
      fpath = path.dirname(fpath)
      command = 'xdg-open ' + fpath;
  }
  child_process.exec(command, function(stdout:any) {
  });
}
