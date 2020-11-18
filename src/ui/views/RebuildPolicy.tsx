import  React, {useState}       from 'react';
import { makeStyles,createMuiTheme }           from '@material-ui/core/styles';
import SideDrawer               from '../components/SideDrawer';
import Highlight                from 'react-highlight.js';
import * as Utils               from '../utils/utils'
import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, MuiThemeProvider, Select } from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

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
  backgroundColor:"#26a61a",
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



function RebuildPolicy(){
    const classes = useStyles(); 
    const [readyForRender, setReadyForRender]   = useState(false)
    const [policy, setPolicy]   = useState<Policy>( {
      policyName               :'sample policy',
      pdfWatermark             :'Watermark',
      pdfAcroform              :'sanitise',
      pdfMetadata              :'sanitise',
      pdfJavascript            :'sanitise',
      pdfActionsAll            :'sanitise',
      pdfEmbeddedFiles         :'sanitise',
      pdfInternalHyperlinks    :'sanitise',
      pdfExternalHyperlinks    :'sanitise',
      pdfEmbeddedImages        :'sanitise',
      wordMacros               :'sanitise',
      wordMetadata             :'sanitise',
      wordReviewComments       :'sanitise',
      wordEmbeddedFiles        :'sanitise',
      wordInternalHyperlinks   :'sanitise',
      wordExternalHyperlinks   :'sanitise',
      wordDynamicDataExchange  :'sanitise',
      wordEmbeddedImages       :'sanitise',
      excelMacros              :'sanitise',
      excelMetadata            :'sanitise',
      excelReviewComments      :'sanitise',
      excelEmbeddedFiles       :'sanitise',
      excelInternalHyperlinks  :'sanitise',
      excelExternalHyperlinks  :'sanitise',
      excelDynamicDataExchange :'sanitise',
      excelEmbeddedImages      :'sanitise',
      pptMacros                :'sanitise',
      pptMetadata              :'sanitise',
      pptReviewComments        :'sanitise',
      pptEmbeddedFiles         :'sanitise',
      pptInternalHyperlinks    :'sanitise',
      pptExternalHyperlinks    :'sanitise',
      pptEmbeddedImages        :'sanitise',
      zip                      :'process',
    
    });

    interface Policy
    {
      policyName                : string,
      pdfWatermark              : string,
      pdfAcroform               : string,
      pdfMetadata               : string,
      pdfJavascript             : string,
      pdfActionsAll             : string,
      pdfEmbeddedFiles          : string,
      pdfInternalHyperlinks     : string,
      pdfExternalHyperlinks     : string,
      pdfEmbeddedImages         : string,
      wordMacros                : string,
      wordMetadata              : string,
      wordReviewComments        : string,
      wordEmbeddedFiles         : string,
      wordInternalHyperlinks    : string,
      wordExternalHyperlinks    : string,
      wordDynamicDataExchange   : string,
      wordEmbeddedImages        : string,
      excelMacros               : string,
      excelMetadata             : string,
      excelReviewComments       : string,
      excelEmbeddedFiles        : string,
      excelInternalHyperlinks   : string,
      excelExternalHyperlinks   : string,
      excelDynamicDataExchange  : string,
      excelEmbeddedImages       : string,
      pptMacros                 : string,
      pptMetadata               : string,
      pptReviewComments         : string,
      pptEmbeddedFiles          : string,
      pptInternalHyperlinks     : string,
      pptExternalHyperlinks     : string,
      pptEmbeddedImages         : string,
      zip                       : string,

    }
   

    React.useEffect(()=>{
      console.log("value React.useEffect called")
      
  },[policy, readyForRender]);
 

   const handleChange =(event: any)=>{
     let name: string;
    
    }
   
    console.log(policy.zip);
    return(
        <div className={classes.root}> 
            <SideDrawer showBack={false}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />  
                <div className={classes.contentArea}>             
                    <div> 
                    <h3>Draft Policy </h3>                    
                    <Grid container>
                      <Grid item  xs={12}>
                          <div id='current-policy'>
                              {/* <TitleBar title="Current Policy"></TitleBar> */}

                                {/* <div className={classes.toolbar} /> */}
                                <h2 >Current Configuration: {policy.policyName}</h2>
                                <div className={classes.divStyle}>
                                <MuiThemeProvider theme={ColorTheme}>
                                    <Button   className={classes.saveBtn}>
                                        Save
                                    </Button>
                                    
                                </MuiThemeProvider>
                            </div>

                                <form>
                                    {/*<h2>Archive Manager</h2>*/}
                                    <h3 >Tagging</h3>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="archive-manager" className={classes.inputLabel} style={greenColor}>Tag files on upload</InputLabel>
                                        <Select className={classes.selectBox}
                                                value={policy.zip}
                                                name ="zip"
                                                onChange={(event: any)=>{
                                                  policy.zip = event.target.value;
                                                  setPolicy(policy); 
                                                  setReadyForRender(!readyForRender)
                                                }}
                                                inputProps={{ name: 'zip',  id: 'archive-manager'}}
                                        >
                                            <MenuItem value="process">Yes</MenuItem>
                                            <MenuItem value="discard">No</MenuItem>
                                            {/*<MenuItem value="no-action">No Action</MenuItem>*/}
                                        </Select>
                                        
                                    </FormControl>
                                </form>


                                <h3 >PDF Config</h3>
                                <form className={classes.root} autoComplete="off">
                                  <FormControl className={classes.formControl} disabled>
                                    <InputLabel htmlFor="pdf-watermark"  className={classes.inputLabel} style={disabledColor}>Security Tag</InputLabel>
                                    <Input id="pdf-watermark" value={policy.pdfWatermark} onChange={(event: any) => {policy.pdfWatermark= event.target.value}} />
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="pdf-acroform" className={classes.inputLabel} style={greenColor}>Acroform</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pdfAcroform}
                                      onChange={(event: any) => {
                                                                  policy.pdfAcroform= event.target.value
                                                                  setReadyForRender(!readyForRender)
                                                                }}
                                      inputProps={{
                                        name: "pdfAcroform",
                                        id: 'pdf-acroform'
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="pdf-metadata" className={classes.inputLabel} style={blueColor}>Metadata</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pdfMetadata}
                                      onChange={(event: any) => {policy.pdfMetadata= event.target.value
                                                                 setReadyForRender(!readyForRender)
                                                                }}
                                      inputProps={{
                                        name: 'pdfMetadata',
                                        id: 'pdf-metadata',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="pdf-javascript" className={classes.inputLabel} style={purpleColor}>Javascript</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pdfJavascript}
                                      onChange={(event: any) => {
                                                                policy.pdfJavascript= event.target.value
                                                                setReadyForRender(!readyForRender)
                                                              }}
                                      inputProps={{
                                        name: 'pdfJavascript',
                                        id: 'pdf-javascript',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="pdf-actions-all" className={classes.inputLabel} style={greenColor}>Actions All</InputLabel>
                                    <Select
                                     className={classes.selectBox}
                                      value={policy.pdfActionsAll}
                                      onChange={(event: any) => {
                                                                  policy.pdfActionsAll= event.target.value
                                                                  setReadyForRender(!readyForRender)
                                                                }}
                                      inputProps={{
                                        name: 'pdfActionsAll',
                                        id: 'pdf-actions-all',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="pdf-embedded-files" className={classes.inputLabel} style={blueColor}>Embedded Files</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pdfEmbeddedFiles}
                                      onChange={(event: any) => {
                                        policy.pdfEmbeddedFiles= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pdfEmbeddedFiles',
                                        id: 'pdf-embedded-files',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="pdf-internal-hyperlinks" className={classes.inputLabel} style={purpleColor}>Internal Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pdfInternalHyperlinks}
                                      onChange={(event: any) => {
                                        policy.pdfInternalHyperlinks= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pdfInternalHyperlinks',
                                        id: 'pdf-internal-hyperlinks',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="pdf-external-hyperlinks" className={classes.inputLabel} style={blueColor}>External Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pdfExternalHyperlinks}
                                      onChange={(event: any) => {
                                        policy.pdfExternalHyperlinks= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pdfExternalHyperlinks',
                                        id: 'pdf-external-hyperlinks',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="pdf-embedded-images" className={classes.inputLabel} style={purpleColor}>Embedded Images</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pdfEmbeddedImages}
                                      onChange={(event: any) => {
                                        policy.pdfEmbeddedImages= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pdfEmbeddedImages',
                                        id: 'pdf-embedded-images',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  </form>


                                  <h3>Word Config</h3>
                                  <form className={classes.root} autoComplete="off">
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="word-macros" className={classes.inputLabel} style={redColor}>Macros</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.wordMacros}
                                      onChange={(event: any) => {
                                        policy.wordMacros= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordMacros',
                                        id: 'word-macros',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="word-metadata" className={classes.inputLabel} style={greenColor}>Metadata</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.wordMetadata}
                                      onChange={(event: any) => {
                                        policy.wordMetadata= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordMetadata',
                                        id: 'word-metadata',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="word-review-comments" className={classes.inputLabel} style={orangeColor}>Review Comments</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.wordReviewComments}
                                      onChange={(event: any) => {
                                        policy.wordReviewComments= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordReviewComments',
                                        id: 'word-review-comments',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="word-embedded-files" className={classes.inputLabel} style={blueColor}>Embedded Files</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.wordEmbeddedFiles}
                                      onChange={(event: any) => {
                                        policy.wordEmbeddedFiles= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordEmbeddedFiles',
                                        id: 'word-embedded-files',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="word-internal-hyperlinks" className={classes.inputLabel} style={purpleColor}>Internal Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.wordInternalHyperlinks}
                                      onChange={(event: any) => {
                                        policy.wordInternalHyperlinks= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordInternalHyperlinks',
                                        id: 'word-internal-hyperlinks',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="word-external-hyperlinks" className={classes.inputLabel} style={blueColor}>External Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.wordExternalHyperlinks}
                                      onChange={(event: any) => {
                                        policy.wordExternalHyperlinks= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordExternalHyperlinks',
                                        id: 'word-external-hyperlinks',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}> 
                                    <InputLabel htmlFor="word-dynamic-data-exchange" className={classes.inputLabel} style={purpleColor}>Dynamic Data Exchange</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.wordDynamicDataExchange}
                                      onChange={(event: any) => {
                                        policy.wordDynamicDataExchange= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'wordDynamicDataExchange',
                                        id: 'word-dynamic-data-exchange',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="word-embedded-images" className={classes.inputLabel}  style={blueColor}>Embedded Images</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.wordEmbeddedImages}
                                      inputProps={{
                                        name: 'wordEmbeddedImages',
                                        id: 'word-embedded-images',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                   </FormControl>
                                  </form>
                                  <h3>Excel Config</h3>
                                  <form className={classes.root} autoComplete="off">
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="excel-macros" className={classes.inputLabel} style={redColor}>Macros</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.excelMacros}
                                      onChange={(event: any) => {
                                        policy.excelMacros= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelMacros',
                                        id: 'excel-macros',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="excel-metadata" className={classes.inputLabel} style={greenColor}>Metadata</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.excelMetadata}
                                      onChange={(event: any) => {
                                        policy.excelMetadata= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelMetadata',
                                        id: 'excel-metadata',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="excel-review-comments" className={classes.inputLabel} style={orangeColor}>Review Comments</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.excelReviewComments}
                                      onChange={(event: any) => {
                                        policy.excelReviewComments= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelReviewComments',
                                        id: 'excel-review-comments',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="excel-embedded-files" className={classes.inputLabel} style={blueColor}>Embedded Files</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.excelEmbeddedFiles}
                                      onChange={(event: any) => {
                                        policy.excelEmbeddedFiles= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelEmbeddedFiles',
                                        id: 'excel-embedded-files',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="excel-internal-hyperlinks" className={classes.inputLabel} style={purpleColor}>Internal Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.excelInternalHyperlinks}
                                      onChange={(event: any) => {
                                        policy.excelInternalHyperlinks= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelInternalHyperlinks',
                                        id: 'excel-internal-hyperlinks',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="excel-external-hyperlinks" className={classes.inputLabel} style={greenColor}>External Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.excelExternalHyperlinks}
                                      onChange={(event: any) => {
                                        policy.excelExternalHyperlinks= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelExternalHyperlinks',
                                        id: 'excel-external-hyperlinks',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="excel-dynamic-data-exchange" className={classes.inputLabel} style={blueColor}>Dynamic Data Exchange</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.excelDynamicDataExchange}
                                      onChange={(event: any) => {
                                        policy.excelDynamicDataExchange= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelDynamicDataExchange',
                                        id: 'excel-dynamic-data-exchange',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="excel-embedded-images" className={classes.inputLabel} style={purpleColor}>Embedded Images</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.excelEmbeddedImages}
                                      onChange={(event: any) => {
                                        policy.excelEmbeddedImages= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'excelEmbeddedImages',
                                        id: 'excel-embedded-images',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  </form>
                                  <h3>Powerpoint Config</h3>
                                  <form className={classes.root} autoComplete="off">
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="ppt-macros" className={classes.inputLabel} style={redColor}>Macros</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pptMacros}
                                      onChange={(event: any) => {
                                        policy.pptMacros= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptMacros',
                                        id: 'ppt-macros',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="ppt-metadata" className={classes.inputLabel} style={greenColor}>Metadata</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pptMetadata}
                                      onChange={(event: any) => {
                                        policy.pptMetadata= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptMetadata',
                                        id: 'ppt-metadata',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="ppt-review-comments" className={classes.inputLabel} style={orangeColor}>Review Comments</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pptReviewComments}
                                      onChange={(event: any) => {
                                        policy.pptReviewComments= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptReviewComments',
                                        id: 'ppt-review-comments',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="ppt-embedded-files" className={classes.inputLabel} style={blueColor}>Embedded Files</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pptEmbeddedFiles}
                                      onChange={(event: any) => {
                                        policy.pptEmbeddedFiles= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptEmbeddedFiles',
                                        id: 'ppt-embedded-files',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="ppt-internal-hyperlinks" className={classes.inputLabel} style={purpleColor}>Internal Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pptInternalHyperlinks}
                                      onChange={(event: any) => {
                                        policy.pptInternalHyperlinks= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptInternalHyperlinks',
                                        id: 'ppt-internal-hyperlinks',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="ppt-external-hyperlinks" className={classes.inputLabel} style={blueColor}>External Hyperlinks</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pptExternalHyperlinks}
                                      onChange={(event: any) => {
                                        policy.pptExternalHyperlinks= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptExternalHyperlinks',
                                        id: 'ppt-external-hyperlinks',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="ppt-embedded-images" className={classes.inputLabel} style={purpleColor}>Embedded Images</InputLabel>
                                    <Select
                                      className={classes.selectBox}
                                      value={policy.pptEmbeddedImages}
                                      onChange={(event: any) => {
                                        policy.pptEmbeddedImages= event.target.value
                                        setReadyForRender(!readyForRender)
                                      }}
                                      inputProps={{
                                        name: 'pptEmbeddedImages',
                                        id: 'ppt-embedded-images',
                                        readOnly: false,
                                      }}
                                    >

                                      <MenuItem value="sanitise">Sanitise</MenuItem>
                                      <MenuItem value="allow">Allow</MenuItem>
                                      <MenuItem value="disallow">Disallow</MenuItem>
                                    </Select>
                                    
                                  </FormControl>
                                  </form>
                            </div>
                        </Grid>
		    	            </Grid>
                    </div>
                   
                    
                </div>   
            </main>   
        </div>
       
        
    )
}

export default RebuildPolicy;