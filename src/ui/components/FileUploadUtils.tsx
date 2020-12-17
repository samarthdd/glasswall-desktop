import axios        from "axios";
import axiosRetry   from 'axios-retry';
import * as Utils   from '../utils/utils'

const NUM_RETRIES = 5;

const getPayload = async (data: any) => {
    let buffer = Buffer.from(data.content, 'base64');
    let size_of_file = buffer.length / 1000000;
    Utils.addRawLogLine(0,"-","File Size (MB) : " + size_of_file);
    let policyflags = await Utils.getPolicyInApiFormat();
    console.log("policyflags" + policyflags)

    var json = policyflags ? {
            fileSize : size_of_file,
            Base64 : data.content,
            ContentManagementFlags: policyflags
        }:{
            fileSize : size_of_file,
            Base64 : data.content
        }
    return json;
}

const getAnalysisPayload = async (data: any) => {
    let buffer = Buffer.from(data.content, 'base64');
    let size_of_file = buffer.length / 1000000;
    let policyflags = await Utils.getPolicyInApiFormat();
    console.log("policyflags" + policyflags)

    var json = policyflags?{
            Base64 : data.content,
            fileSize : size_of_file,
            ContentManagementFlags: policyflags
        }: {
            Base64 : data.content,
            fileSize : size_of_file,
        }
        return json;
}

const getLocalUpload = (data: any) => {
    return {"fileName":data.original_file_name,"fileBody":data.content};
}

const decodeBase64Image=(dataString: string) =>{
    let response: any;
    response = dataString && dataString.split(';base64,').pop();
    return response;
}

const writeDecodedBase64File = (baseBase64Response: any, xmlReport:string, request: any, sourceFileUrl: string,
    requestId:string, targetFolder: string, resultCallback: Function) => {
   var decodedBase64 = decodeBase64Image(baseBase64Response);
   var bs = atob(baseBase64Response);
   var buffer = new ArrayBuffer(bs.length);
   var ba = new Uint8Array(buffer);
   for (var i = 0; i < bs.length; i++) {
       ba[i] = bs.charCodeAt(i);
   }
   var file = new Blob([ba], { type: request.type });
   var url = window.webkitURL.createObjectURL(file);
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
      /*axiosRetry(axios, { retries: 5 , retryDelay: (retryCount) => {
        console.log("http axiosRetry retryCount = "+retryCount)
        return 2000;
        },
        retryCondition: (error:any) => {
          return error.response.status === 429;
        }
        });*/

    let payload: string | any;
    let url : string| null;
    url = Utils.getRebuildEngineUrl();

    payload = await getPayload(request)
    var fileSize = payload.fileSize;

    // Files smaller than 6MB - Normal
    payload = JSON.stringify(payload)
    let retries = NUM_RETRIES
    if(fileSize < 6){

        return url && await axios.post(url, payload, {
                headers: {
                    "x-api-key": Utils.getRebuildApiKey(),
                    "Content-Type": "application/json"
                }
            })
        .then(async (response) => {
            if(response.status === 200){
                await getAnalysisResult(false, false,  response.data, request, sourceFileUrl, requestId, folderId, resultCallback);
            }
        })
        .catch(async err => {
            Utils.addRawLogLine(2,"-","3:" + JSON.stringify(err));
            await getAnalysisResult(false, true, err, request, sourceFileUrl, requestId, folderId, resultCallback);
            // if(err.message.indexOf('422') > -1){
            //     resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
            //  msg:'File of this type cannot be processed - '+ err.message, id:requestId, targetDir:folderId, original:request.content})

            // }
            // else{
            //     resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
            //       msg:err.message, id:requestId, targetDir:folderId, original:request.content})
            // }
        }

        )
    }
    else{
        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'File too big. 4 bytes to 6 MB file size bracket', id:requestId, targetDir:folderId, original:request.content})
    }
}

export const getAnalysisResult= async (isBinaryFile: boolean, rebuiltFailed: boolean, reBuildResponse: any, request: any, sourceFile: string,
     requestId: string, targetFolder: string, resultCallback: Function)=>{

    let payload: string | any;
    let url : string| null;
    url = Utils.getRebuildAnalysisUrl();

    payload = await getAnalysisPayload(request)
    var fileSize = payload.fileSize;
    // Files smaller than 6MB - Normal
    payload = JSON.stringify(payload)
    Utils.sleep(500);

    if(fileSize < 6){
        return url &&  await axios.post(url, payload, {
                headers: {
                    "x-api-key": Utils.getRebuildApiKey(),
                    "Content-Type": "application/json"
                }
            })
        .then((response) => {
            Utils.addRawLogLine(2,"-","response.status" + response.status)
            if(response.status === 200){
                if(rebuiltFailed || typeof reBuildResponse == "object"){
                    let errMsg = reBuildResponse.message;
                    if(typeof reBuildResponse.errorMessage != "undefined" && Utils.isBlockedByPolicyMsg(reBuildResponse.errorMessage)){
                        errMsg = "Blocked by policy";
                    }
                   return resultCallback({'source':sourceFile, 'url':'TBD', 'filename':request.filename, isError:true,
                        msg:errMsg, cleanFile:null, xmlResult: response.data, id:requestId, targetDir:targetFolder, original:request.content, path:request.path})
                }
                

               if(isBinaryFile){
                    writeBinaryFile(reBuildResponse, response.data, request, sourceFile, requestId, targetFolder, resultCallback)
               }else{
                    writeDecodedBase64File(reBuildResponse, response.data, request, sourceFile, requestId,
                         targetFolder, resultCallback)
               }
            }
        })
        .catch(err => {
            Utils.addRawLogLine(2,"-","11" + err.message);
            resultCallback({'source':sourceFile, 'url':'TBD', 'filename':request.filename, isError:true,
                 msg:err.message, id:requestId, targetDir:targetFolder, original:request.content})
        })
    }
    else{
        resultCallback({'source':sourceFile, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'File too big. 4 bytes to 30 MB file size bracket', id:requestId, targetDir:targetFolder, original:request.content})
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
