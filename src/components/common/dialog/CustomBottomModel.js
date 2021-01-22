import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import styles from 'assets/jss/material-kit-react/components/customDialogStyle.js';

import CustomStoreSlider from './CustomStoreSlider.js';
import CustomComment from './CustomComment';
import CustomInfoModel from './CustomInfoModel.js';

const useStyles = makeStyles(styles);

CustomBottomModel.propTypes = {

};

function CustomBottomModel(props) {
    const classes = useStyles();
    return (
        <div className={classes.bottomModel}>
            <div className={classes.bottomModelWrapper}>
                <div className={classes.wrapperChild}>
                    <div className={classes.viewerAdditional}>
                        {/*  */}
                        <h1 className={classes.modelName}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span>Model</span>
                            </div>
                            <span style={{ display: "block", fontSize: "12px", fontWeight: 400, color: "#888", marginTop: "-3px" }}>3D Model</span>
                        </h1>
                        {/*  */}
                        <CustomInfoModel />
                        <CustomStoreSlider />
                        <CustomComment />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomBottomModel;