import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
// @mui core
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
// @mui icon
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from '@material-ui/icons/Visibility';
import CommentIcon from '@material-ui/icons/Comment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// @mui lab
import Skeleton from '@material-ui/lab/Skeleton';
// 
import CustomDialog from './CustomDialog.js';

import styles from '../../assets/jss/material-kit-react/common/customCardStyle';
const useStyles = makeStyles(styles);
export default function CustomCard(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        // console.log(open);
    })
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const [loading, setLoading] = React.useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 2500);
    const {model} = props;
    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                avatar={
                    loading ? <Skeleton animation="wave" variant="circle" width={25} height={25} />
                        : <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            src={model.avatar} />
                }
                action={
                    loading ? null
                        : (<IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>)
                }
                title={
                    loading ? <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                        : model.name
                }
                subheader={
                    loading ? <Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />
                        : model.dateCreation
                }
            />
            {/* <CardActionArea> */}
            {/* <CardMedia
                    className={classes.media}
                    image={skin}
                    title="Paella dish"
                >
                </CardMedia> */}
            {/* <IconButton aria-label="money">
                    <AttachMoneyIcon />
                </IconButton> */}

            {loading ? <Skeleton animation="wave" variant="rect" className={classes.media} /> : (<div className={classes.mediaWrapper}>
                <CardActionArea onClick={handleClickOpen}>
                    <CardMedia
                        className={classes.media}
                        image={model.urlBackground}
                        title="Paella dish"
                    />
                </CardActionArea>
                {/* <div className={classes.layer}> */}
                <IconButton aria-label="money" className={classNames(classes.layer)}>
                    <AttachMoneyIcon style={{ fontSize: "1rem", color: "white" }} />
                </IconButton>
                {/* </div> */}
                {

                    open && <CustomDialog
                        descriptionElementRef={descriptionElementRef}
                        isOpen={open}
                        model={model}
                        handleClose={handleClose} />
                }
            </div>)
            }
            {/* </CardActionArea> */}
            <CardActions className={classes.footer}>
                { loading ? <Skeleton animation="wave" height={15} width="100%" style={{ marginBottom: 6 }} /> : <><IconButton
                    className={classes.expand}
                    aria-label="share">
                    <ShareIcon style={{ fontSize: "1rem" }} />
                </IconButton>
                    <IconButton
                        className={classes.icons}
                        aria-label="view">
                        <VisibilityIcon style={{ fontSize: "1rem" }} />
                        <div style={{ fontSize: "0.8rem", marginRight: "0.8rem" }}>
                            {model.views}
                        </div>
                    </IconButton>
                    <IconButton
                        className={classes.icons}
                        aria-label="comment">
                        <CommentIcon style={{ fontSize: "1rem" }} />
                        <div style={{ fontSize: "0.8rem", marginRight: "0.8rem" }}>
                            {model.comments}
                        </div>
                    </IconButton>
                    <IconButton
                        className={classes.icons}
                        aria-label="like">
                        <FavoriteIcon style={{ fontSize: "1rem" }} />
                        <div style={{ fontSize: "0.8rem", marginRight: "0.8rem" }}>
                            {model.likes}
                        </div>
                    </IconButton>
                </>}
            </CardActions>
        </Card>
    )
}
