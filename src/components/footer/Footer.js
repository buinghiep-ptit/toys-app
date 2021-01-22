/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import Button from 'components/common/CustomButton.js';
import styles from "assets/jss/material-kit-react/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const classes = useStyles();
    const { whiteFont } = props;
    const footerClasses = classNames({
        [classes.footer]: true,
        [classes.footerWhiteFont]: whiteFont
    });
    const aClasses = classNames({
        [classes.a]: true,
        [classes.footerWhiteFont]: whiteFont
    });
    return (
        <footer className={footerClasses}>
            <div className={classes.container}>
                <div className={classes.socialContainer}>
                    <Button color="facebook">
                        <i className={classes.socials + " fab fa-facebook-square"} /> Facebook
                    </Button>
                    <Button color="google" style={{ marginLeft: "8px", marginRight: "8px" }}>
                        <i className={classes.socials + " fab fa-google-plus-g"} />
                        Google
                    </Button>
                    <Button color="twitter">
                        <i className={classes.socials + " fab fa-twitter"} /> Tweeter
                    </Button>
                </div>

                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="https://www.facebook.com/groups/2345253232356301"
                                className={classes.block}
                                target="_blank"
                            >
                                Web 3D
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="https://www.facebook.com/groups/2345253232356301"
                                className={classes.block}
                                target="_blank"
                            >
                                About me
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="https://www.facebook.com/groups/2345253232356301"
                                className={classes.block}
                                target="_blank"
                            >
                                Blog
                            </a>
                        </ListItem>
                    </List>
                </div>
                <div className={classes.right}>
                    &copy; {1900 + new Date().getYear()} , made with{" "}
                    <Favorite className={classes.icon} /> by{" "}
                    <a
                        href="https://www.facebook.com/vannghiephd.ptit/"
                        className={aClasses}
                        target="_blank"
                    >
                        Nghiep Bui
                    </a>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    whiteFont: PropTypes.bool
};
