import React from "react";

// import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

import Panorama360 from '../common/Panorama360.js';
import styles from '../../assets/jss/material-kit-react/parallaxStyle.js';
const useStyles = makeStyles(styles);

export default function Parallax(props) {

    const classes = useStyles();
    // const parallaxClasses = classNames({
    //     [classes.parallax]: true
    // });
    return (
        <div className={classes.parallax}>
            <div className={classes.content}>
                <Panorama360 className={classes.viewport}></Panorama360>
            </div>
        </div>
    )
}