import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from "@material-ui/icons/Favorite";

import Button from '../CustomButton.js';

import styles from 'assets/jss/material-kit-react/components/customDialogStyle.js';
const useStyles = makeStyles(styles);

CustomInfoModel.propTypes = {

};

function CustomInfoModel(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.ownerWrapper}>
                <div className={classes.ownerCreator}>
                    <a href=" " className={classes.ownerAvatar}>
                        {/* img container */}
                        <div style={{ position: "relative", overflow: "hidden", borderRadius: "12%" }}>
                            <img alt="" src="https://media.sketchfab.com/avatars/3664d40b58e043a680d79877fa28af0c/33815c2eed5e4707bc588f3fa2ead32f.jpeg"></img>
                        </div>
                    </a>
                    <div style={{ boxSizing: "border-box" }}>
                        <div className={classes.displayName}>
                            <div className={classes.userName}>
                                <a href=" " className={classes.linkUserName}>
                                    Nghiep bui
                                        </a>
                            </div>
                        </div>
                        <div>
                            <Button color="twitter" className={classes.buttonFollow}>
                                <span className={classes.spanText}>
                                    Theo dõi
                                        </span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.stats}>
                    <div className={classes.viewsHelp}>

                        <VisibilityIcon className={classes.viewsIcon} />
                        <span style={{ fontWeight: 700 }}>201</span>
                        <div className={classes.toolTipIcon}></div>
                    </div>
                    <div className={classes.viewsHelp}>
                        <FavoriteIcon className={classes.viewsIcon} />
                        <span style={{ fontWeight: 700 }}>82</span>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className={classes.bottomOwner}>
                <div className={classes.likesContainer}>
                    <div className={classes.likesAvatar}>
                        <div className={classes.avatarInline}>
                            <a href=" " className={classes.a}>
                                <div className={classes.aImgContainer}>
                                    <div style={{
                                        paddingTop: "100%"
                                    }}></div>
                                    <img alt="" className={classes.aImg} src="https://media.sketchfab.com/avatars/2734df1e7b074f69b8898121b2531f1c/d4f66c8552934ac4828a30e389f43f31.jpeg">

                                    </img>
                                </div>
                            </a>
                            <a href=" " className={classes.a} style={{ marginLeft: "5px" }}>
                                <div className={classes.aImgContainer}>
                                    <div style={{
                                        paddingTop: "100%"
                                    }}></div>
                                    <img alt="" className={classes.aImg} src="https://media.sketchfab.com/avatars/ae1fcc6e87734813b7b159ec2c4e3581/22c28a63ae95425c90fdc5e4391afe45.jpeg">

                                    </img>
                                </div>
                            </a>
                            <a href=" " className={classes.a} style={{ marginLeft: "5px" }}>
                                <div className={classes.aImgContainer}>
                                    <div style={{
                                        paddingTop: "100%"
                                    }}></div>
                                    <img alt="" className={classes.aImg} src="https://media.sketchfab.com/avatars/248a183c5c3048c2ae02f0ee559f97bf/6b51d123c71d4dedaad6f3a50039f574.jpeg">

                                    </img>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={classes.likesName}>
                        <div className={classes.userDspName}>
                            <a href=" " className={classes.userDspNameLink}>
                                <div className={classes.userDspText}>
                                    <span className={classes.spansText}>Hoan Nguyen</span>
                                </div>
                            </a>
                            <span>,&nbsp;</span>
                        </div>
                        <div className={classes.userDspName}>
                            <a href=" " className={classes.userDspNameLink}>
                                <div className={classes.userDspText}>
                                    <span className={classes.spansText}>Hung Truong</span>
                                </div>
                            </a>
                            <span>,&nbsp;</span>
                        </div>
                        <div className={classes.userDspName}>
                            <a href=" " className={classes.userDspNameLink}>
                                <div className={classes.userDspText}>
                                    <span className={classes.spansText}>Be Van Te</span>
                                </div>
                            </a>
                        </div>
                            &nbsp;và&nbsp;
                            <a href=" " className={classes.spansText}>5 người khác&nbsp;</a>
                        <span>thích mô hình này</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomInfoModel;