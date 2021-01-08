import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Dialog from '@material-ui/core/Dialog';

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from '@material-ui/icons/Comment';

import Button from '../../components/common/CustomButton.js';

import ViewportXR from './ViewportXR.js';
import GalleryRoom from './GalleryRoom.js';

import styles from '../../assets/jss/material-kit-react/common/customDialogStyle.js';

const useStyles = makeStyles(styles);

export default function CustomDialog(props) {
    console.log("custom dialog!");
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

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        // setValue(newValue);
    };

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
                                            <ViewportXR
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
