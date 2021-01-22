import React from 'react';
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ViewportXR from '../ViewportXR.js';

import styles from 'assets/jss/material-kit-react/components/customDialogStyle.js';

import CustomSidebar from './CustomSidebar.js';
import CustomBottomModel from './CustomBottomModel.js';

const useStyles = makeStyles(styles);

CustomDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    model: PropTypes.object.isRequired
}
CustomDialog.defaultProps = {

}
export default function CustomDialog({ isOpen, handleClose, model }) {
    console.log("custom dialog!");
    const classes = useStyles();
    // const [fullWidth, setFullWidth] = React.useState(true);
    // const [maxWidth, setMaxWidth] = React.useState('lg');
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
                                            <ViewportXR
                                                model={model}
                                                viewport={classes.iframeView}
                                                boxContainer={classes.boxContainer}
                                                linearBar={classes.linearBar}
                                                controlsManager={classes.controls}
                                            />
                                        </div>
                                        {/*  */}
                                        <CustomBottomModel />
                                    </div>
                                    {/*  */}
                                    <CustomSidebar />
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
