var styles_diary = {
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    backgroundColor: "#fff"
  },
  header: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  header_txt: {
    fontSize: 16,
    lineHeight: 40,
    textAlign: "center",
    color: "#888"
  },
  titleCheck: {
    width: 100,
    height: 100
  },
  diary: {
    width: "100%",
    height: "90%",
    backgroundColor: "#fff"
  },
  diary_imgDiv: {
    width: "100%",
    height: "40%"
  },
  diary_img: {
    width: "100%",
    height: "100%"
  },
  diary_input: {
    fontSize: 18,
    width: "100%",
    height: "50%",
    backgroundColor: "#fff",
    padding: 10,
    lineHeight: 30
  },
  diary_btn: {
    width: 80,
    height: 40,
    borderRadius: 6,
    backgroundColor: "#1072b5",
    position: "absolute",
    bottom: 20,
    right: 10
  },
  diary_btn_txt: {
    letterSpacing: 3,
    alignSelf: "center",
    justifyContent: "center",
    color: "#fff"
  },
  actionButtonIcon: {
    fontSize: 30,
    marginTop: 5,
    color: "white"
  },

  tag_div: {
    width: 120,
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(232, 232, 232, 0)"
  },
  tag_box: {
    width: "40%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    // backgroundColor: "#23355b",
    // paddingLeft: "10%",
    paddingTop: "65%",
    zIndex: 100,
    flex: 1,
    marginLeft: -120,
  },
  tag: {
    width: "80%",
    // height: 40,
    padding: 1,
    marginTop: 10,
    backgroundColor: "rgba(122, 190, 249, .3)",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  tag_txt: {
    lineHeight: 40,
    fontSize: 22,
    color: "#fff"
  },
  tag_img: {
    width: 120,
    height: 50,
    resizeMode: "contain",
    // heig
    marginTop: 20
  },

  dialog: {
    width: "85%",
    height: "35%",
    backgroundColor: "#f7f7f7",
    position: "absolute",
    top: "6%"
  },
  dialog_input: {
    width: "90%",
    backgroundColor: "#fff",
    fontSize: 16,
    lineHeight: 22,
    alignSelf: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: 25,
    borderRadius: 3,
    borderWidth: 0.8,
    borderColor: "#ddd"
  },
  dialog_btn: {
    backgroundColor: "#5b9bd5",
    width: "100%",
    height: 50,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    alignSelf: "flex-end"
  },

  //標籤bottom slide
  tagSlide_header: {
    width: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSlide_title: {
    width: "100%",
    height: 100,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSlide_div: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSlide_row: {
    width: "100%",
    height: 100,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSlide_item: {
    width: "100%",
    height: 100,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default styles_diary;
