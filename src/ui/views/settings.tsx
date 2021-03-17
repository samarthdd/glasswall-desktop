import React, { useState, useEffect }      from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import SideDrawer               from '../components/SideDrawer';
import VisibilityIcon           from '@material-ui/icons/Visibility';
import VisibilityOffIcon        from '@material-ui/icons/VisibilityOff';
import Footer                   from '../components/Footer';
import * as SerialDockerUtils   from '../services/GWSerialDockerService';
import * as RebuildUtils        from '../utils/RebuildUtils'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
    },
    contentArea: {
        minHeight: '85.7vh',
        padding: theme.spacing(3),
        '& h3': {
            marginTop: '0',
        },
        '& p': {
            fontSize: '12px',
            fontWeight: 'bold'
        }
    },
    textContainer: {
        margin: '20px auto 40px',
        width: '60%',
        background: '#ffffff',
        padding: '25px 25px',
        borderRadius: '6px',
        border: '1px solid #E2E9F0',
        boxSizing: 'border-box',
        boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.1)',
        '& h4': {
            margin: '10px 0 0 0'
        },
        '& p': {
            float: 'left',
            width: '100%'
        }
    },
    urlBox: {
        margin: '10px 0',
        background: '#e9f3fd',
        padding: '5px 10px',
        position: 'relative',
        borderRadius: '5px',
        border: '1px solid #b5d3e3',
        '& input': {
            border: 'none',
            background: 'transparent',
            width: '100%',
            minHeight: '30px',
            // minWidth:              '635px',

        }

    },
    apiKeyBox: {
        margin: '10px 0',
        background: '#e9f3fd',
        padding: '5px 10px',
        position: 'relative',
        borderRadius: '5px',
        border: '1px solid #b5d3e3',
        '& input': {
            border: 'none',
            background: 'transparent',
            width: '100%',
            minHeight: '30px',
            // minWidth:              '600px',
            '&:focus': {
                border: '0',
                outline: '0'
            }
        },
        '& button': {
            border: 'none',
            background: 'transparent',
            position: 'absolute',
            right: '8px',
            zIndex: '1',
            top: '7px',
            '&:focus': {
                border: '0',
                outline: '0'
            }
        }
    },



    submitBtn: {
        background: '#0c3451',
        color: '#fff',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '3px',
        cursor: 'pointer',
        marginTop: '15px',
        fontSize: '15px',
        textDecoration: 'none',
        display: 'inline-block',


    },

    resetBtn: {
        background: '#555',
        color: '#fff',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '3px',
        cursor: 'pointer',
        marginTop: '15px',
        marginLeft: '15px',
        fontSize: '15px',
        textDecoration: 'none',
        display: 'inline-block',


    },

    btnBox: {
        textDecoration: 'none',
        display: 'block',
        width: '100%',
        textAlign: 'center',
        marginTop: '20px',
    },

    selecttTag: {
        display: 'inline-block',
        minWidth: '65px',
        position: 'absolute',
        height: '40px',
        border: '0',
        background: 'transparent',
        borderRight: '1px solid #b5d3e3',
        padding: '0 5px 0 5px',
        margin: '0 0px 0 0',
        left: '0',
        top: '0',
    },

    pl_left_78: {
        paddingLeft: '78px',
    },


}));



function Settings() {
    const classes = useStyles();
    const [hide, setHide] = useState(true);
    const [readyForRender, setReadyForRender]   = useState(false)
    const [rebuildUrl, setRebuildUrl] = useState(RebuildUtils.getRebuildEngineUrl());
    const [analysisUrl, setAnalysisUrl] = useState(RebuildUtils.getRebuildAnalysisUrl());
    const [apiKey, setApiKey] = useState(RebuildUtils.getRebuildApiKey());
    const [rebuildImage, setRebuildImage] = useState(RebuildUtils.getRebuildApiKey());
    const [rebuildImageTag, setRebuildImageTag] = useState(RebuildUtils.getRebuildImageTag());
    const [rebuildUrlProtocolType, setRebuildUrlProtocolType] = useState(RebuildUtils.getRebuildUrlProtocolType());
    const [analysisUrlProtocolType, setAnalysisUrlProtocolType] = useState(RebuildUtils.getAnalysisUrlProtocolType());

    useEffect(() => {
        console.log("settings1" + RebuildUtils.getRebuildEngineUrl())
        let url = removeHttps(RebuildUtils.getRebuildEngineUrl());
        setRebuildUrl(url);
        url = removeHttps(RebuildUtils.getRebuildAnalysisUrl());
        setAnalysisUrl(url);
        setApiKey(RebuildUtils.getRebuildApiKey());
        setRebuildImage(RebuildUtils.getRebuildImage())
        setRebuildImageTag(RebuildUtils.getRebuildImageTag())
        setRebuildUrlProtocolType(RebuildUtils.getRebuildUrlProtocolType())
    }, []);


    const removeHttps = (link: string) => {
        return link.replace(/^(https?:|)\/\//, '');
    };

    const showApiKey = () => {
        setHide(!hide)
    }

    const handleRebuildUrlChange = (e: any) => {
        console.log("settings2" + e.target.value);
        setRebuildUrl(e.target.value)
        let url = rebuildUrlProtocolType + "://" + e.target.value;
        localStorage.setItem(RebuildUtils.REBUILD_URL_KEY, url)
    }

    const handleAnalysisUrlChange = (e: any) => {
        console.log(e.target.value);
        setAnalysisUrl(e.target.value)
        let url = analysisUrlProtocolType + "://" + e.target.value;
        localStorage.setItem(RebuildUtils.ANALYSIS_URL_KEY, url)
    }

    const handleApiIKeyChange = (e: any) => {
        console.log(e.target.value);
        setApiKey(e.target.value)
        localStorage.setItem(RebuildUtils.APIKEY_KEY, e.target.value)
    }

    const handleRebuildImageChange = (e: any) => {
        console.log(e.target.value);
        setRebuildImage(e.target.value)
        localStorage.setItem(RebuildUtils.REBUILD_IMAGE_KEY, e.target.value)
    }

    const handleRedirect = () => {
        window.open('https://glasswall-store.com/');
    };

    const handleRebuildImageTagChange = (e: any) => {
        console.log(e.target.value);
        setRebuildImageTag(e.target.value)
        localStorage.setItem(RebuildUtils.REBUILD_IMAGE_TAG_KEY, e.target.value)
    }

    const handleReset = () => {
        setRebuildUrl(RebuildUtils.REBUILD_ENGINE_URL);
        setAnalysisUrl(RebuildUtils.REBUILD_ANALYSIS_URL);
        setApiKey(RebuildUtils.REBUILD_API_KEY_VALUE);
        setRebuildImage(RebuildUtils.GW_DOCKER_IMG_NAME);
        setRebuildImageTag(RebuildUtils.GW_DOCKER_IMG_TAG);
        localStorage.setItem(RebuildUtils.REBUILD_URL_KEY, RebuildUtils.REBUILD_ENGINE_URL);
        localStorage.setItem(RebuildUtils.ANALYSIS_URL_KEY, RebuildUtils.REBUILD_ANALYSIS_URL);
        localStorage.setItem(RebuildUtils.APIKEY_KEY, RebuildUtils.REBUILD_API_KEY_VALUE);
        localStorage.setItem(RebuildUtils.REBUILD_IMAGE_KEY, RebuildUtils.GW_DOCKER_IMG_NAME);
        localStorage.setItem(RebuildUtils.REBUILD_IMAGE_TAG_KEY, RebuildUtils.GW_DOCKER_IMG_TAG);
        localStorage.setItem(RebuildUtils.REBUILD_URL_PROTOCOL_KEY, RebuildUtils.HTTPS);
    }

    const onSelectChange=(event: any) =>{
        let type = event.target.options[event.target.selectedIndex].text;
        if(event.target.name === "rebuildUrl"){
            localStorage.setItem(RebuildUtils.REBUILD_URL_PROTOCOL_KEY, type);
            let url = type + "://" + rebuildUrl;
            localStorage.setItem(RebuildUtils.REBUILD_URL_KEY, url)
            setRebuildUrlProtocolType(type)
            setReadyForRender(!readyForRender);
        }else  if(event.target.name === "AnalysisUrl"){
            setAnalysisUrlProtocolType(type)
            localStorage.setItem(RebuildUtils.ANALYSIS_URL_PROTOCOL_KEY, type);
            let url = type + "://" + analysisUrl;
            localStorage.setItem(RebuildUtils.ANALYSIS_URL_KEY, url)
            setReadyForRender(!readyForRender)
        }
       
    }

    return (
        <>
            <div className={classes.root}>
                <SideDrawer showBack={false} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.contentArea}>
                        <h3>Settings</h3>
                        <div className={classes.textContainer}>
                            <h4>REBUILD ENGINE URL</h4>
                            <div className={classes.urlBox}>
                                <select name ="rebuildUrl" className={classes.selecttTag} onChange={onSelectChange}  value={rebuildUrlProtocolType}>
                                    <option key="1" value="http">{RebuildUtils.HTTP}</option>
                                    <option key="2" value="https">{RebuildUtils.HTTPS}</option>
                                </select>
                                <input className={classes.pl_left_78} onChange={handleRebuildUrlChange} type="text" value={rebuildUrl} />
                            </div>
                            <h4>REBUILD ANALYSIS URL</h4>
                            <div className={classes.urlBox} >
                                <select className={classes.selecttTag} name ="AnalysisUrl" onChange={onSelectChange} value={analysisUrlProtocolType}>
                                    <option key="3" value="http">{RebuildUtils.HTTP}</option>
                                    <option key="4" value="https">{RebuildUtils.HTTPS}</option>
                                </select>
                                <input className={classes.pl_left_78} onChange={handleAnalysisUrlChange} type="text" value={analysisUrl} />
                            </div>
                            <h4>API Key</h4>
                            <div className={classes.apiKeyBox}>
                                <input onChange={handleApiIKeyChange} type={hide ? 'password' : 'text'} value={apiKey} />
                                <button onClick={showApiKey}> {hide ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
                            </div>
                            <h4>REBUILD DOCKER IMAGE</h4>
                            <div className={classes.urlBox}>
                                <input onChange={handleRebuildImageChange} type="text" value={rebuildImage} />
                            </div>
                            <h4>REBUILD DOCKER IMAGE TAG</h4>
                            <div className={classes.urlBox}>
                                <input type="text" onChange={handleRebuildImageTagChange} value={rebuildImageTag} />
                            </div>
                            <h4>REBUILD Glasswall CLI Version</h4>
                            <div className={classes.urlBox}>
                                <input type="text" value={SerialDockerUtils.gwCliVersionSerial()} />
                            </div>
                            <div className={classes.btnBox}>
                                <a className={classes.submitBtn} href="https://glasswall-store.com/">Buy Token </a>
                                <button className={classes.resetBtn} onClick={handleReset} >Reset </button>
                            </div>

                        </div>

                    </div>
                </main>

            </div>
            <Footer />
        </>


    )
}

export default Settings;