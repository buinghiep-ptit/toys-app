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
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Button from '../../components/common/CustomButton.js';

import ViewportXR from './ViewportXR.js';

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
                                            <ViewportXR
                                                model={model}
                                                viewport={classes.iframeView}
                                                boxContainer={classes.boxContainer}
                                                linearBar={classes.linearBar}
                                                progress={progress}
                                                controlsManager={classes.controls}
                                            />
                                        </div>
                                        <div className={classes.bottomModel}>
                                            <div className={classes.bottomModelWrapper}>
                                                <div className={classes.wrapperChild}>
                                                    <div className={classes.viewerAdditional}>
                                                        <h1 className={classes.modelName}>
                                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                                <span>Aatrox</span>
                                                            </div>
                                                            <span style={{ display: "block", fontSize: "12px", fontWeight: 400, color: "#888", marginTop: "-3px" }}>3D Model</span>
                                                        </h1>
                                                        <div className={classes.ownerWrapper}>
                                                            <div className={classes.ownerCreator}>
                                                                <a href className={classes.ownerAvatar}>
                                                                    {/* img container */}
                                                                    <div style={{ position: "relative", overflow: "hidden", borderRadius: "12%" }}>
                                                                        <img alt="" src="https://media.sketchfab.com/avatars/3664d40b58e043a680d79877fa28af0c/33815c2eed5e4707bc588f3fa2ead32f.jpeg"></img>
                                                                    </div>
                                                                </a>
                                                                <div style={{ boxSizing: "border-box" }}>
                                                                    <div className={classes.displayName}>
                                                                        <div className={classes.userName}>
                                                                            <a href="/" className={classes.linkUserName}>
                                                                                Nghiep bui
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Button className={classes.buttonFollow}>Theo dõi</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={classes.stats}>
                                                                <div className={classes.viewsHelp}>
            
                                                                        <VisibilityIcon className={classes.viewsIcon}/>
                                                                        <span style={{fontWeight :700}}>201</span>
                                                                        <div className={classes.toolTipIcon}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.sidebar}>
                                        <div className={classes.storeInfo}>
                                            <div className={classes.storeInfoHeader}>
                                                <div className={classes.storeInfoHeaderPrice}>
                                                    $25
                                                </div>
                                                <ul className={classes.storeInfoHeaderList}>
                                                    <li className={classes.storeInfoHeaderListLi}>
                                                        <LockIcon /> Đảm bảo thanh toán
                                                    </li>
                                                    <li className={classes.storeInfoHeaderListLi}>
                                                        <EmailIcon /> Hỗ trợ từ người bán hàng
                                                    </li>
                                                    <li className={classes.storeInfoHeaderListLi}>
                                                        <HistoryIcon /> Truy cập vào các phiên bản trong tương lai
                                                    </li>
                                                </ul>
                                                <Button className={classes.buttonAddCart}>
                                                    Thêm vào giỏ hàng
                                                </Button>
                                            </div>
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
