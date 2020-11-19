import React from "react";
import Items from "./Items";
import './FileAnalysis.css'

type AnalysisAttributes={
  sanitisations: string[]
  remediations: string[]
  issues: string[]
}
function RenderAnalysis({sanitisations, remediations, issues}:AnalysisAttributes) {
  return (
    <div className='render-analysis'>
        <div className="analysis-results">
          <div className="sanitisationTable table-container">
            <h1 className="table-header">
              Active content that has been sanitised (removed)
            </h1>
            <table>
              <tbody className="table-body">
                <Items items={sanitisations} />
              </tbody>
            </table>
          </div>
          <br />
          <div className="remediationsTable table-container">
            <h1 className="table-header">
              Objects & Structures that have been repaired
            </h1>
            <table>
              <tbody  className="table-body">
                <Items items={remediations} />
              </tbody>
            </table>
          </div>
          <br />
          <div className="issuesTable table-container">
            <h1 className="table-header">
              Objects & Structures that are unable to be repaired
            </h1>
            <table>
              <tbody  className="table-body">
                <Items items={issues} />
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

export default RenderAnalysis;
