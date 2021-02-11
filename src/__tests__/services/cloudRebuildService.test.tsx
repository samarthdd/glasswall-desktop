const os                                = require('os'); 
const UUID                              = require('pure-uuid');
const fs                                = require('fs-extra')
const path                              = require('path');
import * as Utils                      from '../../ui/utils/utils'
const { ipcRenderer } = require('electron');
import * as GWCloudRebuildService from '../../ui/services/GWCloudRebuildService'
import "@testing-library/jest-dom/extend-expect";
const shell                             = require('electron').shell


describe('Rebuild Cloud Service', () => {
    it('should render', () => {
        let res = GWCloudRebuildService.getFile(null);
    });
  
  });

  describe('Test cloud rebuild', () => {
    it('Rebuild png file', () => {
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
        GWCloudRebuildService.makeRequest({content: base64Data}, inputDir+"/"+fileName, UUID, UUID, rebuildResult);
    });


    it('Analyse rebuilt png file', () => {
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
      GWCloudRebuildService.getAnalysisResult(false, false, base64Data, id, inputDir+"/"+fileName, id,id, rebuildResult);
    });
    
    describe('Get analysis payload', () => {
      it('test payload', () => {
        var base64Data = Utils.HEALTH_CHK_PNG_BASE64;
          let res = GWCloudRebuildService.getAnalysisPayload({content: base64Data});
      });
      
    
    });

  });

  
  describe('decodeBase64Image test', () => {
    it('test decodeBase64Image', () => {
      var base64Data = Utils.HEALTH_CHK_PNG_BASE64;
        let res = GWCloudRebuildService.decodeBase64Image( base64Data);
    });
    
    describe('writeBase64File test', () => {
      const rebuildResult =(result: any)=>{ 
        expect(result.id).not.toBeNull();
    }
      it('test write base64 file', () => {
        global.URL.createObjectURL = jest.fn();
        var base64Data = Utils.HEALTH_CHK_PNG_BASE64;
          let res = GWCloudRebuildService.writeDecodedBase64File(base64Data, "", "","",
            "", "", rebuildResult);
      });
  
      
  });


  describe('getbase64 test', () => {
    const rebuildResult =(result: any)=>{ 
      expect(result.id).not.toBeNull();
  }
    it('test get base64 of file', () => {
      global.URL.createObjectURL = jest.fn();
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
        let res = GWCloudRebuildService.getBase64(path.join(inputDir,fileName));
    });

    
});

});

