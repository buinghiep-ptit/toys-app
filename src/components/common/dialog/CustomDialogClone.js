import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import styles from 'assets/jss/material-kit-react/common/customDialogCloneStyle.js';
import React from 'react';
import GalleryRoom from '../GalleryRoom.js';

const useStyles = makeStyles(styles);

export default function CustomDialog(props) {
    console.log("custom dialog!");
    const classes = useStyles();
    // const [fullWidth, setFullWidth] = React.useState(true);
    // const [maxWidth, setMaxWidth] = React.useState('lg');
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
                                        {/*  */}
                                        <div className={classes.viewer}>
                                            <GalleryRoom
                                                model={model}
                                                viewport={classes.iframeView}
                                                boxContainer={classes.boxContainer}
                                                linearBar={classes.linearBar}
                                                controlsManager={classes.controls}
                                            />
                                        </div>
                                        {/*  */}
                                    </div>
                                    {/*  */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
