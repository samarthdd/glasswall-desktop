import  React, {useState}       from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import SideDrawer               from '../components/SideDrawer';
import VisibilityIcon           from '@material-ui/icons/Visibility';
import VisibilityOffIcon        from '@material-ui/icons/VisibilityOff';

import * as Utils               from '../utils/utils'

const useStyles = makeStyles((theme) => ({
    root:       {   
        display:                    'flex', 
    },    
    toolbar: {
        display:                   'flex',
        alignItems:                'center',
        justifyContent:            'flex-end',
        padding:                   theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
       flexGrow:       1,
   },
   contentArea:{
        minHeight:                 '85.7vh',
        padding:                   theme.spacing(3),
        '& p':{
            fontSize:              '12px',
            fontWeight:            'bold'
        }
   },
   textContainer:{
        margin:                    '20px 0',
        float:                     'left',
        '& h4':{
            margin:                '10px 0 0 0'
        },
        '& p':{
            float:                 'left',
            width:                 '100%'
        }
   },
   urlBox:{
    margin:                    '10px 0',
    background:                '#e7e7e7',
    padding:                   '5px 10px', 
    float:                     'left',
    '& input':{
        border:                'none',
        background:            'transparent',
        float:                 'left',
        minHeight:             '30px',
        minWidth:              '635px',
        
    }
    
    },
   apiKeyBox:{
        margin:                    '10px 0',
        background:                '#e7e7e7',
        padding:                   '5px 10px', 
        float:                     'left',
        '& input':{
            border:                'none',
            background:            'transparent',
            float:                 'left',
            minHeight:             '30px',
            minWidth:              '600px',
            '&:focus':{
                border:            '0',
                outline:           '0'
            }
        },
        '& button':{
            border:                'none',
            background:            'transparent',
            '&:focus':{
                border:            '0',
                outline:           '0'
            }
        }
   }
 }));



function Settings(){
    const classes = useStyles(); 
    const [hide, setHide] = useState(true);
    const [rebuildUrl, setRebuildUrl] = useState("");
    const [analysisUrl, setAnalysisUrl] = useState("");
    const [apiKey, setApiKey] = useState("");

    React.useEffect(() => {
        setRebuildUrl(Utils.REBUILD_ENGINE_URL?Utils.REBUILD_ENGINE_URL:"");
        setAnalysisUrl(Utils.REBUILD_ANALYSIS_URL?Utils.REBUILD_ANALYSIS_URL:"");
        setApiKey(Utils.REBUILD_API_KEY?Utils.REBUILD_API_KEY:"");
       
        
    }, []);

   const showApiKey = ()=> {
    setHide(!hide)
   }

   const handleRebuildUrlChange =(e:any)=>{
    console.log(e.target.value);
    setRebuildUrl(e.target.value)
    localStorage.setItem(Utils.REBUILD_URL_KEY, e.target.value )
   }

   const handleAnalysisUrlChange =(e:any)=>{
    console.log(e.target.value);
    setAnalysisUrl(e.target.value)
    localStorage.setItem(Utils.ANALYSIS_URL_KEY, e.target.value )
   }

   const handleApiIKeyChange =(e:any)=>{
    console.log(e.target.value);
    setApiKey(e.target.value)
    localStorage.setItem(Utils.APIKEY_KEY, e.target.value )
   }
    return(
        <div className={classes.root}> 
            <SideDrawer showBack={false}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />  
                <div className={classes.contentArea}>             
                    <h3>Account Info</h3>
                    <p>Cloud Configuration </p>
                    <div className={classes.textContainer}>
                        <h4>REBUILD ENGINE URL</h4>
                        <div className={classes.urlBox}>
                            <input onChange={handleRebuildUrlChange} type="text" value={rebuildUrl}/>
                        </div>  
                        <h4>REBUILD ANALYSIS URL</h4>
                        <div className={classes.urlBox}>
                            <input onChange={handleAnalysisUrlChange} type="text" value={analysisUrl}/>
                        </div>  
                        <h4>API Key</h4>   
                        <div className={classes.apiKeyBox}>
                            <input onChange={handleApiIKeyChange} type={hide?'password':'text'} value={apiKey}/>
                            <button onClick={showApiKey}> {hide ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
                        </div>   
                                                          
                    </div>
                  
                </div>   
            </main>   
        </div>
       
        
    )
}

export default Settings;