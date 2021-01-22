import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import styles from 'assets/jss/material-kit-react/components/customDialogStyle.js';
const useStyles = makeStyles(styles);

function CustomStoreSlider(props) {
    const classes = useStyles();
    return (
        <div className={classes.storeSuggestion}>
            <div className={classes.cardSlider}>
                <div className={classes.cardSliderHeader}>
                    <h4 className={classes.cardSliderHeaderText}>
                        Cửa hàng mô hình
                                </h4>
                </div>
                <div className={classes.cardSliderLeft}>
                    <svg width="9" height="54" viewBox="0 0 9 54" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.518 27.17v-.26l.034.13-.034.13zm6.977 25.78l-.966.26L.516 27.04 7.53.87l.965.26-6.943 25.91 6.943 25.91zm0 0l-.966.26L.516 27.04 7.53.87l.965.26-6.943 25.91 6.943 25.91zM1.518 27.17v-.26l.034.13-.034.13zm-.01-.3l.044.17-.045.17-.966-.26.012-.04.483.13-.483.13-.01-.04.965-.26zm-.956.3l-.01-.04.965-.26.045.17-.045.17-.966-.26.012-.04.483.13-.483.13z" fillRule="nonzero" fill="#df1660">
                        </path>
                    </svg>
                </div>
                <div className={classes.gridsCard}>
                    <div className={classes.items}>
                        <div className={classes.gridItem}>
                            <div className={classes.cardModel}>
                                <div className={classes.cardThumb}>
                                    <a href=" " className={classes.cardThumbHref}>
                                        <div className={classes.imageContainer}>
                                            <div style={{ paddingTop: "56.25%" }}></div>
                                            <img alt="" className={classes.imgShow} src="https://media.sketchfab.com/models/9c5a51a6e4a44b2a8142baeae763ebcf/thumbnails/552bb7365f524b4a99c3e76350872e07/a997086b1898404d962187da5f062dde.jpeg"></img>
                                        </div>
                                    </a>
                                </div>
                                <div className={classes.cardFooter}>
                                    <span style={{ color: "#EEE" }}>Javan IV</span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.gridItem}>
                            <div className={classes.cardModel}>
                                <div className={classes.cardThumb}>
                                    <a href=" " className={classes.cardThumbHref}>
                                        <div className={classes.imageContainer}>
                                            <div style={{ paddingTop: "56.25%" }}></div>
                                            <img alt="" className={classes.imgShow} src="https://media.sketchfab.com/models/9c5a51a6e4a44b2a8142baeae763ebcf/thumbnails/552bb7365f524b4a99c3e76350872e07/a997086b1898404d962187da5f062dde.jpeg"></img>
                                        </div>
                                    </a>
                                </div>
                                <div className={classes.cardFooter}></div>
                            </div>
                        </div>
                        <div className={classes.gridItem}>
                            <div className={classes.cardModel}>
                                <div className={classes.cardThumb}>
                                    <a href=" " className={classes.cardThumbHref}>
                                        <div className={classes.imageContainer}>
                                            <div style={{ paddingTop: "56.25%" }}></div>
                                            <img alt="" className={classes.imgShow} src="https://media.sketchfab.com/models/9c5a51a6e4a44b2a8142baeae763ebcf/thumbnails/552bb7365f524b4a99c3e76350872e07/a997086b1898404d962187da5f062dde.jpeg"></img>
                                        </div>
                                    </a>
                                </div>
                                <div className={classes.cardFooter}></div>
                            </div>
                        </div>
                        <div className={classes.gridItem}>
                            <div className={classes.cardModel}>
                                <div className={classes.cardThumb}>
                                    <a href=" " className={classes.cardThumbHref}>
                                        <div className={classes.imageContainer}>
                                            <div style={{ paddingTop: "56.25%" }}></div>
                                            <img alt="" className={classes.imgShow} src="https://media.sketchfab.com/models/9c5a51a6e4a44b2a8142baeae763ebcf/thumbnails/552bb7365f524b4a99c3e76350872e07/a997086b1898404d962187da5f062dde.jpeg"></img>
                                        </div>
                                    </a>
                                </div>
                                <div className={classes.cardFooter}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.cardSliderRight}>
                    <svg width="9" height="53" viewBox="0 0 9 53" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.977 26.04L1 0l6.977 26.04L1 52.08l6.977-26.04zm0 0l.01.04-.01-.04.01-.04-.01.04z" stroke="#df1660" fill="none" fillRule="evenodd" strokeLinecap="square">

                        </path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default CustomStoreSlider;