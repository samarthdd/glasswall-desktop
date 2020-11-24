import  React, {useState}       from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import SideDrawer               from '../components/SideDrawer';
import Highlight                from 'react-highlight.js';
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
   
 }));



function LoggerView(){
    const classes = useStyles(); 
    const [logView, setLogView]                     = useState(true);  

    const clearLogs =()=>{
        Utils.cleanRawLogger()
        setLogView(!logView)
    }

   
    return(
        <div className={classes.root}> 
            <SideDrawer showBack={false}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />  
                <div className={classes.contentArea}>             
                    <div> 
                    <h3>Raw Logs </h3>                    
                    <Highlight language='javascript'>{Utils.getRawLogs() || ""}</Highlight>
                    </div>
                   
                    
                </div>   
            </main>   
        </div>
       
        
    )
}

export default LoggerView;