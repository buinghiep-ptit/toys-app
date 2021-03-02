import Avatar from "@material-ui/core/Avatar";
import PropTypes from 'prop-types';
// @mui core
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from "@material-ui/icons/Favorite";
// @mui icon
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import VisibilityIcon from '@material-ui/icons/Visibility';
// @mui lab
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from "classnames";
import React from "react";
import styles from 'assets/jss/material-kit-react/components/customCardStyle';
// 
import CustomDialog from './dialog/CustomDialog.js';
import { LazyImage } from "./CustomLazyLoadImage";
import GameItem from "components/body/GameItem.js";

const useStyles = makeStyles(styles);

CustomDialog.propTypes = {
    model: PropTypes.object.isRequired,
}
CustomDialog.defaultProps = {}

function CustomCard({ model }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);
    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                avatar={
                    loading ? <Skeleton animation="wave" variant="circle" width={25} height={25} />
                        : <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            src={model.backgroundImage} />
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
                        : model.released
                }
            />

            {loading ? <Skeleton animation="wave" variant="rect" className={classes.media} /> : (<div className={classes.mediaWrapper}>
                <CardActionArea onClick={handleClickOpen}>
                    <CardMedia
                    // className={classes.media}
                    // image={model.backgroundUrl}
                    // title="Paella dish"
                    >
                        {/* <LazyImage
                            className="media"
                            aspectRatio={16 / 9}
                            lqip="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAADCgAwAEAAAAAQAAABcAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/CABEIABcAMAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAADAgQBBQAGBwgJCgv/xADDEAABAwMCBAMEBgQHBgQIBnMBAgADEQQSIQUxEyIQBkFRMhRhcSMHgSCRQhWhUjOxJGIwFsFy0UOSNIII4VNAJWMXNfCTc6JQRLKD8SZUNmSUdMJg0oSjGHDiJ0U3ZbNVdaSVw4Xy00Z2gONHVma0CQoZGigpKjg5OkhJSldYWVpnaGlqd3h5eoaHiImKkJaXmJmaoKWmp6ipqrC1tre4ubrAxMXGx8jJytDU1dbX2Nna4OTl5ufo6erz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAECAAMEBQYHCAkKC//EAMMRAAICAQMDAwIDBQIFAgQEhwEAAhEDEBIhBCAxQRMFMCIyURRABjMjYUIVcVI0gVAkkaFDsRYHYjVT8NElYMFE4XLxF4JjNnAmRVSSJ6LSCAkKGBkaKCkqNzg5OkZHSElKVVZXWFlaZGVmZ2hpanN0dXZ3eHl6gIOEhYaHiImKkJOUlZaXmJmaoKOkpaanqKmqsLKztLW2t7i5usDCw8TFxsfIycrQ09TV1tfY2drg4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAEBAQEBAQEBAQEBgYFBgYIBwcHBwgMCQkJCQkMEwwODAwODBMRFBAPEBQRHhcVFRceIh0bHSIqJSUqNDI0RERc/9sAQwEEBAQEBAQEBAQEBgYFBgYIBwcHBwgMCQkJCQkMEwwODAwODBMRFBAPEBQRHhcVFRceIh0bHSIqJSUqNDI0RERc/9oADAMBAAIRAxEAAAG/vd0lcZm52NhQ+hc0o5y75OwF0SK2TPaOaev/2gAIAQEAAQUCjt2i1d+uOxissb0LtXLbuKjjIfiLoh2LIxSEOWjROUtF01z5uKblBd05Lh//2gAIAQMRAT8BeK0PnX//2gAIAQIRAT8Ba+267f/aAAgBAQAGPwJ8GFKSaq0T82ZUjgKPh9wS8QrCJI8hrko/bSjgWmvLEKopE+WaFaH5kd6HtFroleRFOLkAAGUilafHv//EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/ITYyk1uAbgR3je7KiBxjJdd4n11SKEnK8XDdjOgGVaDiQA1MAYCQ435e3TXquaCc/wDGXIRESwMfGs0QnDD5zL7bJZ5v/9oADAMBAAIRAxEAABBycSfyT//EADMRAQEBAAMAAQIFBQEBAAEBCQEAESExEEFRYSBx8JGBobHRweHxMEBQYHCAkKCwwNDg/9oACAEDEQE/EI5NXfj8/BiPo2/Hn//aAAgBAhEBPxC1jDNeef19vDkH3//aAAgBAQABPxC0jGPxUdVZcRpMGGx4Fr5+ayGKjUyIcPmjOPxQqx+Ni8KVdq8TFPUlpKHNi8PhBiBKqtcgsXhY/GqTTgcw/U2INfw1Iy4SViT0CXqwFWrCTIA0lfbYzr+72jf/2Q=="
                            src={model.backgroundUrl}
                            alt="a woman covering face with frosted glass"
                        /> */}
                        <GameItem game={model} />
                    </CardMedia>
                </CardActionArea>
                <IconButton aria-label="money" className={classNames(classes.layer)}>
                    <AddShoppingCartIcon style={{ fontSize: "1.2rem", color: "#df1660" }} />
                </IconButton>
                {

                    open && <CustomDialog
                        isOpen={open}
                        model={model}
                        handleClose={handleClose} />
                }
            </div>)
            }
            <CardActions className={classes.footer}>
                {loading ? <Skeleton animation="wave" height={15} width="100%" style={{ marginBottom: 6 }} /> : <><IconButton
                    className={classes.expand}
                    aria-label="share">
                    <ShareIcon style={{ fontSize: "1rem" }} />
                </IconButton>
                    <IconButton
                        className={classes.icons}
                        aria-label="view">
                        <VisibilityIcon style={{ fontSize: "1rem" }} />
                        <div style={{ fontSize: "0.8rem", marginRight: "0.8rem", marginLeft: "3px" }}>
                            {model.views}
                        </div>
                    </IconButton>
                    <IconButton
                        className={classes.icons}
                        aria-label="comment">
                        <CommentIcon style={{ fontSize: "1rem" }} />
                        <div style={{ fontSize: "0.8rem", marginRight: "0.8rem", marginLeft: "3px" }}>
                            {model.comments}
                        </div>
                    </IconButton>
                    <IconButton
                        className={classes.icons}
                        aria-label="like">
                        <FavoriteIcon style={{ fontSize: "1rem" }} />
                        <div style={{ fontSize: "0.8rem", marginRight: "0.8rem", marginLeft: "3px" }}>
                            {model.likes}
                        </div>
                    </IconButton>
                </>}
            </CardActions>
        </Card>
    )
}
export default React.memo(CustomCard);