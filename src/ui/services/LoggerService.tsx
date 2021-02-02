const path                                = require('path');
var fs                                    = require('fs');
const log                                 = require('electron-log');
import * as Utils               from '../utils/utils'


log.transports.file.level                 = 'debug';
const MAX_LOG_FILE_SIZE                   = 3000000;

export const GW_CLI_LOG_FILE              = 'glasswallCLIProcess.log'
export const _LOGS_FOLDER                 = "gwlogs"
export const _LOGS_FILE                   = "glasswall_0_1_6.log"

export const getLogsPath = ()=>{
    if(!fs.existsSync(Utils.getAppDataPath() + Utils.getPathSep() + _LOGS_FOLDER)){
      fs.mkdirSync(Utils.getAppDataPath() + Utils.getPathSep() + _LOGS_FOLDER);
    }  
    if(!fs.existsSync(Utils.getAppDataPath() + Utils.getPathSep() + _LOGS_FOLDER+Utils.getPathSep()+_LOGS_FILE)){
      fs.openSync(Utils.getAppDataPath() + Utils.getPathSep() + _LOGS_FOLDER+Utils.getPathSep()+_LOGS_FILE,'w');
      fs.closeSync(Utils.getAppDataPath() + Utils.getPathSep() + _LOGS_FOLDER+Utils.getPathSep()+_LOGS_FILE,'w');
    }
    return Utils.getAppDataPath() + Utils.getPathSep() + _LOGS_FOLDER + Utils.getPathSep() + _LOGS_FILE
  }

  
const archiveLog = (file:string) => {
    file = file.toString();
    const info = path.parse(file);
    try {
      fs.renameSync(file, path.join(info.dir, info.name + '.old' + info.ext));
    } catch (e) {
      console.warn('Could not rotate log', e);
    }
  }                                      
  
  export const cleanRawLogger = () => {
    let logFile = getLogsPath()
    fs.open(logFile, 'w+')
  }
  
  export const getRawLogs = () => { 
    let data = fs.readFileSync(getLogsPath(), 
              {encoding:'utf8', flag:'r'}); 
    if(data.length > MAX_LOG_FILE_SIZE){
      data = data.substring((data.length-MAX_LOG_FILE_SIZE),MAX_LOG_FILE_SIZE)
    }
    return data;
  }
  
  export const addRawLogLine = (level:number, filename:string, sentence:string) => {   
    log.transports.file.file        = getLogsPath();
    let levelStr : string;
    levelStr = "ERROR"
    let lines  = Utils.wordwrap(sentence, 100, '\n', false);
  
    if(level == 0){
      levelStr = "DEBUG"
      log.debug(" - File-Name - "+filename+" --> "+lines)
    }
    else if (level == 1){
      levelStr = "INFO"
      log.info(" - File-Name - "+filename+" --> "+lines)
    }    
    else{
      log.error(" - File-Name - "+filename+" --> "+lines)
    }  
  }


export const addLogLine = (filename:string, sentence:string) => {     
    const logs  = localStorage.getItem("logs");
    if(logs != null){
      var logsCopy = logs;
      logsCopy +=  "\n"+getLogTime()+" - INFO - File-Name - "+filename+" --> "+ Utils.wordwrap(sentence, 100, '\n', false)+"\n" 
      localStorage.setItem("logs",logsCopy)
    }
    else{
      localStorage.setItem("logs","")
      var logsCopy = "\n"+getLogTime()+" - INFO - File-Name - "+filename+" --> "+ Utils.wordwrap(sentence, 100, '\n', false)+"\n" 
      console.log('adding log '+logsCopy)
      localStorage.setItem("logs",logsCopy)
    }
  }
  
  export const getLogs = () => {
    return localStorage.getItem("logs");
  }
  
  export const getLogTime = () => {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
  }
  
  
  export const initLogger = () => {  
    localStorage.removeItem("logs")
    localStorage.setItem("logs","")
  }