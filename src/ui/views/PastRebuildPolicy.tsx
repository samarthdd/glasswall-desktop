import  React, {useState}             from 'react';
import { makeStyles,createMuiTheme }  from '@material-ui/core/styles';
import SideDrawer                     from '../components/SideDrawer';
import * as Utils                     from '../utils/utils'
import { FormControl, 
  FormHelperText, Grid, Input,
  InputLabel, MenuItem,
  MuiThemeProvider, Select,
  Snackbar }                       from '@material-ui/core';
import LibraryBooksIcon               from '@material-ui/icons/LibraryBooks';
import MuiAlert                       from '@material-ui/lab/Alert';
import Badge from '@material-ui/core/Badge';
import Footer from '../components/Footer';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme1 = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: { overflow:  "visible",
          "&:before": {
            background: '#75c16e',
            width: "5px",
            height: "5px",
            position: "absolute",
            right: "-16px",
            fontSize: "14px",
            borderRadius: "24px",
            padding: "5px 5px",
            top: "-36px",
            color: "#fff",
            content: "close-quote",
            boxShadow: "2px 3px 4px #777",
            textAlign: "center",
            display:  "none"
        }
      }
    },
    MuiSelect:{
      select:{
        "&:focus": { background: 'transparent'}
      }
    }
  }
});

const useStyles = makeStyles((theme) => ({
    root:       {   
      display: 'flex',
      flexWrap: 'wrap',
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
    logButton:{
        background:                 '#3cb371',
        border:                     'none',
        color:                      '#fff',
        borderRadius:               '3px',
        padding:                    '10px 20px',
        fontSize:                   '12px',
        marginBottom:               '20px',
        marginLeft:                 '5px',
        cursor:                     'pointer'                 
     },
     disabledLogButton:{
        background:                 'grey',
        border:                     'none',
        color:                      'white',
        borderRadius:               '3px',
        padding:                    '10px 20px',
        fontSize:                   '12px',
        marginBottom:               '20px',
        marginLeft:                 '5px'
                        
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
   }, 
  readOnlyIcon: {
      fontSize: '13px',
      float: 'left',
      margin: '3px 5px 0px 0 '
  },
  selectBox: {
    color: '#656565'
  },
  inputLabel: {
      width: '80%',
      position: 'absolute',
      padding: '15px',
      margin: '-24px 10%',
      color: '#fff!important',
      borderRadius: '3px',
      fontSize: '13px',
      transform: 'none'
  },
  readOnlyText: {
    marginTop: '5px',
    float: 'left',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: 0,
    },
  },
  formControl: {
    margin: '20px 1% 30px 1%',
    width: '23%',
    backgroundColor: '#fff',
    boxShadow: '0px 3px 13px #ccc',
    borderRadius: '5px',
    padding: '15px',
    position: 'relative',
    [theme.breakpoints.down(1199)]: {
      width: '31.3%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: 0,
    },
},
saveBtn:{
  backgroundColor:"#3cb371",
  color:"#fff",
  margin:'0 10px',
  textTransform:"capitalize",
  '&:hover':{
    backgroundColor:'#1a8110'
  }
},
saveAsBtn:{
  backgroundColor:"#09a573",
  color:"#fff",
  margin:'0 10px',
  textTransform:"capitalize",
  '&:hover':{
    backgroundColor:'#096347'
  }
},
divStyle:{
  float: "right",
},
heading:{
  marginBottom:  '50px'
},
filledSuccess:{
position:  'relative',
top:   '70px',
},

MuiBadgeBadge: {
  top: '-15px',
  right: '-14px',
    '& span':{
      height: '12px',
      padding: '0',
      minWidth: '12px',
      borderRadius: '25px',
    }
}
   
 }));


 const ColorTheme = createMuiTheme({
  palette: {
  primary: {
          main: '#498FA7'
      },
      secondary: {
          main: '#D47779'
      }
    },

});

 
const disabledColor = {
  backgroundColor: '#999',
}
const orangeColor = {
  background: 'linear-gradient(to right, #f4910d , #d57b03)',
};
const greenColor = {
  background: 'linear-gradient(to right, #44a748 , #19931f)',
};
const redColor = {
  background: 'linear-gradient(to right, #de423f , #c4201c)',
};
const blueColor = {
  background: 'linear-gradient(to right, #13a3b5 , #0a8494)',
};
const purpleColor = {
  background: 'linear-gradient(to right, #7d158e , #630673)',
};



function PastRebuildPolicy(){
    const classes = useStyles(); 
    const [readyForRender, setReadyForRender]   = useState(false)
    const [loader, setLoader]                   = useState(false)
    const [prevPolicy, setPrevPolicy]            = useState<PolicyConfig>(  {
      pdfConfig:{
        watermark               : "Glasswall Protected",
        metadata                : "sanitise",
        javascript              : "sanitise",
        acroform                : "sanitise",
        actions_all             : "sanitise",
        embedded_files          : "sanitise",
        external_hyperlinks     : "sanitise",
        internal_hyperlinks     : "sanitise",
        embedded_images         : "sanitise",
      },
      wordConfig:{
        metadata                : "sanitise",
        macros                  : "sanitise",
        embedded_files          : "sanitise",
        review_comments         : "sanitise",
        internal_hyperlinks     : "sanitise",
        external_hyperlinks     : "sanitise",
        dynamic_data_exchange   : "sanitise",
        embedded_images         : "sanitise",
      },
      pptConfig:{
        metadata                : "sanitise",
        macros                  : "sanitise",
        embedded_files          : "sanitise",
        review_comments         : "sanitise",
        internal_hyperlinks     : "sanitise",
        external_hyperlinks     : "sanitise",
        embedded_images         : "sanitise",
      },
      xlsConfig:{
        metadata                : "sanitise",  
        macros                  : "sanitise",  
        embedded_files          : "sanitise",  
        internal_hyperlinks     : "sanitise",  
        external_hyperlinks     : "sanitise",  
        review_comments         : "sanitise",  
        dynamic_data_exchange   : "sanitise",  
        embedded_images         : "sanitise",  
      },
        tiffConfig:{
          geotiff                 : "sanitise"
        }
    })

    const [policy, setPolicy]   = useState<PolicyConfig>(
      {
        pdfConfig:{
          watermark               : "Glasswall Protected",
          metadata                : "sanitise",
          javascript              : "sanitise",
          acroform                : "sanitise",
          actions_all             : "sanitise",
          embedded_files          : "sanitise",
          external_hyperlinks     : "sanitise",
          internal_hyperlinks     : "sanitise",
          embedded_images         : "sanitise",
        },
        wordConfig:{
          metadata                : "sanitise",
          macros                  : "sanitise",
          embedded_files          : "sanitise",
          review_comments         : "sanitise",
          internal_hyperlinks     : "sanitise",
          external_hyperlinks     : "sanitise",
          dynamic_data_exchange   : "sanitise",
          embedded_images         : "sanitise",
        },
        pptConfig:{
          metadata                : "sanitise",
          macros                  : "sanitise",
          embedded_files          : "sanitise",
          review_comments         : "sanitise",
          internal_hyperlinks     : "sanitise",
          external_hyperlinks     : "sanitise",
          embedded_images         : "sanitise",
        },
        xlsConfig:{
          metadata                : "sanitise",  
          macros                  : "sanitise",  
          embedded_files          : "sanitise",  
          internal_hyperlinks     : "sanitise",  
          external_hyperlinks     : "sanitise",  
          review_comments         : "sanitise",  
          dynamic_data_exchange   : "sanitise",  
          embedded_images         : "sanitise",  
        },
        tiffConfig:{
          geotiff                 : "sanitise"
        }
      });

    interface PdfPolicy{
      watermark               : string,
      metadata                : string,
      javascript              : string,
      acroform                : string,
      actions_all             : string,
      embedded_files          : string,
      external_hyperlinks     : string,
      internal_hyperlinks     : string,
      embedded_images         : string,      
    }

    interface WordPolicy{
      metadata                : string,
      macros                  : string,
      embedded_files          : string,
      review_comments         : string,
      internal_hyperlinks     : string,
      external_hyperlinks     : string,
      dynamic_data_exchange   : string,
      embedded_images         : string,
    }

    interface PptPolicy{
      metadata                : string,
      macros                  : string,
      embedded_files          : string,
      review_comments         : string,
      internal_hyperlinks     : string,
      external_hyperlinks     : string,
      embedded_images         : string,      
    }

    interface ExcelPolicy{
      metadata                : string,
      macros                  : string,
      embedded_files          : string,
      internal_hyperlinks     : string,
      external_hyperlinks     : string,
      review_comments         : string,
      dynamic_data_exchange   : string,
      embedded_images         : string,
    }

    interface TiffPolicy{
      geotiff                : string,
    }

    interface PolicyConfig
    {      
      pdfConfig                 : PdfPolicy,
      wordConfig                : WordPolicy,
      xlsConfig                 : ExcelPolicy,
      pptConfig                 : PptPolicy,
      tiffConfig                : TiffPolicy      
    }
   

    React.useEffect(()=>{
      console.log("value React.useEffect called")
      //setPrevPolicy(prevPolicy);
     
  },[ policy, readyForRender]);
 
  React.useEffect(()=>{
    Utils.getPastPolicy().then((policyJson:any) => {
      console.log('policy - '+JSON.stringify(policyJson))
      let pdfPolicy = {
        watermark : policyJson.config.pdfConfig[0].watermark[0],
        external_hyperlinks: policyJson.config.pdfConfig[0].external_hyperlinks[0],
        acroform: policyJson.config.pdfConfig[0].acroform[0],
        metadata: policyJson.config.pdfConfig[0].metadata[0],
        javascript: policyJson.config.pdfConfig[0].javascript[0],
        actions_all: policyJson.config.pdfConfig[0].actions_all[0],
        internal_hyperlinks: policyJson.config.pdfConfig[0].internal_hyperlinks[0],
        embedded_files: policyJson.config.pdfConfig[0].embedded_files[0],
        embedded_images: policyJson.config.pdfConfig[0].embedded_images[0]
      }
      let wordPolicy = {        
        macros: policyJson.config.wordConfig[0].macros[0],
        metadata: policyJson.config.wordConfig[0].metadata[0],
        review_comments: policyJson.config.wordConfig[0].review_comments[0],
        embedded_files: policyJson.config.wordConfig[0].embedded_files[0],
        internal_hyperlinks: policyJson.config.wordConfig[0].internal_hyperlinks[0],
        external_hyperlinks: policyJson.config.wordConfig[0].external_hyperlinks[0],
        dynamic_data_exchange: policyJson.config.wordConfig[0].dynamic_data_exchange[0],
        embedded_images: policyJson.config.wordConfig[0].embedded_images[0]
      }
      let excelPolicy = {
        macros: policyJson.config.xlsConfig[0].macros[0],
        metadata: policyJson.config.xlsConfig[0].metadata[0],
        review_comments: policyJson.config.xlsConfig[0].review_comments[0],
        embedded_files: policyJson.config.xlsConfig[0].embedded_files[0],
        internal_hyperlinks: policyJson.config.xlsConfig[0].internal_hyperlinks[0],
        external_hyperlinks: policyJson.config.xlsConfig[0].external_hyperlinks[0],
        dynamic_data_exchange: policyJson.config.xlsConfig[0].dynamic_data_exchange[0],
        embedded_images: policyJson.config.xlsConfig[0].embedded_images[0]
      }
      let pptPolicy = {
        macros: policyJson.config.pptConfig[0].macros[0],
        metadata: policyJson.config.pptConfig[0].metadata[0],
        review_comments: policyJson.config.pptConfig[0].review_comments[0],
        embedded_files: policyJson.config.pptConfig[0].embedded_files[0],
        internal_hyperlinks: policyJson.config.pptConfig[0].internal_hyperlinks[0],
        external_hyperlinks: policyJson.config.pptConfig[0].external_hyperlinks[0],
        embedded_images: policyJson.config.pptConfig[0].embedded_images[0],
      }
      
      let tiffPolicy = {
        geotiff: policyJson.config.tiffConfig[0].geotiff[0]
      }   

      if(policy){
        policy.pdfConfig = pdfPolicy  
        policy.wordConfig = wordPolicy
        policy.pptConfig = pptPolicy
        policy.xlsConfig = excelPolicy
        policy.tiffConfig = tiffPolicy
      }
      console.log('policy set-> '+policy)
      setPolicy(policy)
      setPrevPolicy(JSON.parse(JSON.stringify(policy)))
      setReadyForRender(!readyForRender)
    })    
    },[]);

   const savePolicy =()=>{
      console.log('Saving policy - '+JSON.stringify(policy))
      setLoader(true)
      Utils.savePolicy({"config":policy})
      setPrevPolicy(JSON.parse(JSON.stringify(policy)));
      sessionStorage.removeItem("policy_changes")
      //prevPolicy = policy;
    }


    const handleClose = (event: any, reason: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setLoader(false);
    };

    const handleChange =(event: any) => {
      let oldPolicy = policy;
      let pdfPol = oldPolicy?.pdfConfig || undefined
      if(pdfPol){
        pdfPol.metadata = event.target.value
      }
      setPolicy(oldPolicy);
      setReadyForRender(!readyForRender)
    }
    
    console.log("current" + policy.pdfConfig.metadata)
    console.log("old" + prevPolicy.pdfConfig.metadata)
    return(
      <>
        <div className={classes.root}> 
            <SideDrawer showBack={false}/>
            <main className={classes.content}>
                {loader  && <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'}} open={loader} autoHideDuration={3000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success">
                    Successfully Saved
                  </Alert>
                </Snackbar> }  
                <div className={classes.toolbar} />  
                <div className={classes.contentArea}>             
                    <div> 
                    <h3>Past Rebuild Policy</h3>               
                    <Grid container>
                      <Grid item  xs={12}>
                          <div id='current-policy'>
                              {/* <TitleBar title="Current Policy"></TitleBar> */}

                                {/* <div className={classes.toolbar} /> */}
                             
                                <h3 className={classes.heading}>PDF Config</h3>
                                <form className={classes.root} autoComplete="off">                                  
                                
                                <FormControl className={classes.formControl} disabled>
                                  {(policy?.pdfConfig.watermark != prevPolicy?.pdfConfig.watermark) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                  <InputLabel htmlFor="pdf-watermark" className={classes.inputLabel} style={disabledColor}>Watermark</InputLabel>
                                  <Input id="pdf-watermark" value={policy?.pdfConfig.watermark} onChange={(event) =>{                               
                                                                      if(event.target.value.length > 19){
                                                                        return
                                                                      }
                                                                      let pdfPol = policy?.pdfConfig || undefined
                                                                      if(pdfPol){
                                                                        pdfPol.watermark = event.target.value
                                                                      }
                                                                      setReadyForRender(!readyForRender)
                                                                    }
                                  } />
                                  <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    {(policy?.pdfConfig.metadata != prevPolicy?.pdfConfig.metadata) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="pdf-metadata" className={classes.inputLabel} style={greenColor}>Metadata</InputLabel>
                                    <MuiThemeProvider theme={theme1}>
                                    <Select
                                      
                                      value={policy?.pdfConfig.metadata}
                                      onChange={handleChange}
                                      inputProps={{
                                        name: "pdfMetadata",
                                        id: 'pdf-metadata',
                                        readOnly: true
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                     </MuiThemeProvider>
                                     <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pdfConfig.acroform != prevPolicy?.pdfConfig.acroform) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="pdf-acroform" className={classes.inputLabel} style={greenColor}>Acroform</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pdfConfig.acroform}
                                      onChange={(event: any) => {
                                                                  let pdfPol = policy?.pdfConfig || undefined
                                                                  if(pdfPol){
                                                                    pdfPol.acroform = event.target.value
                                                                  }
                                                                  setReadyForRender(!readyForRender)
                                                                }}
                                      inputProps={{
                                        name: "pdfAcroform",
                                        id: 'pdf-acroform',
                                        readOnly: true
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pdfConfig.javascript != prevPolicy?.pdfConfig.javascript) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="pdf-javascript" className={classes.inputLabel} style={purpleColor}>Javascript</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pdfConfig.javascript}
                                      onChange={(event: any) => {
                                                                let pdfPol = policy?.pdfConfig || undefined
                                                                if(pdfPol){
                                                                  pdfPol.javascript = event.target.value
                                                                }
                                                                setReadyForRender(!readyForRender)
                                                              }}
                                      inputProps={{
                                        name: 'pdfJavascript',
                                        id: 'pdf-javascript',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pdfConfig.actions_all != prevPolicy?.pdfConfig.actions_all) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="pdf-actions-all" className={classes.inputLabel} style={greenColor}>Actions All</InputLabel>
                                    <Select
                                     className={classes.selectBox}
                                      value={policy?.pdfConfig.actions_all}
                                      onChange={(event: any) => {
                                                                let pdfPol = policy?.pdfConfig || undefined
                                                                if(pdfPol){
                                                                  pdfPol.actions_all = event.target.value
                                                                }                                                                  
                                                                  setReadyForRender(!readyForRender)
                                                                }}
                                      inputProps={{
                                        name: 'pdfActionsAll',
                                        id: 'pdf-actions-all',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pdfConfig.embedded_files != prevPolicy?.pdfConfig.embedded_files) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="pdf-embedded-files" className={classes.inputLabel} style={blueColor}>Embedded Files</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pdfConfig.embedded_files}
                                      onChange={(event: any) => {
                                        let pdfPol = policy?.pdfConfig || undefined
                                        if(pdfPol){
                                          pdfPol.embedded_files = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pdfEmbeddedFiles',
                                        id: 'pdf-embedded-files',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pdfConfig.internal_hyperlinks != prevPolicy?.pdfConfig.internal_hyperlinks) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="pdf-internal-hyperlinks" className={classes.inputLabel} style={purpleColor}>Internal Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pdfConfig.internal_hyperlinks}
                                      onChange={(event: any) => {
                                        let pdfPol = policy?.pdfConfig || undefined
                                        if(pdfPol){
                                          pdfPol.internal_hyperlinks = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pdfInternalHyperlinks',
                                        id: 'pdf-internal-hyperlinks',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pdfConfig.external_hyperlinks != prevPolicy?.pdfConfig.external_hyperlinks) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="pdf-external-hyperlinks" className={classes.inputLabel} style={blueColor}>External Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pdfConfig.external_hyperlinks}
                                      onChange={(event: any) => {
                                        let pdfPol = policy?.pdfConfig || undefined
                                        if(pdfPol){
                                          pdfPol.external_hyperlinks = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pdfExternalHyperlinks',
                                        id: 'pdf-external-hyperlinks',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pdfConfig.embedded_images != prevPolicy?.pdfConfig.embedded_images) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="pdf-embedded-images" className={classes.inputLabel} style={purpleColor}>Embedded Images</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pdfConfig.embedded_images}
                                      onChange={(event: any) => {
                                        let pdfPol = policy?.pdfConfig || undefined
                                        if(pdfPol){
                                          pdfPol.embedded_images = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pdfEmbeddedImages',
                                        id: 'pdf-embedded-images',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  </form>


                                  <h3>Word Config</h3>
                                  <form className={classes.root} autoComplete="off">
                                  <FormControl className={classes.formControl}>
                                    {(policy?.wordConfig.metadata != prevPolicy?.wordConfig.metadata) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="word-metadata" className={classes.inputLabel} style={redColor}>Metadata</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.wordConfig.metadata}
                                      onChange={(event: any) => {
                                        let wordPol = policy?.wordConfig || undefined
                                        if(wordPol){
                                          wordPol.metadata = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordMacros',
                                        id: 'word-macros',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.wordConfig.macros != prevPolicy?.wordConfig.macros) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="word-macros" className={classes.inputLabel} style={redColor}>Macros</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.wordConfig.macros}
                                      onChange={(event: any) => {
                                        let wordPol = policy?.wordConfig || undefined
                                        if(wordPol){
                                          wordPol.macros = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordMacros',
                                        id: 'word-macros',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  
                                  <FormControl className={classes.formControl}>
                                    {(policy?.wordConfig.review_comments != prevPolicy?.wordConfig.review_comments) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="word-review-comments" className={classes.inputLabel} style={orangeColor}>Review Comments</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.wordConfig.review_comments}
                                      onChange={(event: any) => {
                                        let wordPol = policy?.wordConfig || undefined
                                        if(wordPol){
                                          wordPol.review_comments = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordReviewComments',
                                        id: 'word-review-comments',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.wordConfig.embedded_files != prevPolicy?.wordConfig.embedded_files) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="word-embedded-files" className={classes.inputLabel} style={blueColor}>Embedded Files</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.wordConfig.embedded_files}
                                      onChange={(event: any) => {
                                        let wordPol = policy?.wordConfig || undefined
                                        if(wordPol){
                                          wordPol.embedded_files = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordEmbeddedFiles',
                                        id: 'word-embedded-files',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.wordConfig.internal_hyperlinks != prevPolicy?.wordConfig.internal_hyperlinks) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="word-internal-hyperlinks" className={classes.inputLabel} style={purpleColor}>Internal Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.wordConfig.internal_hyperlinks}
                                      onChange={(event: any) => {
                                        let wordPol = policy?.wordConfig || undefined
                                        if(wordPol){
                                          wordPol.internal_hyperlinks = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordInternalHyperlinks',
                                        id: 'word-internal-hyperlinks',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.wordConfig.external_hyperlinks != prevPolicy?.wordConfig.external_hyperlinks) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="word-external-hyperlinks" className={classes.inputLabel} style={blueColor}>External Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.wordConfig.external_hyperlinks}
                                      onChange={(event: any) => {
                                        let wordPol = policy?.wordConfig || undefined
                                        if(wordPol){
                                          wordPol.external_hyperlinks = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordExternalHyperlinks',
                                        id: 'word-external-hyperlinks',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText> 
                                  </FormControl>
                                  <FormControl className={classes.formControl}> 
                                    {(policy?.wordConfig.dynamic_data_exchange != prevPolicy?.wordConfig.dynamic_data_exchange) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="word-dynamic-data-exchange" className={classes.inputLabel} style={purpleColor}>Dynamic Data Exchange</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.wordConfig.dynamic_data_exchange}
                                      onChange={(event: any) => {
                                        let wordPol = policy?.wordConfig || undefined
                                        if(wordPol){
                                          wordPol.dynamic_data_exchange = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordDynamicDataExchange',
                                        id: 'word-dynamic-data-exchange',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.wordConfig.embedded_images != prevPolicy?.wordConfig.embedded_images) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="word-embedded-images" className={classes.inputLabel}  style={blueColor}>Embedded Images</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.wordConfig.embedded_images}
                                      onChange={(event: any) => {
                                        let wordPol = policy?.wordConfig || undefined
                                        if(wordPol){
                                          wordPol.embedded_images = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordEmbeddedImages',
                                        id: 'word-embedded-images',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>
                                   </FormControl>
                                  </form>
                                  <h3>Excel Config</h3>
                                  <form className={classes.root} autoComplete="off">
                                  <FormControl className={classes.formControl}>
                                    {(policy?.xlsConfig.macros != prevPolicy?.xlsConfig.macros) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="excel-macros" className={classes.inputLabel} style={redColor}>Macros</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.xlsConfig.macros}
                                      onChange={(event: any) => {
                                        let excelPol = policy?.xlsConfig || undefined
                                        if(excelPol){
                                          excelPol.macros = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelMacros',
                                        id: 'excel-macros',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.xlsConfig.metadata != prevPolicy?.xlsConfig.metadata) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="excel-metadata" className={classes.inputLabel} style={greenColor}>Metadata</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.xlsConfig.metadata}
                                      onChange={(event: any) => {
                                        let excelPol = policy?.xlsConfig || undefined
                                        if(excelPol){
                                          excelPol.metadata = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelMetadata',
                                        id: 'excel-metadata',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText> 
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.xlsConfig.review_comments != prevPolicy?.xlsConfig.review_comments) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="excel-review-comments" className={classes.inputLabel} style={orangeColor}>Review Comments</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.xlsConfig.review_comments}
                                      onChange={(event: any) => {
                                        let excelPol = policy?.xlsConfig || undefined
                                        if(excelPol){
                                          excelPol.review_comments = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelReviewComments',
                                        id: 'excel-review-comments',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.xlsConfig.embedded_files != prevPolicy?.xlsConfig.embedded_files) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="excel-embedded-files" className={classes.inputLabel} style={blueColor}>Embedded Files</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.xlsConfig.embedded_files}
                                      onChange={(event: any) => {
                                        let excelPol = policy?.xlsConfig || undefined
                                        if(excelPol){
                                          excelPol.embedded_files = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelEmbeddedFiles',
                                        id: 'excel-embedded-files',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.xlsConfig.internal_hyperlinks != prevPolicy?.xlsConfig.internal_hyperlinks) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="excel-internal-hyperlinks" className={classes.inputLabel} style={purpleColor}>Internal Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.xlsConfig.internal_hyperlinks}
                                      onChange={(event: any) => {
                                        let excelPol = policy?.xlsConfig || undefined
                                        if(excelPol){
                                          excelPol.internal_hyperlinks = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'internalHyperlinks',
                                        id: 'excel-internal-hyperlinks',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText> 
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.xlsConfig.external_hyperlinks != prevPolicy?.xlsConfig.external_hyperlinks) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="excel-external-hyperlinks" className={classes.inputLabel} style={greenColor}>External Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.xlsConfig.external_hyperlinks}
                                      onChange={(event: any) => {
                                        let excelPol = policy?.xlsConfig || undefined
                                        if(excelPol){
                                          excelPol.external_hyperlinks = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelExternalHyperlinks',
                                        id: 'excel-external-hyperlinks',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.xlsConfig.dynamic_data_exchange != prevPolicy?.xlsConfig.dynamic_data_exchange) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="excel-dynamic-data-exchange" className={classes.inputLabel} style={blueColor}>Dynamic Data Exchange</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.xlsConfig.dynamic_data_exchange}
                                      onChange={(event: any) => {
                                        let excelPol = policy?.xlsConfig || undefined
                                        if(excelPol){
                                          excelPol.dynamic_data_exchange = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelDynamicDataExchange',
                                        id: 'excel-dynamic-data-exchange',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText> 
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.xlsConfig.embedded_images != prevPolicy?.xlsConfig.embedded_images) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="excel-embedded-images" className={classes.inputLabel} style={purpleColor}>Embedded Images</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.xlsConfig.embedded_images}
                                      onChange={(event: any) => {
                                        let excelPol = policy?.xlsConfig || undefined
                                        if(excelPol){
                                          excelPol.embedded_images = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelEmbeddedImages',
                                        id: 'excel-embedded-images',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  </form>
                                  <h3>Powerpoint Config</h3>
                                  <form className={classes.root} autoComplete="off">
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pptConfig.macros != prevPolicy?.pptConfig.macros) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="ppt-macros" className={classes.inputLabel} style={redColor}>Macros</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pptConfig.macros}
                                      onChange={(event: any) => {
                                        let pptPol = policy?.pptConfig || undefined
                                        if(pptPol){
                                          pptPol.macros = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptMacros',
                                        id: 'ppt-macros',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pptConfig.metadata != prevPolicy?.pptConfig.metadata) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="ppt-metadata" className={classes.inputLabel} style={greenColor}>Metadata</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pptConfig.metadata}
                                      onChange={(event: any) => {
                                        let pptPol = policy?.pptConfig || undefined
                                        if(pptPol){
                                          pptPol.metadata = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptMetadata',
                                        id: 'ppt-metadata',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText> 
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pptConfig.review_comments != prevPolicy?.pptConfig.review_comments) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="ppt-review-comments" className={classes.inputLabel} style={orangeColor}>Review Comments</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pptConfig.review_comments}
                                      onChange={(event: any) => {
                                        let pptPol = policy?.pptConfig || undefined
                                        if(pptPol){
                                          pptPol.review_comments = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptReviewComments',
                                        id: 'ppt-review-comments',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText> 
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pptConfig.embedded_files != prevPolicy?.pptConfig.embedded_files) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="ppt-embedded-files" className={classes.inputLabel} style={blueColor}>Embedded Files</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pptConfig.embedded_files}
                                      onChange={(event: any) => {
                                        let pptPol = policy?.pptConfig || undefined
                                        if(pptPol){
                                          pptPol.embedded_files = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptEmbeddedFiles',
                                        id: 'ppt-embedded-files',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText> 
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pptConfig.internal_hyperlinks != prevPolicy?.pptConfig.internal_hyperlinks) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="ppt-internal-hyperlinks" className={classes.inputLabel} style={purpleColor}>Internal Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pptConfig.internal_hyperlinks}
                                      onChange={(event: any) => {
                                        let pptPol = policy?.pptConfig || undefined
                                        if(pptPol){
                                          pptPol.internal_hyperlinks = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptInternalHyperlinks',
                                        id: 'ppt-internal-hyperlinks',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pptConfig.external_hyperlinks != prevPolicy?.pptConfig.external_hyperlinks) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="ppt-external-hyperlinks" className={classes.inputLabel} style={blueColor}>External Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pptConfig.external_hyperlinks}
                                      onChange={(event: any) => {
                                        let pptPol = policy?.pptConfig || undefined
                                        if(pptPol){
                                          pptPol.external_hyperlinks = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptExternalHyperlinks',
                                        id: 'ppt-external-hyperlinks',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText> 
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    {(policy?.pptConfig.embedded_images != prevPolicy?.pptConfig.embedded_images) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="ppt-embedded-images" className={classes.inputLabel} style={purpleColor}>Embedded Images</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.pptConfig.embedded_images}
                                      onChange={(event: any) => {
                                        let pptPol = policy?.pptConfig || undefined
                                        if(pptPol){
                                          pptPol.embedded_images = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptEmbeddedImages',
                                        id: 'ppt-embedded-images',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText>  
                                  </FormControl>
                                </form>

                                <h3>Tiff Config</h3>
                                  <form className={classes.root} autoComplete="off">
                                  <FormControl className={classes.formControl}>
                                    {(policy?.tiffConfig.geotiff != prevPolicy?.tiffConfig.geotiff) && <Badge color="secondary" variant="dot" className={classes.MuiBadgeBadge}></Badge>}
                                    <InputLabel htmlFor="tiff-geotiff" className={classes.inputLabel} style={redColor}>Geotiff</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy?.tiffConfig.geotiff}
                                      onChange={(event: any) => {
                                        let pptPol = policy?.tiffConfig || undefined
                                        if(pptPol){
                                          pptPol.geotiff = event.target.value
                                        }
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'geotiff',
                                        id: 'tiff-geotiff',
                                        readOnly: true,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    <FormHelperText className={classes.readOnlyText}><LibraryBooksIcon className={classes.readOnlyIcon}/> Read only</FormHelperText> 
                                  </FormControl>
                                </form>
                            </div>
                        </Grid>
		    	            </Grid>
                    </div>
                   
                    
                </div>   
            </main>   
        </div>
     <Footer />
        </>
       
        
    )
}

export default PastRebuildPolicy;