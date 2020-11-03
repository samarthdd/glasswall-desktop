import  React       from 'react';
import { makeStyles }           from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    docerIconGroup:{
        float:                      'left',
        width:                      '100%',
        marginBottom:               '20px',
        '& ul':{
            listStyle:              'none',
            float:                  'right',
            '& li':{
                float:              'left'
            }
        },
        '& h3':{
            float:                  'left'
        }
    },
    grenBtn:{
        background:                 'green',
        height:                     '15px',
        width:                      '15px',
        float:                      'left',
        borderRadius:               '100%',
        margin:                     '10px 5px 0 0'
    },
    redBtn:{
        background:                 'red',
        height:                     '15px',
        width:                      '15px',
        float:                      'left',
        borderRadius:               '100%',
        margin:                     '10px 5px 0 0'
    },
    orangeBtn:{
        background:                 'orange',
        height:                     '15px',
        width:                      '15px',
        float:                      'left',
        borderRadius:               '100%',
        margin:                     '10px 5px 0 0'
    },
    configureBtn:{
        background:                 '#0c3451',
        border:                     'none',
        color:                      '#fff',
        borderRadius:               '3px',
        padding:                    '10px',
        float:                      'left',
        fontSize:                   '12px',
    }
 }));



function HealthCheckStatus(){
    const classes = useStyles(); 

    return(
        <div className={classes.docerIconGroup}>
        <h3>Rebuild Files With Docker</h3>
            <ul>
                <li><span className={classes.grenBtn} title="Docker is running"></span></li>
                <li><span className={classes.redBtn} title="Docker stops"></span></li>
                <li><span className={classes.orangeBtn} title="Docker is in progress"></span></li>
                <li><button className={classes.configureBtn}>Configure</button></li>
            </ul>
        </div> 
       
        
    )
}

export default HealthCheckStatus;