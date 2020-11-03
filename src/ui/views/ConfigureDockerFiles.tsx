import React, { useState }      from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import SideDrawer               from '../components/SideDrawer';
import Table                    from '@material-ui/core/Table';
import TableBody                from '@material-ui/core/TableBody';
import TableCell                from '@material-ui/core/TableCell';
import TableContainer           from '@material-ui/core/TableContainer';
import TableHead                from '@material-ui/core/TableHead';
import TableRow                 from '@material-ui/core/TableRow';
import Paper                    from '@material-ui/core/Paper';
import CheckCircleIcon          from '@material-ui/icons/CheckCircle';
import CancelIcon               from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    root: {
        display:                    'flex',
    },
    toolbar: {
        display:                    'flex',
        alignItems:                 'center',
        justifyContent:             'flex-end',
        padding:                    theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow:                   1,
    },
    contentArea: {
        minHeight:                  '85.7vh',
        padding:                    theme.spacing(3),
        '& p': {
            fontSize:               '12px',
            fontWeight:             'bold'
        }
    },
    textContainer: {
        margin:                     '20px 0',
        float:                      'left',
        width:                      '100%',
        '& h4': {
            margin:                 '10px 0 0 0'
        },
        '& p': {
            float:                  'left',
            width:                  '100%'
        }
    },
    apiKeyBox: {
        margin:                     '10px 0',
        background:                 '#e7e7e7',
        padding:                    '5px 10px',
        float:                      'left',
        '& input': {
            border:                 'none',
            background:             'transparent',
            float:                  'left',
            minHeight:              '30px',
            minWidth:               '300px',
            '&:focus': {
                border:             '0',
                outline:            '0'
            }
        },
        '& button': {
            border:                 'none',
            background:             'transparent',
            '&:focus': {
                border:             '0',
                outline:            '0'
            }
        }
    },
    table: {
        minWidth:                   '100%',
        '& th':{
            fontWeight:             'bold',
            background:             '#003962',
            color:                  '#fff'
        },
        '& td':{
            paddingTop:             '10px',
            paddingBottom:          '10px'
        }
    },
    healthCheckBtn:{        
        background:                 '#3cb371',
        border:                     'none',
        color:                      '#fff',
        borderRadius:               '3px',
        padding:                    '10px 20px',
        float:                      'right',
        fontSize:                   '12px',
        marginBottom:               '20px'
    },
    installBtn:{
        background:                 '#fff',
        border:                     '2px solid #0c3451',
        color:                      '#0c3451',
        borderRadius:               '3px',
        padding:                    '5px',
        float:                      'left',
        marginRight:                '5px',
        marginLeft:                '5px'
    },
    check:{
        color:                      'green',
        width:                      '18px'
    },
    cancel:{
        color:                      'red',
        width:                      '18px'
    }
}));

function createData(type:any, status:any, action:any) {
    return { type, status, action };
}

const rows = [
    createData('Docker installed', 'ok', "Install", ),
    createData('Start Docker', 'cancel', 9.0),
    createData('License', 'cancel', 16.0)
];

function ConfigureDockerFiles() {
    const classes = useStyles();    

    return (
        <div className={classes.root}>
            <SideDrawer showBack={false} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.contentArea}>
                    <h3>Health Check Status</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry </p>
                    <div className={classes.textContainer}>
                        <button className={classes.healthCheckBtn}>Health Check Btn</button>
                        <TableContainer>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.type}>
                                            <TableCell>
                                                {row.type}
                                            </TableCell>
                                            <TableCell align="left">{row.status} <CheckCircleIcon className={classes.check}/></TableCell>
                                            <TableCell align="left">{row.action} 
                                                <button className={classes.installBtn}>Install</button>
                                                <button className={classes.installBtn}>Pull Image</button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </main>
        </div>


    )
}

export default ConfigureDockerFiles;