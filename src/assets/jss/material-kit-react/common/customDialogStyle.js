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
    display : "flex",
    flexDirection : "column",
    justifyContent : "center",
    position: "absolute", 
    top: 0,
    left: 0, 
    height: "100%", 
    width: "100%", 
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    transform: "translateZ(0)",
    transition: "opacity .25s"
  },
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
  controls : {
    display: "flex",
    position : "absolute",
    bottom : 0,
    right: 0,
    left: 0,
    // height: "28px",
    // backgroundColor: "brown"
  }
}
export default customDialogStyle