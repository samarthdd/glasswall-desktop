var {spawnSync, exec}                   = require('child_process');
import * as Utils                       from '../utils/utils'
const UUID                              = require('pure-uuid');
const fs                                = require('fs-extra')
const path                              = require('path');
const shell                             = require('shelljs');
const resolve                           = require('path').resolve
const fixPath                           = require('fix-path');

fixPath();

const getPayload = (data: any) => {
    let buffer = Buffer.from(data.content, 'base64');
    let size_of_file = buffer.length / 1000000;
    console.log("File Size (MB) : " + size_of_file);
    var json = {
            fileSize : size_of_file,
            Base64 : data.content
        };
    return json;
}

const getAnalysisPayload = (data: any) => {
    let buffer = Buffer.from(data.content, 'base64');
    let size_of_file = buffer.length / 1000000;
    var json = {
            Base64 : data.content,
            fileSize : size_of_file,
        };
        return json;
}

const getLocalUpload = (data: any) => {
    return {"fileName":data.original_file_name,"fileBody":data.content};
}

const decodeBase64Image=(dataString: string) =>{
    let response: any;
    response = dataString.split(';base64,').pop();
    return response;
}

const writeDecodedBase64File = (baseBase64Response: string, xmlReport:string, request: any, sourceFileUrl: string,
    requestId:string, targetFolder: string, resultCallback: Function) => {
   var decodedBase64 = decodeBase64Image(baseBase64Response);   
   //var bs = atob(decodedBase64);
   var bs = new Buffer(decodedBase64, 'base64').toString('utf8')   
   var buffer = new ArrayBuffer(bs.length);
   var ba = new Uint8Array(buffer);
   for (var i = 0; i < bs.length; i++) {
       ba[i] = bs.charCodeAt(i);
   }
   var file = new Blob([ba], { type: request.type });
   var url = window.webkitURL.createObjectURL(file);    
   Utils.addLogLine(request.filename,"Processing complete ");  
   resultCallback({'source':sourceFileUrl, 'url':url, 'filename':request.filename, isError:false, msg:'',
       cleanFile:decodedBase64, xmlResult: xmlReport, id:requestId, targetDir:targetFolder, original:request.content, path:request.path})
   
}

const writeBinaryFile = (bytes: any,  xmlReport:string, request: any, sourceFileUrl: string, requestId: string,
    targetFolder:string, resultCallback: Function) => {
   var bs = bytes;
   var buffer = new ArrayBuffer(bs.length);
   var ba = new Uint8Array(buffer);
   for (var i = 0; i < bs.length; i++) {
       ba[i] = bs.charCodeAt(i);
   }
   var file = new Blob([ba], { type: request.type });
   var url = window.webkitURL.createObjectURL(file);
   resultCallback({'source':sourceFileUrl,  'url':url, 'filename':request.filename, isError: false, msg:'',
     cleanFile:buffer, xmlResult: xmlReport, id:requestId, targetDir:targetFolder, original:request.content,path:request.paths })
  
}

const getBase64 = (file: File) => {
   let res = new Promise(resolve => {
       var reader = new FileReader();
       reader.onload = function (event: any) {
           resolve(event.target.result);
       };
       reader.readAsDataURL(file);
   });
   return res;
}

export const makeRequest = async (request: any, sourceFileUrl: string, requestId: string, folderId: string,
      resultCallback: Function) => {
    let payload: string | any;
    let url : string;
    url = Utils.REBUILD_ENGINE_URL;

    payload = getPayload(request)
    var fileSize = payload.fileSize;

    if(fileSize < 50){
        return docker_exec_rebuild(payload,request,requestId,folderId,sourceFileUrl,resultCallback);                
    }
    else{
        Utils.addLogLine(request.filename,"File size > 6 MB. Unprocessable");
        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'File too big. 4 bytes to 50 MB file size bracket', id:requestId, targetDir:folderId, original:request.content})
    }
}

export const getFile = (file: any) => {

    return getBase64(file).then((result: any) => {
        var encodedImage = result;
        var data = {type:file.type, filename:file.name, originalFileSize:file.size, content:null, path:file.path};
        if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png")
            data.content = encodedImage.replace(/^data:image\/\w+;base64,/, "");
        else
            data.content = encodedImage.replace(/^data:.*?;base64,/, "")
        return data;
    });

}

export const docker_exec_rebuild = async (payload: any,request:any,requestId:string
    ,folderId:string,sourceFileUrl:string,resultCallback:any) => {
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() +  Utils.getPathSep() + 'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);
    console.log('payload '+JSON.stringify(payload));    
    console.log('fileName '+request.filename);
    console.log('inputDir '+inputDir);
    console.log('outputDir '+outputDir);
    var base64Data = payload.Base64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(inputDir,request.filename),base64Data,{encoding:"base64"});
    console.log("Created rebuild dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);          
    // Run container 
    var cmd = 'docker run --rm -v '+resolve(inputDir)+':/input -v '+resolve(outputDir)+':/output '+Utils.GW_DOCKER_IMG_NAME;
    exec(cmd, function (err:Error, stdout:string, stderr:string) {      
        if(err){
            console.log('Error during rebuild -> \n '+err.stack+"\n")
            Utils.addLogLine(request.filename,'Error during rebuild -> \n '+err.stack+"\n");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'Error during rebuild', id:requestId, targetDir:folderId, original:request.content})
             return;
        }
        return analyseRebuilt(stdout, stderr, cmd, payload,request,requestId
            ,folderId,sourceFileUrl,inputDir,outputDir,resultCallback) 
    })
  }

  export const analyseRebuilt = async (stdout:string, stderr:string, cmd:string, payload:any,request:any,
    requestId:string,folderId:string,sourceFileUrl:string,inputDir:string,outputDir:string,resultCallback:any) => {
        console.log("Rebuild stdout -> "+String(stdout))             
        console.log("Rebuild stderr -> "+String(stderr))             
        if(stdout.indexOf("error during connect") > -1){
            Utils.addLogLine(request.filename,"Docker Daemon is not started");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                msg:'Docker Daemon is not started', id:requestId, targetDir:folderId, original:request.content});
            return;
        }
        fs.stat(outputDir+'/Managed', function(err:Error,stat:any) {          
            if (err == null) {                 
                fs.stat(outputDir+'/Managed/'+request.filename, function(err:Error,stat:any) { 
                    if(err == null){
                        console.log('Out file exists');
                        fs.readFile(outputDir+'/Managed/'+request.filename, 'base64', function (err:Error, data:string) {
                            if (err) {
                                console.log('Failed to read output file '+(outputDir+'/Managed/'+request.filename));
                                Utils.addLogLine(request.filename,'Failed to read output file '+(outputDir+'/Managed/'+request.filename));
                                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                                    msg:'Failed to read rebuilt file', id:requestId, targetDir:folderId, original:request.content});
                                    return;
                            }
                            Utils.addLogLine(request.filename,'File rebuild successful. Starting analysis');
                            return docker_exec_analysis(payload,request,requestId,folderId,
                                sourceFileUrl,resultCallback)               
                          });
                    }
                    else{
                        console.log('File failed rebuuild.Managed dir present. File missing - \n'+err.stack);
                        Utils.addLogLine(request.filename,"File failed analysis.Managed dir present.File missing - "+err.stack);
                        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                            msg:'File type not supported', id:requestId, targetDir:folderId, original:request.content});
                            return;
                    }
                });
            } 
            else{
                console.log('File failed rebuild.Managed dir missing \n'+err.stack);
                Utils.addLogLine(request.filename,"File failed rebuild.Managed dir missing - \n"+err.stack);
                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                    msg:'File type not supported', id:requestId, targetDir:folderId, original:request.content});
                    return;
            }
          });
    }

export const docker_exec_analysis = async (payload:any,request:any,requestId:string,folderId:string,
    sourceFileUrl:string,resultCallback:any) => {
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() + Utils.getPathSep() +  'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);
    console.log('<docker_exec_analysis> payload '+JSON.stringify(payload));    
    console.log('<docker_exec_analysis> fileName '+request.filename);
    console.log('<docker_exec_analysis> inputDir '+inputDir);
    console.log('<docker_exec_analysis> outputDir '+outputDir);
    var base64Data = payload.Base64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(inputDir,request.filename),base64Data,{encoding:"base64"});
    console.log("<docker_exec_analysis> Created analysis dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);
    var options={"timeout":5000, "shell":false};
    var totalOutput : any;    
    totalOutput = "";
    // Run container        
    let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'config');
    if (!fs.existsSync(configDir)){
        fs.mkdirSync(configDir);
    }
    fs.openSync(path.join(configDir,"config.ini"),'w');
    fs.openSync(path.join(configDir,"config.xml"),'w');
    fs.writeFileSync(path.join(configDir,"config.ini"),Utils.CONFIG_INI);
    fs.writeFileSync(path.join(configDir,"config.xml"),Utils.CONFIG_XML);    
    console.log('Config dir - '+(configDir));
    // Run container 
    var cmd = 'docker run --rm -v '+configDir+':/home/glasswall -v '+
        resolve(inputDir)+':/input -v '+resolve(outputDir)+':/output '+Utils.GW_DOCKER_IMG_NAME;
    exec(cmd, function (err:Error, stdout:string, stderr:string) {      
        if(err){
            console.log('Error during analysis -> \n '+err.stack+"\n")
            Utils.addLogLine(request.filename,'Error during analysis -> \n '+err.stack+"\n");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'Error during analysis', id:requestId, targetDir:folderId, original:request.content})
             return;
        }
        analyseAnalyzed(stdout, stderr, cmd, base64Data,request,requestId
                ,folderId,sourceFileUrl,inputDir,outputDir,resultCallback) 
    })
}


export const analyseAnalyzed = async (stdout:string, stderr:string, cmd:string, payload:any,request:any,
    requestId:string,folderId:string,sourceFileUrl:string,inputDir:string,outputDir:string,resultCallback:any) => {
        console.log("Analysis stdout -> "+String(stdout))             
        console.log("Analysis stderr -> "+String(stderr))             
        if(stdout.indexOf("error during connect") > -1){
            Utils.addLogLine(request.filename,"Docker Daemon is not started");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                msg:'Docker Daemon is not started', id:requestId, targetDir:folderId, original:request.content});
            return;
        }
        fs.stat(outputDir+'/Managed', function(err:Error,stat:any) { 
            if (err == null) {                 
                fs.stat(outputDir+'/Managed/'+request.filename+'.xml', function(err:Error,stat:any) { 
                    if(err == null){
                        console.log('Analysis Out file exists');
                        fs.readFile(outputDir+'/Managed/'+request.filename+'.xml', 'utf8', function (err:Error, data:string) {
                            if (err) {
                                console.log('Failed to read xml file '+(outputDir+'/Managed/'+request.filename));
                                Utils.addLogLine(request.filename,'Failed to read xml file '+(outputDir+'/Managed/'+request.filename+'.xml'));
                                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                                    msg:'Failed to read analyzed file', id:requestId, targetDir:folderId, original:request.content});
                                    return;
                            }
                            Utils.addLogLine(request.filename,'File analysis successful. Writing results');
                            return writeDecodedBase64File(payload, data, request, sourceFileUrl, requestId,
                                folderId, resultCallback);           
                          });
                    }
                    else{
                        console.log('File failed analysis.Managed dir present. File missing - \n'+err.stack);
                        Utils.addLogLine(request.filename,"File failed analysis.Managed dir present. File  - \n"+err.stack);
                        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                            msg:'File type not supported', id:requestId, targetDir:folderId, original:request.content});
                            return;
                    }
                });
            } 
            else{
                console.log('File failed analysis.Managed dir missing \n '+err.stack);
                Utils.addLogLine(request.filename,"File failed analysis.Managed dir missing \n"+err.stack);
                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                    msg:'File type not supported', id:requestId, targetDir:folderId, original:request.content});
                    return;
            }
          });
    }
  

const new_guid = () => {
        return new UUID(4).format()
}

/****
 * Returns
 * 0 - All ok
 * 1 - Docker not installed
 * 2 - Docker not running
 * 3 - Image not present
 * 4 - License invalid
 * 5,6,7 - Unknown Error
 */
export const health_chk = () => {     
    var oldLogs = "";    
    localStorage.setItem("healthLogs",oldLogs);       
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() +  Utils.getPathSep() + 'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);    
    console.log('inputDir '+inputDir);
    console.log('outputDir '+outputDir);
    var base64Data = Utils.HEALTH_CHK_PNG_BASE64;
    var fileName = Utils.HEALTH_CHK_PNG_NAME;
    fs.writeFileSync(path.join(inputDir,fileName),base64Data,{encoding:"base64"});
    console.log("Created rebuild dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);
    var options={"timeout":5000, "shell":false};
    var totalOutput : string;
    totalOutput = "";
    // Check if image there
    var checkResponse = spawnSync('docker', ['images'],options); 
    console.log(JSON.stringify(checkResponse));  
    if(checkResponse.hasOwnProperty("error")){
        let error =  checkResponse["error"];
        if(error.hasOwnProperty("errno")){
            let errno =  error["errno"];
            if(errno.indexOf("ENOENT") > -1 ){
                // Docker not installed
                oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n DOCKER NOT INSTALLED - "+checkResponse;                
                localStorage.setItem("healthLogs",oldLogs);
                return 1;
            }                            
        }
        
    } 
    oldLogs += "\n"+Utils.getLogTime()+" - INFO \n DOCKER IS INSTALLED ";                            
    if(checkResponse.hasOwnProperty("output")){        
        for(var i=0;i<checkResponse["output"].length;i++){
            var output = checkResponse["output"][i];            
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
    }
    console.log("Image check output = "+totalOutput);     
    if(totalOutput.indexOf("error during connect") > -1 || totalOutput.indexOf("Error response from daemon") > -1){
        oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n DOCKER NOT RUNNING - "+totalOutput        
        localStorage.setItem("healthLogs",oldLogs);       
        return 2;
    }   
    else if (!totalOutput.includes(Utils.GW_DOCKER_IMG_NAME_WO_TAG)){
        // Image not present
        oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n GW IMAGE MISSING - "+totalOutput        
        localStorage.setItem("healthLogs",oldLogs);       
        return 3;
    }
    else{
        oldLogs += "\n"+Utils.getLogTime()+" - INFO \n GW IMAGE PRESENT"
    }
    totalOutput = "";
    // Run container 
    options={"timeout":10000, "shell":false};   
    var spawned = spawnSync('docker', [ 'run',
                                        '--rm',
                                        '-v', resolve(inputDir)+':/input',
                                        '-v', resolve(outputDir)+':/output',
                                        Utils.GW_DOCKER_IMG_NAME], options);
    console.log("Got response "+String(spawned))             
     if(spawned.hasOwnProperty("output")){
        console.log("Spawned length "+spawned["output"].length);
        for(var i=0;i<spawned["output"].length;i++){
            var output = spawned["output"][i];
            console.log("Spawned output"+output);
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
        console.log("Rebuild output = "+totalOutput);
        if(totalOutput.indexOf("error during connect") > -1){
            // Docker not started
            oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n DOCKER NOT RUNNING - "+totalOutput;
            localStorage.setItem("healthLogs",oldLogs);       
            return 2;
        }
        else{
            oldLogs += "\n"+Utils.getLogTime()+" - INFO \n DOCKER RUNNING";            
        }
        if (fs.existsSync(path.join(outputDir,'Managed'))) {
            const outFile = path.join(outputDir,'Managed',fileName);
            if(fs.existsSync(outFile)){
                oldLogs += "\n"+Utils.getLogTime()+" - INFO \n GW LICENSE OK";                
                localStorage.setItem("healthLogs",oldLogs);       
                return 0;
            }
            else{
                console.log('File failed rebuild, Managed dir was there but not the rebuilt file');
                // License not valid
                oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n GW LICENSE HAS EXPIRED - "+totalOutput;   
                localStorage.setItem("healthLogs",oldLogs);                    
                return 4;
            }
        }
        else{
            console.log('File failed rebuild');
            localStorage.setItem("healthLogs",oldLogs);       
            return 5;
        }
     }
     else{
        console.log("Does not have output property");
        localStorage.setItem("healthLogs",oldLogs);       
        return 6;
     }     
     return 7;
}


export const pull_image = () =>{
    var oldLogs = localStorage.getItem("healthLogs") || "";    
    var options={"timeout":5000, "shell":false};
    var totalOutput : any;    
    // Pull    
    totalOutput = "";
    var options={"timeout":120000, "shell":false};
    var pullResponse = spawnSync('docker', [ 'pull',Utils.GW_DOCKER_IMG_NAME], options);
    if(pullResponse.hasOwnProperty("output")){            
        for(var i=0;i<pullResponse["output"].length;i++){
            var output = pullResponse["output"][i];        
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
    console.log("<docker_exec_analysis> PullResponse output = "+totalOutput);        
    }
    oldLogs += "\n"+Utils.getLogTime()+" - INFO \n IMAGE PULL LOGS - "+totalOutput;
    localStorage.setItem("healthLogs",oldLogs);  
    return totalOutput; 
} 