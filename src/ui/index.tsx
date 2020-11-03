import * as React                 from 'react';
import * as ReactDOM              from 'react-dom';
import      {HashRouter, Redirect, Route }  from 'react-router-dom'

import      WelcomePage           from './views/WelcomePage'
import      RebuildFiles          from './views/RebuildFiles'
import      DockerRebuildFiles    from './views/DockerRebuildFiles'
import      HomePage              from './views/HomePage'
// import      Settings              from './views/settings'
import      ConfigureDocker       from './views/ConfigureDockerFiles'

import   * as Utils               from './utils/utils'

const App = () => (

    <HashRouter>      
      <div>
      {/* <Route path="/"                       exact component=  { localStorage.getItem(Utils.WELCOME_PAGE_VISTIED_KEY) != Utils.WELCOME_PAGE_VISTIED_VAL ? WelcomePage:DockerRebuildFiles} /> */}
       
      
      {
        localStorage.getItem(Utils.WELCOME_PAGE_VISTIED_KEY) != Utils.WELCOME_PAGE_VISTIED_VAL?
        <Redirect to="/home"               
            />:
          <Redirect to="/dockerrebuildFiles"   />

      }
      {/* <Route path="/"                       exact component=  { localStorage.getItem(Utils.WELCOME_PAGE_VISTIED_KEY) != Utils.WELCOME_PAGE_VISTIED_VAL ? WelcomePage:DockerRebuildFiles} /> */}
       
        <Route path="/home"                   exact component=  { HomePage            } />
        <Route path="/rebuildFiles"           exact component=  { RebuildFiles        } />
        <Route path="/dockerrebuildFiles"     exact component=  { DockerRebuildFiles  } />
        {/* <Route path="/settings"               exact component=  { Settings            } /> */}
        <Route path="/configureDocker"        exact component=  { ConfigureDocker     } />
      </div>
    </HashRouter>
);

console.log(localStorage.getItem(Utils.WELCOME_PAGE_VISTIED_KEY))

ReactDOM.render(<App />, app);