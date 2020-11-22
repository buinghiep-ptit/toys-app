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
    overflow: "auto",
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
    backgroundColor: "#EEE",
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
    minHeight: "24px",
    position: "relative",
    backgroundColor: "#1caad9",
    width: "80px",
    height: "24px!important",
    fontSize: "10px",
    fontWeight: 700
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
  like: {

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
    backgroundColor: "#df1660",
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