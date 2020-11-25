const customDialogStyle = {
  popup: {
    fontFamily: "Open Sans,sans-serif",
    boxSizing: "border-box",
    display: "block",
    "@media (max-width: 768px)":
    {
      width: "100vw!important"
    }
  },
  popupContainer: {
    fontFamily: "Open Sans,sans-serif",
    boxSizing: "border-box",
    marginTop: "0",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    opacity: 1,
    background: "rgba(0,0,0,.5)",
    // overflow: "auto",
    overflowY: "auto",
    overflowX: "hidden",
    transform: "translateZ(0)",
    transition: "opacity .2s"
  },
  popupContent: {
    fontFamily: "Open Sans,sans-serif",
    boxSizing: "border-box",
    marginTop: "0",
    position: "absolute",
    left: "50px",
    top: "40px",
    "@media (max-width: 768px)":
    {
      left: "10px"
    }
  },
  popupModel: {
    fontFamily: "Open Sans,sans-serif",
    boxSizing: "border-box",
    display: "block",
    backgroundColor: "#fff",
    borderRadius: "3px",
    boxShadow: "0 11px 20px 0 rgba(97,108,121,.17)",
    marginTop: "0",
    marginBottom: "40px",
    maxWidth: "2000px",
    width: "calc(100vw - 100px)",
    "@media (max-width: 768px)":
    {
      width: "calc(100vw - 20px)"
    }
  },
  modelContainer: {
    fontFamily: "Open Sans,sans-serif",
    boxSizing: "border-box",
    display: "flex",
    padding: "15px",
    maxWidth: "100%",
    position: "relative",
    backgroundColor: "#fff",
    width: "100%",
    marginTop: "0",
    "@media (max-width: 960px)":
    {
      flexDirection: "column"
    },
    "@media (max-width: 768px)":
    {
      padding: "12px!important"
    }
  },
  modelMain: {
    fontFamily: "Open Sans,sans-serif",
    boxSizing: "border-box",
    flex: 1,
    maxWidth: "calc(100% - 395px)",
    marginTop: "0",
    WebkitFontSmoothing: "antialiased",
    "@media (max-width: 960px)":
    {
      maxWidth: "none"
    }
  },
  viewer: {
    fontFamily: "Open Sans,sans-serif",
    WebkitFontSmoothing: "antialiased",
    boxSizing: "border-box",
    width: "100%",
    position: "relative",
    paddingTop: "56.25%",
    marginTop: "0"
  },
  iframeView: {
    fontFamily: "Open Sans,sans-serif",
    WebkitFontSmoothing: "antialiased",
    boxSizing: "border-box",
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
    border: "none",
    marginTop: "0",
    backgroundColor: "#e7e7e7"
  },
  cViewer: {
    backgroundColor: "brown",
    fontFamily: "Open Sans,sans-serif",
    boxSizing: "border-box",
    display: "block"
  },
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    transform: "translateZ(0)",
    transition: "opacity .25s"
  },
  // bottom model
  bottomModel: {
    boxSizing: "border-box",
    marginBottom: "0"
  },
  bottomModelWrapper: {
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0",
    display: "flex",
    transition: "transform .4s cubic-bezier(.165,.84,.44,1) .2s"
  },
  wrapperChild: {
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0",
    maxWidth: "100%",
    flex: 1
  },
  viewerAdditional: {
    boxSizing: "border-box",
    marginTop: "0",
    paddingTop: "20px"
  },
  modelName: {
    margin: "0 0 20px",
    fontSize: "22px",
    fontWeight: 600
  },
  ownerWrapper: {
    display: "flex",
    marginTop: "10px",
    paddingBottom: "10px",
    justifyContent: "space-between",
    alignItems: "center"
  },
  ownerCreator: {
    display: "flex",
    minWidth: "0",
    alignItems: "center"
  },
  ownerAvatar: {
    background: "transparent",
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    minWidth: "48px",
    marginRight: "10px",
    overflow: "hidden",
    borderRadius: "3px"
  },
  displayName: {
    display: "flex",
    minWidth: "0",
    marginBottom: "2px",
    alignItems: "center"
  },
  userName: {
    marginBottom: "0",
    display: "inline-flex",
    maxWidth: "100%",
    alignItems: "center",
    verticalAlign: "top",
    color: "inherit",
    cursor: "pointer",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    minWidth: "0",
    overflow: "hidden",
    fontSize: "14px",
    fontWeight: 700,
    textOverflow: "ellipsis"
  },
  bottomOwner: {
    boxSizing: "border-box",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid #e7e7e7",
    borderTop: "1px solid #e7e7e7",
    padding: "12px 0"
  },
  linkUserName: {
    background: "transparent",
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    marginBottom: "0",
    minWidth: "0",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    flex: 1
  },
  buttonFollow: {
    boxSizing: "border-box",
    fontFamily: "inherit",
    margin: "0",
    marginTop: "0",
    marginBottom: "0",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 700,
    textAlign: "center",
    // textShadow: "none",
    // textTransform: "uppercase",
    // cursor: "pointer",
    // outline: "none",
    // lineHeight: "normal",
    flexShrink: 0,
    minHeight: "24px",
    fontSize: "10px",
    padding: "0 8px",
    position: "relative",
    // color: "#fff",
    // backgroundColor: "#1caad9",
    // transition: "background-color .15s ease",
    // border: "0",
    // borderStyle: "solid",
    // borderRadius: "4px",
    width: "80px"
  },
  spanText: {
    textAlign: "center",
    textShadow: "none",
    textTransform: "uppercase",
    cursor: "pointer",
    fontSize: "10px",
    color: "#fff",
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    lineHeight: 1.25
  },
  stats: {
    color: "#999",
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    marginLeft: "20px",
    fontSize: "14px",
    alignItems: "center"
  },
  viewsHelp: {
    color: "#999",
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    marginLeft: "20px",
    fontSize: "14px",
    alignItems: "center"
  },
  viewsIcon: {
    display: "inline-block",
    fontStyle: "normal",
    fontWeight: 400,
    fontFeatureSettings: "normal",
    fontVariant: "normal",
    WebkitFontSmoothing: "antialiased",
    lineHeight: 1,
    textTransform: "none",
    speak: "none",
    marginRight: "5px",
    fontSize: "20px",
    color: "#ccc"
  },
  toolTipIcon: {
    WebkitFontSmoothing: "antialiased",
    boxSizing: "border-box",
    marginBottom: "0",
    width: "130px",
    padding: "6px",
    fontFamily: "Open Sans,sans-serif",
    fontSize: "12px",
    lineHeight: "17px",
    color: "#fff",
    textAlign: "center",
    textTransform: "none",
    background: "rgba(0,0,0,.8)",
    borderRadius: "6px",
    opacity: 0,
    transition: "opacity .2s",
    whiteSpace: "normal",
    position: "absolute",
    zIndex: 4,
    display: "block",
    pointerEvents: "none",
    top: "100%",
    left: "50%",
    marginTop: "5px",
    transform: "translateX(-50%)"
  },
  likesContainer: {
    fontSize: "12px",
    color: "#555",
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "0"
  },
  likesAvatar: {
    fontSize: "12px",
    color: "#555",
    boxSizing: "border-box",
    marginRight: "6px",
    marginTop: "0"
  },
  avatarInline: {
    fontSize: "12px",
    color: "#555",
    boxSizing: "border-box",
    display: "inline-flex",
    marginTop: "0",
    marginBottom: "0"
  },
  a: {
    background: "transparent",
    color: "inherit",
    textDecoration: "none",
    width: "18px",
    height: "18px",
    cursor: "pointer",
    marginTop: "0"
  },
  aImgContainer: {
    fontSize: "12px",
    color: "inherit",
    cursor: "pointer",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    marginTop: "0",
    marginBottom: "0",
    borderRadius: "12%"
  },
  topImg: {
    fontSize: "12px",
    color: "inherit",
    cursor: "pointer",
    boxSizing: "border-box",
    marginTop: "0",
    paddingTop: "100%"
  },
  aImg: {
    border: "0",
    position: "absolute",
    top: "0",
    left: "0",
    opacity: 1,
    transition: "opacity .25s ease",
    marginBottom: "0",
    height: "100%",
    width: "100%",
    objectFit: "cover"
  },
  likesName: {
    fontSize: "12px",
    color: "#555",
    boxSizing: "border-box",
    marginBottom: "0"
  },
  userDspName: {
    fontSize: "12px",
    color: "#555",
    boxSizing: "border-box",
    marginTop: "0",
    display: "inline-flex",
    maxWidth: "100%",
    alignItems: "center"
  },
  userDspNameLink: {
    fontSize: "12px",
    boxSizing: "border-box",
    background: "transparent",
    textDecoration: "none",
    cursor: "pointer",
    marginTop: "0",
    marginBottom: "0",
    minWidth: "0",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    flex: 1,
    color: "#1caad9"
  },
  userDspText: {
    fontSize: "12px",
    cursor: "pointer",
    color: "#1caad9",
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0",
    display: "flex",
    minWidth: "0"
  },
  spansText: {
    cursor: "pointer",
    color: "#1caad9",
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: "0",
    maxWidth: "100%",
    fontSize: "inherit"
  },
  // store suggestion
  storeSuggestion: {
    boxSizing: "border-box",
    padding: "20px 0 0"
  },
  cardSlider: {
    boxSizing: "border-box",
    position: "relative",
    paddingTop: "20px",
    paddingBottom: "20px",
    opacity: 1,
    userSelect: "none",
    transition: "opacity .25s ease",
    marginTop: "0",
    marginBottom: "0"
  },
  cardSliderHeader: {
    userSelect: "none",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "0"
  },
  cardSliderHeaderText: {
    userSelect: "none",
    boxSizing: "border-box",
    margin: "0",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    marginTop: "0",
    marginBottom: "0",
    color: "rgb(223, 22, 96)"
  },
  cardSliderLeft: {
    userSelect: "none",
    position: "absolute",
    top: "50%",
    width: "55px",
    height: "75px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    cursor: "pointer",
    left: "15px",//0
    transform: "translate(-70%,-50%)",
    // visibility: "hidden"
  },
  svgEle: {
    userSelect: "none",
    cursor: "pointer",
    // visibility: "hidden",
    width: "9",
    height: "54",
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0",
    overflow: "hidden"
  },
  svgPath: {
    userSelect: "none",
    cursor: "pointer",
    // visibility: "hidden",
    d:
      'path("M 1.518 27.17 v -0.26 l 0.034 0.13 l -0.034 0.13 Z m 6.977 25.78 l -0.966 0.26 L 0.516 27.04 L 7.53 0.87 l 0.965 0.26 l -6.943 25.91 l 6.943 25.91 Z m 0 0 l -0.966 0.26 L 0.516 27.04 L 7.53 0.87 l 0.965 0.26 l -6.943 25.91 l 6.943 25.91 Z M 1.518 27.17 v -0.26 l 0.034 0.13 l -0.034 0.13 Z m -0.01 -0.3 l 0.044 0.17 l -0.045 0.17 l -0.966 -0.26 l 0.012 -0.04 l 0.483 0.13 l -0.483 0.13 l -0.01 -0.04 l 0.965 -0.26 Z m -0.956 0.3 l -0.01 -0.04 l 0.965 -0.26 l 0.045 0.17 l -0.045 0.17 l -0.966 -0.26 l 0.012 -0.04 l 0.483 0.13 l -0.483 0.13 Z")',
    fillRule: "nonzero",
    fill: "rgb(223, 22, 96)",
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0"
  },
  gridsCard: {
    userSelect: "none",
    boxSizing: "border-box",
    overflow: "hidden",
    position: "relative",
    transition: "opacity .2s ease-in-out"
  },
  items: {
    userSelect: "none",
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0",
    transition: "opacity .15s ease-in-out",
    perspective: "1000px",
    flexDirection: "row",
    flexWrap: "nowrap !important",
    padding: "20px 20px",//20 0
    display: "flex",
    width: "calc(100% + 22px)",
    transform: "translateX(0px)"
  },
  gridItem: {
    userSelect: "none",
    boxSizing: "border-box",
    opacity: 1,
    transition: "opacity .4s,transform .4s",
    borderBottom: "0",
    // width: "calc(33.33333% - 23px)",
    margin: "0 24px 22px",
    flex: "none",
    marginLeft: "0",
    "@media (max-width: 1920px) and (min-width: 1100px)":
    {
      width: "calc(25% - 23px)"
    },
    "@media (max-width: 1100px) and (min-width: 800px)":
    {
      width: "calc(33.3333% - 23px)"
    },
    "@media (max-width: 800px) and (min-width: 480px)":
    {
      width: "calc(50% - 23px)"
    },
    "@media (max-width: 480px)":
    {
      width: "calc(100% - 23px)"
    }
  },
  cardModel: {
    userSelect: "none",
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0",
    boxShadow: "0 1px 1px rgba(97,108,121,.1),0 7px 18px 0 rgba(97,108,121,.13)",
    transition: "box-shadow .2s ease",
    position: "relative",
    width: "100%",
    background: "#fff",
    borderRadius: "3px"
  },
  cardThumb: {
    userSelect: "none",
    boxSizing: "border-box",
    marginTop: "0",
    position: "relative",
    display: "block",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px"
  },
  cardThumbHref: {
    userSelect: "none",
    boxSizing: "border-box",
    background: "transparent",
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    marginTop: "0",
    display: "block"
  },
  imageContainer: {
    userSelect: "none",
    color: "inherit",
    cursor: "pointer",
    boxSizing: "border-box",
    backgroundImage: "radial-gradient(ellipse at center,#f5f5f5 0,#d8d8d8 99%)",
    position: "relative",
    overflow: "hidden",
    marginTop: "0",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px"
  },
  imgShow: {
    userSelect: "none",
    color: "inherit",
    cursor: "pointer",
    boxSizing: "border-box",
    border: "0",
    position: "absolute",
    top: "0",
    left: "0",
    opacity: 1,
    transition: "opacity .25s ease",
    marginBottom: "0",
    height: "100%",
    width: "100%",
    objectFit: "cover"
  },
  cardFooter: {
    userSelect: "none",
    boxSizing: "border-box",
    marginBottom: "0",
    display: "flex",
    height: "48px",
    padding: "12px",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.05)"
  },
  cardSliderRight: {
    userSelect: "none",
    position: "absolute",
    top: "50%",
    width: "55px",
    height: "75px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    cursor: "pointer",
    marginBottom: "0",
    right: "15px",//0
    transform: "translate(70%,-50%)",
    // visibility: "hidden"
  },
  // comment
  commentWrapper : {
    boxSizing: "border-box",
    marginBottom: "0"
  },
  modelFeedback : {
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0"
  },
  tabs :{
    boxSizing: "border-box",
    display: "block",
    marginTop: "0",
    marginBottom: "0",
    padding : "0 20px"
  },
  tabsHeader : {
    boxSizing: "border-box",
    // display: "flex",
    borderBottom: "1px solid #e7e7e7",
    marginTop: "0"
  },
  tabPage : {
    boxSizing: "border-box",
    position: "relative",
    padding: "0 20px",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "70px",
    color: "#555",
    cursor: "pointer",
    marginTop: "0",
    "&:after": {
      position: "absolute",
      bottom: "-1px",
      left: "0",
      width: "100%",
      height: "3px",
      content: '""',
      backgroundColor: "#1caad9",
      transition: "transform .2s ease",
      transform: "scaleX(1)"
    }
  },
  // sidebar
  sidebar: {
    boxSizing: "border-box",
    flexShrink: 0,
    marginLeft: "30px",
    width: "365px",
    marginBottom: 0,
    // backgroundColor: "grey",
    "@media (max-width: 960px)": {
      marginLeft: "0",
      padding: "20px",
      width: "100%",
      flexShrink: 0
    }
  },
  storeInfo: {
    boxSizing: "border-box",
    marginTop: "0",
    marginBottom: "0",
    border: "1px solid #e7e7e7",
    borderRadius: "3px",
    overflow: "hidden"
  },
  storeInfoHeader: {
    fontFamily: "Open Sans,sans-serif",
    WebkitFontSmoothing: "antialiased",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    padding: "20px",
    borderBottom: "1px solid #e7e7e7"
  },
  storeInfoHeaderPrice: {
    fontSize: "40px",
    color: "#df1660",
    fontWeight: 700,
    marginBottom: "5px",
    padding: "20px 0"
  },
  storeInfoHeaderList: {
    boxSizing: "border-box",
    padding: "0",
    margin: "0",
    listStyleType: "none",
    color: "#555",
    fontSize: "13px",
    marginBottom: "16px"
  },
  storeInfoHeaderListLi: {
    color: "#555",
    boxSizing: "border-box",
    marginTop: "0",
    display: "block",
    lineHeight: 1.5,
    // padding: "2px 0"
  },
  buttonAddCart: {
    width: "100%",
    fontWeight: 700,
    // backgroundColor: "#df1660",
    height: "55px",
    fontSize: "18px"
  },
  // 
  linearBar: {
    // position: "absolute", 
    height: "6px",
    // right: "100px", 
    // left: "100px", 
    borderRadius: "5px",
    overflow: "hidden",
    transform: "translateZ(0)",
    transition: "opacity .25s"
  },
  controls: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    // height: "28px",
    // backgroundColor: "brown"
  }
}
export default customDialogStyle