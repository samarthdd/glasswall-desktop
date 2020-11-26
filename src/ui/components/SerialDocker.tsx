var {spawnSync, exec}                   = require('child_process');
import * as Utils                       from '../utils/utils'
const UUID                              = require('pure-uuid');
const fs                                = require('fs-extra')
const path                              = require('path');
import axios                            from "axios";
import { HourglassEmpty } from '@material-ui/icons';
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

export const makeRequest = (request: any, sourceFileUrl: string, requestId: string, folderId: string,
      resultCallback: Function) => {
    let payload: string | any;
   
    payload = getPayload(request)
    var fileSize = payload.fileSize;        
    const rebuiltBase64 = docker_exec_rebuild(payload,request.filename);
    if(rebuiltBase64 == -1 ){
        Utils.addLogLine(request.filename,"Docker Daemon is not started");
        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
            msg:'Docker Daemon is not started', id:requestId, targetDir:folderId, original:request.content});
            return;
    }
    if(rebuiltBase64 == -2 ){
        Utils.addLogLine(request.filename,"Docker not installed");
        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
            msg:'Docker not installed', id:requestId, targetDir:folderId, original:request.content});
            return;
    }
    if(rebuiltBase64 == -3 ){
        Utils.addLogLine(request.filename,"Blocked By Policy");
        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
            msg:'Blocked By Policy', id:requestId, targetDir:folderId, original:request.content});
            return;
    }
    if(rebuiltBase64 == null){
        Utils.addLogLine(request.filename,"File rebuild failed");
        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
            msg:'File could not be rebuilt', id:requestId, targetDir:folderId, original:request.content});
            return;
    }
    
    try{
        Utils.addLogLine(request.filename,"Rebuild succesfull. Starting analysis");
        getAnalysisResult(false, rebuiltBase64, request, sourceFileUrl, requestId, folderId, resultCallback);
    }
    catch(err:any){
        Utils.addRawLogLine(2,request.filename,"3:" + JSON.stringify(err));
        Utils.addLogLine(request.filename,"Analysis Error "+err.message);
        if(err.message.indexOf('422') > -1){
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
            msg:'File of this type cannot be processed - '+err.message, id:requestId, targetDir:folderId, original:request.content})
        }
        else{
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                msg:err.message, id:requestId, targetDir:folderId, original:request.content})
        }
    }            
}

export const getAnalysisResult = (isBinaryFile: boolean, reBuildResponse: any, request: any, sourceFile: string,
     requestId: string, targetFolder: string, resultCallback: Function)=>{

    let payload: string | any;
   
    payload = getAnalysisPayload(request)
    var fileSize = payload.fileSize;
    
    if(fileSize < 6){
        try{
               var xml = docker_exec_analysis(payload,request.filename);                              
               writeDecodedBase64File(reBuildResponse, xml, request, sourceFile, requestId,
                         targetFolder, resultCallback)               
            }
        catch(err: any){
            Utils.addLogLine(request.filename,"Analysis error "+err.message);
            Utils.addRawLogLine(2,request.filename,"11" + err.message);
            Utils.addRawLogLine(0,request.filename,"11" + err.stack);
            resultCallback({'source':sourceFile, 'url':'TBD', 'filename':request.filename, isError:true,
                 msg:err.message, id:requestId, targetDir:targetFolder, original:request.content})
        }
    }
    else{
        resultCallback({'source':sourceFile, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'File too big. 4 bytes to 6 MB file size bracket', id:requestId, targetDir:targetFolder, original:request.content})
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

export const docker_exec_rebuild = (payload: any,fileName:string) => {
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() +  Utils.getPathSep() + 'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);
  //  Utils.addRawLogLine(0,fileName,"payload "+JSON.stringify(payload));    
    Utils.addRawLogLine(0,fileName,'fileName '+fileName);
    Utils.addRawLogLine(0,fileName,'inputDir '+inputDir);
    Utils.addRawLogLine(0,fileName,'outputDir '+outputDir);
    var base64Data = payload.Base64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(inputDir,fileName),base64Data,{encoding:"base64"});
    Utils.addRawLogLine(0,fileName,"Created rebuild dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);          
    var options={"timeout":5000, "shell":false};
    var totalOutput : any;    
    totalOutput = "";
    let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'configR');        
    // Run container 
    options={"timeout":10000, "shell":false};   
    var spawned = spawnSync('docker', [ 'run',
                                        '--rm',
                                        '-v', configDir+':/home/glasswall',
                                        '-v', resolve(inputDir)+':/input',
                                        '-v', resolve(outputDir)+':/output',
                                        Utils.getRebuildImage() +":" + Utils.getRebuildImageTag()], options);
//    Utils.addRawLogLine(0,fileName," Rebuild spawned response "+String(spawned))             
     if(spawned.hasOwnProperty("output")){        
        for(var i=0;i<spawned["output"].length;i++){
            var output = spawned["output"][i];            
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
        console.log('rebuild stdout ->'+totalOutput)
        let cliProcessLogPath = outputDir+'/'+Utils.GW_CLI_LOG_FILE;
        if(Utils.isBlockedByPolicy(cliProcessLogPath)){            
             console.log("Blocked by policy")
             return -3;
        }
 //       Utils.addRawLogLine(0,fileName,"Rebuild output = "+totalOutput);
        if(totalOutput.indexOf("error during connect") > -1){
            return -1;
        }
        if (fs.existsSync(path.join(outputDir,'Managed'))) {
            const outFile = path.join(outputDir,'Managed',fileName);
            if(fs.existsSync(outFile)){
                const contents = fs.readFileSync(outFile, {encoding: 'base64'});     
                return contents;
            }
            else{
                Utils.addRawLogLine(2,fileName,'File failed rebuild, Managed dir was there but not the rebuilt file');
                return null;
            }
        }
        else{
            Utils.addRawLogLine(2,fileName,'File failed rebuild');
            return null;
        }
     }
     else{
        Utils.addRawLogLine(2,fileName,"Rebuild failed. Spawned Output does not have output property");
     }
     // TODO : Cleanup temp
     return null;
}

export const docker_exec_analysis = (payload: any,fileName:string) => {
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() + Utils.getPathSep() +  'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);
 //   Utils.addRawLogLine(0,fileName,'<docker_exec_analysis> payload '+JSON.stringify(payload));    
    Utils.addRawLogLine(1,fileName,'<docker_exec_analysis> fileName '+fileName);
    Utils.addRawLogLine(1,fileName,'<docker_exec_analysis> inputDir '+inputDir);
    Utils.addRawLogLine(1,fileName,'<docker_exec_analysis> outputDir '+outputDir);
    var base64Data = payload.Base64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(inputDir,fileName),base64Data,{encoding:"base64"});
    Utils.addRawLogLine(1,fileName,"<docker_exec_analysis> Created analysis dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);
    var options={"timeout":5000, "shell":false};
    var totalOutput : any;    
    totalOutput = "";
    // Run container        
    let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'config');    
    Utils.addRawLogLine(1,fileName,'Config dir - '+(configDir));
    options={"timeout":10000, "shell":false};
    var spawned = spawnSync('docker', [ 'run',
                                        '--rm',
                                        '-v', configDir+':/home/glasswall',
                                        '-v', resolve(inputDir)+':/input',
                                        '-v', resolve(outputDir)+':/output',
                                        Utils.getRebuildImage() +":" + Utils.getRebuildImageTag()], options);
 //   Utils.addRawLogLine(1,fileName,"<docker_exec_analysis> Spawned response "+String(spawned))             
     if(spawned.hasOwnProperty("output")){        
        for(var i=0;i<spawned["output"].length;i++){
            var output = spawned["output"][i];            
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
 //       Utils.addRawLogLine(1,fileName,"<docker_exec_analysis> Analysis output = "+totalOutput);
        if (fs.existsSync(path.join(outputDir,'Managed'))) {
            const outFile = path.join(outputDir,'Managed',fileName+'.xml');
            if(fs.existsSync(outFile)){
                const contents = fs.readFileSync(outFile);    
 //               Utils.addRawLogLine(1,fileName,'<docker_exec_analysis> XML content - '+contents); 
                Utils.addLogLine(fileName,"Analysis successful.");
                return contents;
            }
            else{
                Utils.addRawLogLine(2,fileName,'<docker_exec_analysis> File failed analysis, Managed dir was there but not the rebuilt file');
                Utils.addLogLine(fileName,"File analysis failed.");
                return null;
            }
        }
        else{
            Utils.addLogLine(fileName,"File analysis failed.");
            Utils.addRawLogLine(2,fileName,'<docker_exec_analysis> File failed analysis');
            return null;
        }
     }
     else{
        Utils.addLogLine(fileName,"File analysis failed.");
        Utils.addRawLogLine(2,fileName,"<docker_exec_analysis> Does not have output property");
     }
     // TODO : Cleanup temp
     return null;
}


const new_guid = () => {
        return new UUID(4).format()
}
