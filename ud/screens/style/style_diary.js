var styles_diary = {
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  header: {
    width: '100%',
    height: 40,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  header_txt: {
    fontSize: 16,
    lineHeight: 40,
    textAlign: 'center',
  },
  titleCheck: {
    width: 100,
    height: 100,
  },
  diary: {
    width: '100%',
    height: '94%',
    backgroundColor: '#ddd',
  },
  diary_imgDiv: {
    width: '100%',
    height: '40%',

  },
  diary_img: {
    width: '100%',
    height: '100%',

  },
  diary_input: {
    fontSize: 18,
    width: '100%',
    height: "45%",
    backgroundColor: '#fff',
    padding: 10,
    lineHeight: 30,
    overFlow: 'scroll',
  },
  diary_btn: {
    width: 80,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#1072b5',
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  diary_btn_txt: {
    letterSpacing: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  tag_div: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(232, 232, 232, 0.8)",
  },
  tag_box: {
    width: "45%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#19446a",
    paddingLeft: "10%",
    paddingTop: "5%",
    zIndex: 100,
  },
  tag: {
    width: "80%",
    // height: 40,
    padding: 1,
    marginTop: 10,
    backgroundColor: "rgba(122, 190, 249, .3)",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  tag_txt: {
    lineHeight: 40,
    fontSize: 22,
    color: "#fff",
  },
  tag_img: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
    // heig
    marginTop: 10,
  },

  dialog: {
    width: "85%",
    height: "35%",
    backgroundColor: '#f7f7f7',
    position: 'absolute',
    top: "23%",
  },
  dialog_input: {
    width: '90%',
    backgroundColor: "#fff",
    fontSize: 16,
    lineHeight: 22,
    alignSelf: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: 25,
    borderRadius: 3,
    borderWidth: 0.8,
    borderColor: "#ddd",
  },
  dialog_btn: {
    backgroundColor: "#5b9bd5",
    width: "100%",
    height: 50,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },

};

export default styles_diary;