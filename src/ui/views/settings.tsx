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
        '& h3': {
            marginTop:             '0',
        },
        '& p':{
            fontSize:              '12px',
            fontWeight:            'bold'
        }
   },
   textContainer:{
        margin:                    '20px 0',
        float:                     'left',
        background:                '#ffffff',
        padding:                   '25px 25px',
        borderRadius:              '6px',
        border:                    '1px solid #E2E9F0',
        boxSizing:                 'border-box',
        boxShadow:                 '0px 16px 40px rgba(0, 0, 0, 0.1)',
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
    background:                '#e9f3fd',
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
        background:                '#e9f3fd',
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
    const [rebuildUrl, setRebuildUrl] = useState(Utils.getRebuildEngineUrl());
    const [analysisUrl, setAnalysisUrl] = useState(Utils.getRebuildAnalysisUrl());
    const [apiKey, setApiKey] = useState(Utils.getRebuildApiKey());
    const [rebuildImage, setRebuildImage] = useState(Utils.getRebuildApiKey());
    const [rebuildImageTag, setRebuildImageTag] = useState(Utils.getRebuildImageTag());

    React.useEffect(() => {
        console.log("settings1" + Utils.getRebuildEngineUrl())
        setRebuildUrl(Utils.getRebuildEngineUrl());
        setAnalysisUrl(Utils.getRebuildAnalysisUrl());
        setApiKey(Utils.getRebuildApiKey());
        setRebuildImage(Utils.getRebuildImage())
        setRebuildImageTag(Utils.getRebuildImageTag())
    }, []);

   const showApiKey = ()=> {
    setHide(!hide)
   }

   const handleRebuildUrlChange =(e:any)=>{
    console.log("settings2" + e.target.value);
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

   const handleRebuildImageChange =(e:any)=>{
    console.log(e.target.value);
    setRebuildImage(e.target.value)
    localStorage.setItem(Utils.REBUILD_IMAGE_KEY, e.target.value )
   }

   const handleRebuildImageTagChange =(e:any)=>{
    console.log(e.target.value);
    setRebuildImageTag(e.target.value)
    localStorage.setItem(Utils.REBUILD_IMAGE_TAG_KEY, e.target.value )
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
                        <h4>REBUILD DOCKER IMAGE</h4>   
                        <div className={classes.urlBox}>
                            <input onChange={handleRebuildImageChange} type="text" value={rebuildImage}/>
                        </div>  
                        <h4>REBUILD DOCKER IMAGE TAG</h4>   
                        <div className={classes.urlBox}>
                            <input type="text" onChange={handleRebuildImageTagChange}  value={rebuildImageTag}/>
                        </div>                            
                    </div>
                  
                </div>   
            </main>   
        </div>
       
        
    )
}

export default Settings;