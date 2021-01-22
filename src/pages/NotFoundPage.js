import React from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/material-kit-react/pages/toysPageStyle.js';

const useStyles = makeStyles(styles);

function NotFoundPage(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classNames(classes.main, classes.mainRaised)}>
                Page Not Found
                Page Not Found
                Page Not Found
                Page Not Found
                Page Not Found
                Page Not Found
                Page Not Found
                Page Not Found
                Page Not Found
                Page Not Found
            </div>
        </div>
    );
}

export default NotFoundPage;
