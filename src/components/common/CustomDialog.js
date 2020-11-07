import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Dialog from '@material-ui/core/Dialog';
// import Button from '@material-ui/core/Button';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Viewport3D from './Viewport3D.js';
import styles from '../../assets/jss/material-kit-react/common/customDialogStyle.js';

const useStyles = makeStyles(styles);

export default function CustomDialog(props) {
    const classes = useStyles();
    // const [fullWidth, setFullWidth] = React.useState(true);
    // const [maxWidth, setMaxWidth] = React.useState('lg');
    const [progress, setProgress] = React.useState(16.66);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 101 : prevProgress + 16.66));
        }, 600);
        return () => {
            clearInterval(timer);
        };
    }, []);
    
    const { isOpen, handleClose, model } = props;
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'lg'}
                scroll={'body'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                {/* <DialogTitle id="scroll-dialog-title">
                Xem chi tiết
                    <IconButton
                        onClick={handleClose}
                        style={{ float: "right", top: 0, right: 0, position: "absolute" }}
                        aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={true}> */}
                {/* <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                    </DialogContentText> */}
                {/* <Grid container spacing={3}>
                        <Grid item xs={12} sm={8} md={8} lg={8}
                            className={classes.content}
                            >
                                <Viewport3D viewport={classes.viewport} />
                            
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Paper>xs=12 md=4</Paper>
                        </Grid>
                    </Grid> */}
                {/* </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Thoát
                     </Button>
                </DialogActions> */}
                <div className={classes.popup}>
                    <div className={classes.popupContainer} style={{}}>
                        <IconButton
                            onClick={handleClose}
                            style={{ float: "right", top: 0, right: 0, position: "absolute", color: "white" }}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <div className={classes.popupContent}>
                            <div style={{}} className={classes.popupModel}>
                                <div className={classes.modelContainer} style={{}}>
                                    <div className={classes.modelMain} style={{}}>
                                        <div className={classes.viewer}>
                                            <Viewport3D
                                                model={model}
                                                viewport={classes.iframeView}
                                                boxContainer={classes.boxContainer}
                                                linearBar={classes.linearBar}
                                                progress={progress}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
