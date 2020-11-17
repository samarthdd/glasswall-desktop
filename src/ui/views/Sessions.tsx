import  React, {useState}       from 'react';
import { makeStyles }           from '@material-ui/core/styles';

import Table                    from '@material-ui/core/Table';
import TableBody                from '@material-ui/core/TableBody';
import TableCell                from '@material-ui/core/TableCell';
import TableHead                from '@material-ui/core/TableHead';
import TableRow                 from '@material-ui/core/TableRow';
import DeleteIcon               from '@material-ui/icons/Delete';
import FolderIcon               from '@material-ui/icons/Folder';
import {Redirect}                 from 'react-router-dom'
import { CardActions,
        TablePagination,
        Switch,
        FormControlLabel,
        Tooltip 
    }                           from '@material-ui/core';
import Footer                   from '../components/Footer';
import Dropzone                 from "react-dropzone";
import FileCopyIcon             from '@material-ui/icons/FileCopy';
import DropIcon                 from '../assets/images/dropIcon.png'
import SideDrawer               from '../components/SideDrawer';
import * as DockerUtils         from '../components/DockerUtils'
import * as SerialDocker        from '../components/SerialDocker'
import Loader                   from '../components/Loader';
import * as Utils               from '../utils/utils'
import * as SessionsUtils               from '../components/SessionsUtils'
const { dialog }                = require('electron').remote


var fs                          = require('fs');
const commonPath                = require('common-path');


const useStyles = makeStyles((theme) => ({
    root:       {   
        display:                    'flex', 
        background:                 '#fff'
    },    
    table: {
        minWidth:                   650,
        '& td':{
            paddingTop:             '10px',
            paddingBottom:          '10px'
        }
    },
    container:  {
        display:                    'grid',
        gridGap:                    theme.spacing(2),
    },
    gridItemRight:{
        minHeight:                  '86vh',
        paddingLeft:                '20px!important',

        '& h3':{
            color:                  '#0c3451',
            margin:                 '0 0 20px 0',
        }
    },
    actions: {
        justifyContent:             'flex-end'
    },
    gridItemLeft:{
    },
    dropzone:{
        border:                     '2px dashed #6ab8f0',
        borderRadius:               '35px',
        minHeight:                  '300px',
        display:                    'flex',
        justifyContent:             'center',
        marginBottom:               '20px',
        fontSize:                   '20px',
        alignItems:                 'center',    
        width:                      '70%',
        margin:                     '20px auto',
        background:                 '#f3f8fe',
        '& p':{
            textAlign:              'center',    
            fontSize:               '25px',
            color:                  '#0c3451'      
        } 
   },
   fileItems:{
        listStyle:                  'none',
        float:                      'left',
        padding:                    '0',
        width:                      '100%',
        '& li':{
            marginBottom:           '10px',
            float:                  'left',
            width:                  '100%',
            borderBottom:           '1px solid #ccc',
            paddingBottom:          '5px',

            '& a':{
                color:              '#0c3451',
                textDecoration:     'none',

                '&:hover':{
                    textDecoration: 'underline'
                }
            }
        }
   },
   icons:{
        fontSize:                   '100px',
        color:                      '#ccc',
        width:                      '80px',
        margin:                     '20px 0 30px 0',
   },
   fileIcon:{
        fontSize:                   '15px',
        float:                      'left',
        margin:                     '3px 6px 0 0',
        color:                      '#488acd'
   },
   dropField:{
        float:                      'left',
        width:                      '100%',
        textAlign:                  'center'
   },
   selectFileBtn:{
        display:                    'block',
        margin:                     '0px auto 30px auto',
        padding:                    '10px',
        minWidth:                   '154px',
        borderRadius:               '4px',
        color:                      '#fff',
        background:                 '#469ffd',
        border:                     'none'
   },
   errMsg:{
        color:                      'red',
        margin:                     '0px 0 10px 0',
        fontSize:                   '15px',
        display:                    'none',
        textAlign:                  'center'
},
    successMsg:{
        color:                      'green',
        margin:                     '0px 0 10px 0',
        fontSize:                   '15px',
        display:                    'none',
        textAlign:                  'center'
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
         padding:                   theme.spacing(3)
        
    },
    dropzoneArea:{
        pointerEvents:             'none'
    },
     hlink:{
        maxWidth:                   '245px',
        display:                    'inline-block',
        textOverflow:               'ellipsis',
        whiteSpace:                 'nowrap',
        overflow:                   'hidden',
        cursor:                     'pointer',
        color:                      'blue',
        textDecoration:             'underline'
     },
     viewBtn:{
        color:                      '#fff',
        border:                     'none',
        padding:                    '7px 10px',
        fontSize:                   '12px',
        fontWeight:                 'normal',
        backgroundColor:            '#144e78 ',
        borderRadius:               '3px',
     },
     deleteBtn:{
        background:                 '#1976D2',
        border:                     'none',
        borderRadius:               '3px',
        padding:                    '5px 15px',
        color:                      '#fff',
        fontSize:                   '13px',
        lineHeight:                 '25px',
        position:                   'absolute',
        left:                       '5px',
        marginTop:                  '10px',
        cursor:                     'pointer',
        transition:                 '0.5s',
        '&:hover':{ 
            background:             '#2389ee',
            transition:             '0.5s'
        },
        '&:focus':{ 
            outline:             '0'
        }
     },
     deleteBtnDisabled:{
        border:                    'none',
        borderRadius:              '3px',
        padding:                   '5px 15px',
        color:                     '#fff',
        fontSize:                  '13px',
        lineHeight:                '25px',
        background:                '#ddd',
        left:                      '5px',
        marginTop:                 '20px',
    },
     outFolderBtn:{
        background:                 '#3cb371',
        border:                     'none',
        color:                      '#fff',
        borderRadius:               '3px',
        padding:                    '5px 15px',
        fontSize:                   '13px',
        lineHeight:                 '25px',
        float:                      'right',
        cursor:                     'pointer',
        transition:                 '0.5s',
        '&:hover':{ 
            background:             '#3fc87c',
            transition:             '0.5s'
        },
        '&:focus':{ 
            outline:                '0'
        }
     },
     outFolderBtnDissabled:{
        border:                     'none',
        color:                      '#fff',
        borderRadius:               '3px',
        padding:                    '5px 15px',
        fontSize:                   '13px',
        lineHeight:                 '25px',
        background:                 '#ddd'
     },
     btnIcon:{
        float:                      'left',
        fontSize:                   '22px',
        marginRight:                '5px'
     },
     status:{
        '& p':{
            color:                  '#098c44',
            fontWeight:             'bold'
        },
        '& span':{
            color:                  '#ff0000',
            fontWeight:             'bold'
        }
     },
     tableField:{
         position:                  'relative',
        '& h3':{
            background:             '#003962',
            borderRadius:           '3px',
            float:                  'left',
            width:                  '100%',
            borderTop:              '1px solid #ccc',
            borderBottom:           '1px solid #ccc',
            padding:                '5px 5px 5px 10px',
            color:                  '#fff',
            marginBottom:           '5px',
            lineHeight:             '35px',
            fontWeight:             'normal'
        }
    },
    texttBold:{
        fontWeight:                 'bold',
        fontSize:                   '15px'
    },
    settings:{
        paddingBottom:              '20px',
        float:                      'left',
        width:                      '100%',
        '& h4':{
            fontSize:               '14px',
            color:                  '#003962',
            margin:                 '15px 0'
        }        
    },
    btnHeading:{
        float:                      'left',
        width:                      '100%',
        '& h4':{
            position:               'relative',
            float:                  'left',  
            '& span':{
                color:                  'red',
                margin:                 '14px 5px 0 0px',
            },
        },
    },
    headingGroup:{
        float:                      'left',
        width:                      '100%'
    },
    fileType:{
        float:                      'left',
        width:                      '100%'
    },
    saveFileBtn:{
        '& button':{
            background:              '#084d94',
            border:                  'none',
            color:                   '#fff',
            borderRadius:            '3px',
            padding:                 '5px 15px',
            fontSize:                '13px',
            lineHeight:              '25px',
            float:                   'left',
            cursor:                  'pointer',
            transition:              '0.5s',
            marginRight:             '10px',
            '&:hover':{ 
                background:          '#0f59a5',
                transition:          '0.5s'
            },
            '&:focus':{ 
                outline:             '0'
            }
        },        
        '& input':{
            border:                 '1px solid #ccc',
            padding:                '9px',
            borderRadius:           '3px',
            float:                  'left',
            minWidth:               'calc(100% - 220px)',
            marginRight:            '12px'
        }
    },
    fileOption:{
        float:                      'left',
        '& input':{
            marginRight:            '15px'
        },
        '& span':{            
            fontSize:               '16px',
            marginRight:            '10px'
        }
    },
    alertContainer:{
        width:                      '100%',
        position:                   'fixed',
        height:                     '100%',
        display:                    'flex',
        justifyContent:             'center',
        alignItems:                 'center',
        top:                        '0',
        left:                       '0',
        background:                 'rgba(0,0,0,0.4)',
        zIndex:                     1300
    },  
    alertModel:{
        width:                      '400px',
        background:                 '#fff',
        padding:                    '20px',
        borderRadius:               '5px',
        textAlign:                  'center'
    },
    submitBtn:{
        background:                 '#0c3451',
        color:                      '#fff',
        border:                     'none',
        padding:                    '10px 20px',
        borderRadius:               '3px',
        cursor:                     'pointer'
    },
    toggleContainer:{
        float:                      'right',
        position:                   'relative',
        marginTop:                  '5px',
        '& span':{
            fontWeight:             'bold',
            
        },
        '&:hover':{
            '& div':{
                display:            'block'
            }
        }
    },
    fab: {
        margin:                     theme.spacing(2),
    },
    absolute: {
        position:                   'absolute',
        bottom:                     theme.spacing(2),
        right:                      theme.spacing(3),
    },
    infoIcon:{
        margin:                     '13px 5px 0 0px',
        float:                      'left',
        color:                      'gray'
    },
    toggleToolTip:{
        position:                   'relative'
    },
    toggleToolTipTitle:{
        display:                    'none',
        position:                   'fixed',
        background:                 '#0c3451',
        color:                      '#fff',
        margin:                     '10px',
        padding:                    '10px',
        fontSize:                   '12px',
        borderRadius:               '5px',      
        right:                      '30px',
        maxWidth:                   '300px',
        fontWeight:                 'normal',
        '&::before':{
            content:                '" "',
            height:                 '10px',
            width:                  '10px',
            position:               'absolute',
            background:             '#0c3451',            
            right:                   '14px',
            top:                    '-6px',
            transform:              'rotate(45deg)',
        }
    },
    infobBtn:{},
    tableContainer:{
        background:                 '#f9f9f9',
        borderRadius:               '20px',
        padding:                    '20px',
        boxShadow:                  '0px 0px 5px #ccc',
        width:                      '100%',
        marginBottom:               '20px',
        float:                      'left'
    },
    docerIconGroup:{
        '& h3':{

        }
    },

 }));


function Sessions(){
    
    const classes = useStyles(); 
    const [sessions, setSessions]                   = useState<Array<SessionInfo>>([]);
    const [sessionsPerPage, setSessionsPerPage]     = useState<Array<SessionInfo>>([]);
    const [counter, setCounter]                     = useState(0);
    const [loader, setShowLoader]                   = useState(false);  
    const [page, setPage]                           = useState(0); 
    const [rowsPerPage, setRowsPerPage]             = useState(10);  
    
    interface SessionInfo {
        id              : string,
        type            : string;
        count           : number;
        successCount   : number;
        msg?            : string;
        error            : boolean;
        at              : string;
        location        : string;
      }
   
      interface DisplayInfo {
        type            : string;
        count           : number;
        successCount   : number;
        at              : string;
        location        : string;
      }
   
   
    const getSessionDisplayInfo =(metadata: any)=>{
        let successCount: number =0;
        let createdAt = ''
        let userTargetFolder = ''
        let type ='unknow'
        let info: DisplayInfo ={
            type:'unknown', 
            count:0,
            successCount:0,
            at:'',
            location:''
        };
        info.successCount = 0;

        metadata.map((data:any)=>{
            if(data.status == "Success"){
                info.successCount++;
            }
            info.at = data.time;
            info.location = data.userTargetFolder;
            info.type = data.rebuildSource
        })
        
        return info;
    }
    
    const readSessionResult =(result: any)=>{ 

        console.log("session result" + result)
        let metadata:string[] = [];
        let displayResult: DisplayInfo ={
            type:'unknown', 
            count:0,
            successCount:0,
            at:'',
            location:''
        };

        console.log("session metadata" + metadata)
        if(!result.error){
            metadata = JSON.parse(result.metadata);
            displayResult = getSessionDisplayInfo(metadata);
           
        }
        setSessions(sessions =>[...sessions,  {
            id:result.id,
            type:displayResult.type,
            count: metadata.length,
            successCount: displayResult.successCount,
            error: false,
            msg: '',
            at: displayResult.at,
            location: displayResult.location
            }]);
    
        setCounter(state=>state-1);
    }
    React.useEffect(() => {
        const timer = setTimeout(() => {
            SessionsUtils.getSessionList(Utils.getProcessedPath()).then(function(results:any){
            console.log("getSessionList" + results);
            setCounter(results.length);
            if(results.length>0){
                SessionsUtils.readSessions(results, readSessionResult);
            }

        });
           
          }, 10);
       
       
        
        
    }, []);

    React.useEffect(() => {
        let sessionsReverse = sessions.slice().reverse()
        let sessionsPerPage = sessionsReverse && sessionsReverse.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setSessionsPerPage(sessionsPerPage)
        }, [rowsPerPage, page, sessions]);
      
    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const clearAll =()=>{
        setSessions([]);
        setCounter(0);
    }

   

    return(
        <div>   
            <div className={classes.root}> 
                <SideDrawer showBack={false}/>
                
                <main className={classes.content}>
                 {loader  && <Loader/> }  
                    <div className={classes.toolbar} />  
                    <div className={classes.contentArea}>   
                    <div className={classes.tableContainer}>
                   
                        <div>
                                <div className={classes.tableField}>
                                    <div className={classes.settings}>  
                                        <div className={classes.btnHeading}>                                                                           
                                        <div className={classes.headingGroup}>                                                                         
                                                <h4>Session History  <span>*</span> </h4>
                                               
                                                <div className={classes.toggleContainer}>
                                                </div>
                                                    <div className={classes.toggleContainer}>
                                                   
                                                 </div>
                                            </div>   
                                           
                                        </div>                                        
                                    </div>
                                    {sessions.length>0 && 
                                    <div> 
                                    <h3>Sessions 
                                        <button onClick={()=>Utils.open_file_exp(Utils.getProcessedPath())} className={sessions.length>0? classes.outFolderBtn:classes.outFolderBtnDissabled}><FolderIcon className={classes.btnIcon}/> Browse Sessions Folder</button>
                                    </h3>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.texttBold}>Id</TableCell>
                                            <TableCell align="left" className={classes.texttBold}>Type</TableCell>
                                            <TableCell align="left" className={classes.texttBold}>Total Rebuilt</TableCell>
                                            <TableCell align="left" className={classes.texttBold}>Success</TableCell>
                                            <TableCell align="left" className={classes.texttBold}>Created At</TableCell>
                                            <TableCell align="left" className={classes.texttBold}>Output Folder</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {sessionsPerPage.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell align="left"><a onClick={()=>Utils.open_file_exp(Utils.getProcessedPath() + Utils.getPathSep() + row.id)} target="_blank" className={classes.hlink}>{row.id}</a></TableCell>
                                            <TableCell align="left" className={classes.status}>{row.type}</TableCell>
                                            <TableCell align="left"> {row.count}</TableCell>
                                            <TableCell align="left">{row.successCount}</TableCell>
                                            <TableCell align="left">{new Date(row.at).toLocaleString('en-us')
                                            }</TableCell>
                                            <TableCell align="left"><a onClick={()=>Utils.open_file_exp(row.location)} target="_blank" className={classes.hlink}>{row.location}</a></TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                    </div>
                                    }
                                </div>
                                </div>
                        
                            {
                            sessionsPerPage.length>0 &&
                            <CardActions className={classes.actions}>
                                <TablePagination
                                    onChangePage        ={handleChangePage }
                                    onChangeRowsPerPage ={handleChangeRowsPerPage}
                                    component           ="div"
                                    count               ={sessions.length                   }
                                    page                ={page                           }
                                    rowsPerPage         ={rowsPerPage                    }
                                    rowsPerPageOptions  ={[5, 10, 25, { label: 'All', value: -1 }]     }               
                                    SelectProps         ={{
                                                            inputProps: { 'aria-label': 'rows per page' },
                                                            native: true,
                                                            }}
                                />
                            </CardActions> 
                          }
                    </div>
                    </div>
                    <Footer/>
                </main>
            </div>   
        </div>
       
        
    )
}

export default Sessions;