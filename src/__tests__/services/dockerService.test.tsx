import * as GWDockerService from '../../ui/services/GWDockerService'
import "@testing-library/jest-dom/extend-expect";
const os                                = require('os'); 
const UUID                              = require('pure-uuid');
const fs                                = require('fs-extra')
const path                              = require('path');
import * as Utils                      from '../../ui/utils/utils'




  
describe('docker parallel rebuild', () => {
  it('Rebuild png file with docker', () => {
    const rebuildResult =(result: any)=>{ 
        expect(result.id).not.toBeNull();
    }
    const id = new UUID(4).format();
    const directory = path.join(os.tmpdir(), id);
    fs.mkdirSync(directory);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    //shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);            
    var base64Data = Utils.HEALTH_CHK_PNG_BASE64;
    var fileName = Utils.HEALTH_CHK_PNG_NAME;
    fs.writeFileSync(path.join(inputDir,fileName),base64Data,{encoding:"base64"});
    GWDockerService.makeRequest({content: base64Data}, inputDir+"/"+fileName, UUID, UUID, rebuildResult);
});
});
