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
    Utils.addRawLogLine(0,"-","File Size (MB) : " + size_of_file);
    var json = {
            fileSize : size_of_file,
            Base64 : data.content
        };
    return json;
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
   //var bs = new Buffer(decodedBase64, 'base64').toString('utf8') 
   var bs = atob(baseBase64Response);  
   var buffer = new ArrayBuffer(bs.length);
   var ba = new Uint8Array(buffer);
   for (var i = 0; i < bs.length; i++) {
       ba[i] = bs.charCodeAt(i);
   }

   
   var file = new Blob([ba], { type: request.type });
   var url = window.webkitURL.createObjectURL(file);    
   Utils.addLogLine(request.filename,"Processing complete ");  
   resultCallback({'source':sourceFileUrl, 'url':url, 'filename':request.filename, isError:false, msg:'',
       cleanFile:decodedBase64, xmlResult: xmlReport, id:requestId, targetDir:targetFolder,
        original:request.content, path:request.path,request:request})
   
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
   
    payload = getPayload(request)
    var fileSize = payload.fileSize;    
    return docker_exec_rebuild(payload,request,requestId,folderId,sourceFileUrl,resultCallback);                
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
    Utils.addRawLogLine(0,request.filename,'fileName '+request.filename);
    Utils.addRawLogLine(0,request.filename,'inputDir '+inputDir);
    Utils.addRawLogLine(0,request.filename,'outputDir '+outputDir);
    var base64Data = payload.Base64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(inputDir,request.filename),base64Data,{encoding:"base64"});
    Utils.addRawLogLine(0,request.filename,"Created rebuild dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);  
    let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'configR');    
    Utils.addRawLogLine(1,request.filename,'Config dir - '+(configDir));
    // Run container ]
    var cmd = 'docker run --rm -v '+'\"'+ configDir+'\"'+ ':/home/glasswall -v '+'\"'+ resolve(inputDir)+'\"'+':/input -v '+ '\"'+resolve(outputDir)+ '\"'+':/output '+ Utils.getRebuildImage() +":" + Utils.getRebuildImageTag();
    console.log("cmd" +cmd)
    exec(cmd, function (err:Error, stdout:string, stderr:string) {      
        console.log('rebuild stdout ->'+stdout)
        if(err){
            Utils.addRawLogLine(0,request.filename,'Error during rebuild -> \n '+err.stack+"\n")
            Utils.addLogLine(request.filename,'Error during rebuild -> \n '+err.stack+"\n");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'Error during rebuild', id:requestId, targetDir:folderId, original:request.content,'request':request})
             console.log("cmd2" +err.stack)
             return;
        }
        let cliProcessLogPath = outputDir+'/'+Utils.GW_CLI_LOG_FILE;
        if(Utils.isBlockedByPolicy(cliProcessLogPath)){
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'Blocked By Policy', id:requestId, targetDir:folderId, original:request.content,'request':request})
             console.log("Blocked by policy")
             return;
        }
        return analyseRebuilt(stdout, stderr, cmd, payload,request,requestId
            ,folderId,sourceFileUrl,inputDir,outputDir,resultCallback) 
    })
  }

  export const analyseRebuilt = async (stdout:string, stderr:string, cmd:string, payload:any,request:any,
    requestId:string,folderId:string,sourceFileUrl:string,inputDir:string,outputDir:string,resultCallback:any) => {
 //       Utils.addRawLogLine(0,request.filename,"Rebuild stdout -> "+String(stdout))             
        Utils.addRawLogLine(0,request.filename,"Rebuild stderr -> "+String(stderr))             
        if(stdout.indexOf("error during connect") > -1){
            Utils.addLogLine(request.filename,"Docker Daemon is not started");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                msg:'Docker Daemon is not started', id:requestId, targetDir:folderId, original:request.content
                ,'request':request});
            return;
        }
        fs.stat(outputDir+'/Managed', function(err:Error,stat:any) {          
            if (err == null) {                 
                fs.stat(outputDir+'/Managed/'+request.filename, function(err:Error,stat:any) { 
                    if(err == null){
                        Utils.addRawLogLine(1,request.filename,'Out file exists');
                        fs.readFile(outputDir+'/Managed/'+request.filename, 'base64', function (err:Error, data:string) {
                            if (err) {
                                Utils.addRawLogLine(2,request.filename,'Failed to read output file '+(outputDir+'/Managed/'+request.filename));
                                Utils.addLogLine(request.filename,'Failed to read output file '+(outputDir+'/Managed/'+request.filename));
                                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                                    msg:'Failed to read rebuilt file', id:requestId, 
                                    targetDir:folderId, original:request.content,'request':request});
                                    return;
                            }
                            Utils.addLogLine(request.filename,'File rebuild successful. Starting analysis');
                            return docker_exec_analysis(payload,request,requestId,folderId,
                                sourceFileUrl,resultCallback,data)               
                          });
                    }
                    else{
                        Utils.addRawLogLine(2,request.filename,'File failed rebuuild.Managed dir present. File missing - \n'+err.stack);
                        Utils.addLogLine(request.filename,"File failed analysis.Managed dir present.File missing - "+err.stack);
                        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                            msg:'File type not supported', id:requestId, targetDir:folderId, original:request.content
                            ,'request':request});
                            return;
                    }
                });
            } 
            else{
                Utils.addRawLogLine(2,request.filename,'File failed rebuild.Managed dir missing \n'+err.stack);
                Utils.addLogLine(request.filename,"File failed rebuild.Managed dir missing - \n"+err.stack);
                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                    msg:'File type not supported', id:requestId, targetDir:folderId, original:request.content,'request':request});
                    return;
            }
          });
    }

export const docker_exec_analysis = async (payload:any,request:any,requestId:string,folderId:string,
    sourceFileUrl:string,resultCallback:any,cleanData : any) => {
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() + Utils.getPathSep() +  'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);
   // Utils.addRawLogLine(0,request.filename,'<docker_exec_analysis> payload '+JSON.stringify(payload));    
    Utils.addRawLogLine(1,request.filename,'<docker_exec_analysis> fileName '+request.filename);
    Utils.addRawLogLine(1,request.filename,'<docker_exec_analysis> inputDir '+inputDir);
    Utils.addRawLogLine(1,request.filename,'<docker_exec_analysis> outputDir '+outputDir);
    var base64Data = payload.Base64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(inputDir,request.filename),base64Data,{encoding:"base64"});
    Utils.addRawLogLine(1,request.filename,"<docker_exec_analysis> Created analysis dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);          
    // Run container        
    let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'config');    
    Utils.addRawLogLine(1,request.filename,'Config dir - '+(configDir));
    // Run container 
    var cmd = 'docker run --rm -v '+'\"'+ configDir+'\"'+ ':/home/glasswall -v '+
    '\"'+ resolve(inputDir)+'\"'+ ':/input -v '+'\"'+ resolve(outputDir)+'\"'+ ':/output '+ Utils.getRebuildImage() +":" + Utils.getRebuildImageTag();
    exec(cmd, function (err:Error, stdout:string, stderr:string) {      
        if(err){
            Utils.addRawLogLine(2,request.filename,'Error during analysis -> \n '+err.stack+"\n")
            Utils.addLogLine(request.filename,'Error during analysis -> \n '+err.stack+"\n");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'Error during analysis', id:requestId, targetDir:folderId, original:request.content,'request':request})
             return;
        }
        analyseAnalyzed(stdout, stderr, cmd, base64Data,request,requestId
                ,folderId,sourceFileUrl,inputDir,outputDir,resultCallback,cleanData) 
    })
}


export const analyseAnalyzed = async (stdout:string, stderr:string, cmd:string, payload:any,request:any,
    requestId:string,folderId:string,sourceFileUrl:string,inputDir:string,outputDir:string,resultCallback:any,cleanData : any) => {
 //       Utils.addRawLogLine(0,request.filename,"Analysis stdout -> "+String(stdout))             
        Utils.addRawLogLine(1,request.filename,"Analysis stderr -> "+String(stderr))             
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
                        Utils.addRawLogLine(2,request.filename,'Analysis Out file exists');
                        fs.readFile(outputDir+'/Managed/'+request.filename+'.xml', 'utf8', function (err:Error, data:string) {
                            if (err) {
                                Utils.addRawLogLine(2,request.filename,'Failed to read xml file '+(outputDir+'/Managed/'+request.filename)+ '\n '+err.stack );
                                Utils.addLogLine(request.filename,'Failed to read xml file '+(outputDir+'/Managed/'+request.filename+'.xml'));
                                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                                    msg:'Failed to read analyzed file', id:requestId, targetDir:folderId, original:request.content});
                                    return;
                            }
                            Utils.addLogLine(request.filename,'File analysis successful. Writing results');
                            return writeDecodedBase64File(cleanData, data, request, sourceFileUrl, requestId,
                                folderId, resultCallback);           
                          });
                    }
                    else{
                        Utils.addRawLogLine(2,request.filename,'File failed analysis.Managed dir present. File missing - \n'+err.stack);
                        Utils.addLogLine(request.filename,"File failed analysis.Managed dir present. File  - \n"+err.stack);
                        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                            msg:'File type not supported', id:requestId, targetDir:folderId, original:request.content,'request':request});
                            return;
                    }
                });
            } 
            else{
                Utils.addRawLogLine(2,request.filename,'File failed analysis.Managed dir missing \n '+err.stack);
                Utils.addLogLine(request.filename,"File failed analysis.Managed dir missing \n"+err.stack);
                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                    msg:'File type not supported', id:requestId, targetDir:folderId, original:request.content});
                    return;
            }
          });
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
    Utils.addRawLogLine(1,'-', '<health_chk> License check inputDir '+inputDir);
    Utils.addRawLogLine(1,'-', '<health_chk> License check outputDir '+outputDir);
    var base64Data = Utils.HEALTH_CHK_PNG_BASE64;
    var fileName = Utils.HEALTH_CHK_PNG_NAME;
    fs.writeFileSync(path.join(inputDir,fileName),base64Data,{encoding:"base64"});
    Utils.addRawLogLine(1,'-', "<health_chk> License check created  dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);
    var options={"timeout":5000, "shell":false};
    var totalOutput : string;
    totalOutput = "";
    // Check if image there
    var checkResponse = spawnSync('docker', ['images'],options);      
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
    if(totalOutput.indexOf("error during connect") > -1 || totalOutput.indexOf("Error response from daemon") > -1){
        oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n DOCKER NOT RUNNING - "+totalOutput        
        localStorage.setItem("healthLogs",oldLogs);       
        return 2;
    }   
    else if (!totalOutput.includes(Utils.getRebuildImage())){
        // Image not present
        oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n GW IMAGE MISSING - "+totalOutput        
        localStorage.setItem("healthLogs",oldLogs);       
        return 3;
    }
    else{
        oldLogs += "\n"+Utils.getLogTime()+" - INFO \n GW IMAGE PRESENT"
    }
  //  Utils.addRawLogLine(0,"-", "<health_chk> Image check ouput \n"+totalOutput); 
    totalOutput = "";
    // Run container 
    options={"timeout":10000, "shell":false};   
    var spawned = spawnSync('docker', [ 'run',
                                        '--rm',
                                        '-v', resolve(inputDir)+':/input',
                                        '-v', resolve(outputDir)+':/output',
                                        Utils.getRebuildImage() +":" + Utils.getRebuildImageTag()], options);    
     if(spawned.hasOwnProperty("output")){
        for(var i=0;i<spawned["output"].length;i++){
            var output = spawned["output"][i];
            console.log("Spawned output"+output);
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
//        Utils.addRawLogLine(0,"-", "<health_chk> License check response \n "+String(totalOutput))             
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
                Utils.addRawLogLine(2,"-", "<health_chk> File failed rebuild, Managed dir was there but not the rebuilt file");
                // License not valid
                oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n GW LICENSE HAS EXPIRED - "+totalOutput;   
                localStorage.setItem("healthLogs",oldLogs);                    
                return 4;
            }
        }
        else{
            Utils.addRawLogLine(2,"-", "<health_chk> File failed rebuild");
            localStorage.setItem("healthLogs",oldLogs);       
            return 5;
        }
     }
     else{
        Utils.addRawLogLine(2,"-", "<health_chk> Does not have output property");
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
    var pullResponse = spawnSync('docker', [ 'pull', Utils.getRebuildImage() +":" + Utils.getRebuildImageTag()], options);
    if(pullResponse.hasOwnProperty("output")){            
        for(var i=0;i<pullResponse["output"].length;i++){
            var output = pullResponse["output"][i];        
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
        Utils.addRawLogLine(1,"-", "<pull_image> Pull Response  = "+totalOutput);        
    }
    oldLogs += "\n"+Utils.getLogTime()+" - INFO \n IMAGE PULL LOGS - "+totalOutput;
    localStorage.setItem("healthLogs",oldLogs);  
    return totalOutput; 
} 

/**
 * Returns
 * 0 : Valid
 * 1 : Invalid
 */
export const check_license = () =>{
    var oldLogs = localStorage.getItem("healthLogs");    
    if(oldLogs == null || oldLogs == undefined){
        oldLogs = "";
    }
    oldLogs += "\n"+Utils.getLogTime()+" - INFO \n ========== Starting License Validation ==========";                
    localStorage.setItem("healthLogs",oldLogs);       
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() +  Utils.getPathSep() + 'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);    
    Utils.addRawLogLine(1,"-", "check_license  =  inputDir "+inputDir);
    Utils.addRawLogLine(1,"-", "check_license  =  "+outputDir);
    var base64Data = Utils.HEALTH_CHK_PNG_BASE64;
    var fileName = Utils.HEALTH_CHK_PNG_NAME;
    fs.writeFileSync(path.join(inputDir,fileName),base64Data,{encoding:"base64"});
    Utils.addRawLogLine(1,"-", "check_license  Created rebuild dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);
    var options={"timeout":5000, "shell":false};
    var totalOutput : string;
    totalOutput = "";
    // Run container 
    options={"timeout":10000, "shell":false};   
    var spawned = spawnSync('docker', [ 'run',
                                        '--rm',
                                        '-v', resolve(inputDir)+':/input',
                                        '-v', resolve(outputDir)+':/output',
                                        Utils.getRebuildImage() +":" + Utils.getRebuildImageTag()], options);    
    if(spawned.hasOwnProperty("output")){
        console.log("Spawned length "+spawned["output"].length);
        for(var i=0;i<spawned["output"].length;i++){
            var output = spawned["output"][i];
            console.log("Spawned output"+output);
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
 //       Utils.addRawLogLine(1,"-", "License check output = "+totalOutput);        
        if (fs.existsSync(path.join(outputDir,'Managed'))) {
            const outFile = path.join(outputDir,'Managed',fileName);
            if(fs.existsSync(outFile)){
                oldLogs += "\n"+Utils.getLogTime()+" - INFO \n GW LICENSE OK";                
                localStorage.setItem("healthLogs",oldLogs);       
                oldLogs += "\n"+Utils.getLogTime()+" - INFO \n ========== License Validation Finised ==========";                
                localStorage.setItem("healthLogs",oldLogs);       
                return 0;
            }
            else{
                Utils.addRawLogLine(2,"-", "Licese check file failed rebuild, Managed dir was there but not the rebuilt file");
                // License not valid
                oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n GW LICENSE HAS EXPIRED. Rebuilt sample file now found - "+totalOutput;   
                localStorage.setItem("healthLogs",oldLogs);         
                oldLogs += "\n"+Utils.getLogTime()+" - INFO \n ========== License Validation Finised ==========";                
                localStorage.setItem("healthLogs",oldLogs);                  
                return 1;
            }
        }
        else{
            Utils.addRawLogLine(2,"-","license check File failed rebuild");
            oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n GW LICENSE HAS EXPIRED. Rebuilt Managed dir now found - "+totalOutput;   
            localStorage.setItem("healthLogs",oldLogs);
            oldLogs += "\n"+Utils.getLogTime()+" - INFO \n ========== License Validation Finised ==========";                
            localStorage.setItem("healthLogs",oldLogs);       
            return 1;
        }
    }
    else{
        Utils.addRawLogLine(2,"-","license check Does not have output property");
        oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n Inconsistent output while checking license - "+totalOutput;   
        localStorage.setItem("healthLogs",oldLogs);  
        oldLogs += "\n"+Utils.getLogTime()+" - INFO \n ========== License Validation Finised ==========";                
        localStorage.setItem("healthLogs",oldLogs);            
        return 1;
    }         
}

