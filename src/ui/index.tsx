import * as React                 from 'react';
import * as ReactDOM              from 'react-dom';
import      {HashRouter, Redirect, Route }  from 'react-router-dom'

import      RebuildFiles          from './views/RebuildFiles'
import      DockerRebuildFiles    from './views/DockerRebuildFiles'
import      HomePage              from './views/HomePage'
import      Settings              from './views/settings'
import      LoggerView            from './views/LoggerView'
import      DockerConfiguration   from './views/DockerConfiguration'
import      Sessions              from './views/Sessions'
import      RebuildPolicy         from './views/RebuildPolicy'
import      PastRebuildPolicy     from './views/PastRebuildPolicy'
import      * as Utils            from './utils/utils'




const App = () => (    
    <HashRouter>      
      <div>
      {/* <Route path="/"                       exact component=  { localStorage.getItem(Utils.WELCOME_PAGE_VISTIED_KEY) != Utils.WELCOME_PAGE_VISTIED_VAL ? WelcomePage:DockerRebuildFiles} /> */}
       
      {Utils.create_config()}
      {
        localStorage.getItem(Utils.WELCOME_PAGE_VISTIED_KEY) != Utils.WELCOME_PAGE_VISTIED_VAL?
        <Redirect to="/home"               
            />:
          // <Redirect to="/dockerrebuildFiles"   />
           <Redirect to="/dockerrebuildFiles"   />

      }
      {/* <Route path="/"                       exact component=  { localStorage.getItem(Utils.WELCOME_PAGE_VISTIED_KEY) != Utils.WELCOME_PAGE_VISTIED_VAL ? WelcomePage:DockerRebuildFiles} /> */}
       
        <Route path="/home"                   exact component=  { HomePage            } />
        <Route path="/rebuildFiles"           exact component=  { RebuildFiles        } />
        <Route path="/dockerrebuildFiles"     exact component=  { DockerRebuildFiles  } />
        <Route path="/settings"               exact component=  { Settings            } />
        <Route path="/configure"              exact component=  { DockerConfiguration } />
        <Route path="/logs"                   exact component=  { LoggerView          } />
        <Route path="/sessions"               exact component=  { Sessions            } />
        <Route path="/policy"                 exact component=  { RebuildPolicy       } />
        <Route path="/pastPolicy"             exact component=  { PastRebuildPolicy   } />
      </div>
    </HashRouter>
);
ReactDOM.render(<App />, app);