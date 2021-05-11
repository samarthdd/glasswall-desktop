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
