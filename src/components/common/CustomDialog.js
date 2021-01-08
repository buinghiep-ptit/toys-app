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
                                                        {/*  */}
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
                                                        {/*  */}
                                                        <div className={classes.commentWrapper}>
                                                            <div className={classes.modelFeedback}>
                                                                <div className={classes.tabs}>
                                                                    <div className={classes.tabsHeader}>
                                                                        <Tabs
                                                                            value={value}
                                                                            onChange={handleChange}
                                                                            variant="fullWidth"
                                                                            indicatorColor="secondary"
                                                                            textColor="secondary"
                                                                            aria-label="icon tabs example"
                                                                        >
                                                                            <Tab icon={<StarIcon />} label="Đánh giá" />
                                                                            <Tab icon={<CommentIcon />} label="Bình luận" />
                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  */}
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
                                                <Button color="rose" className={classes.buttonAddCart}>
                                                    Thêm vào giỏ hàng
                                                </Button>
                                            </div>
                                        </div>
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
