import React, { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import CloseIcon from '@material-ui/icons/Close';

// core components
import Button from "components/common/CustomButton.js";
import Card from "components/common/card/Card.js";
import CardBody from "components/common/card/CardBody.js";
import CardHeader from "components/common/card/CardHeader.js";
import CardFooter from "components/common/card/CardFooter.js";
import CustomInput from "components/common/CustomInput.js";

import styles from "assets/jss/material-kit-react/pages/loginStyle.js";

import { Dialog } from "@material-ui/core";
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { history, openLogin, handleClose } = props;

  return (
    <>
      <Dialog
        open={openLogin}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div className={classes.container}>
          <Card className={classNames(classes[cardAnimaton], classes.card)}>
            <IconButton
              onClick={handleClose}
              style={{ float: "right", top: 0, right: 0, position: "absolute", color: "#AAAAAA" }}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Đăng nhập</h4>
                <div className={classes.socialLine}>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={e => e.preventDefault()}
                  >
                    <i className={"fab fa-twitter"} />
                  </Button>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={e => e.preventDefault()}
                  >
                    <i className={"fab fa-facebook"} />
                  </Button>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={e => e.preventDefault()}
                  >
                    <i className={"fab fa-google-plus-g"} />
                  </Button>
                </div>
              </CardHeader>
              <p className={classes.divider}>Hoặc</p>
              <CardBody>
                <CustomInput
                  labelText="Tên đăng nhập..."
                  id="first"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="E-mail..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "email",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Mật khẩu"
                  id="pass"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          lock_outline
                            </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: "off"
                  }}
                />
                <Typography variant="subtitle2" component="h2">
                  <span style={{ color: "#BBBBBB", opacity: 0.5 }}>Quên mật khẩu?</span>
                </Typography>
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button
                  className={classes.button}
                  onClick={() => history.push('/')}>
                  Đăng nhập
                    </Button>
                <Typography variant="subtitle2" component="h2">
                  <span style={{ color: "#CCCCCC" }}>Chưa có tài khoản?</span>
                  <Link to={"/"}> Đăng kí miễn phí</Link>
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </div>
      </Dialog>
    </>
  );
}
