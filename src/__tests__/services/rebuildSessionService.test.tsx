import * as RebuildSessionsService from '../../ui/services/RebuildSessionsService'
import * as RebuildUtils from '../../ui/utils/RebuildUtils'
import "@testing-library/jest-dom/extend-expect";



describe('get session list', () => {
    it('should render', async()  => {
        let res: string[];
        res = await RebuildSessionsService.getSessionList(RebuildUtils.getProcessedPath());
        expect(res.length).toBeGreaterThanOrEqual(0);
    });
  
  });

  describe('get session', () => {
    
    it('should render', done => {
        const readSessionResult =(result: any)=>{ 
            expect(result.id).not.toBeNull();
            done();
        }
        RebuildSessionsService.getSessionList(RebuildUtils.getProcessedPath()).then(function(results:any){
            if(results.length>0){
               
                RebuildSessionsService.readSessions(results, readSessionResult);
            }
        });
    });
  
  });

