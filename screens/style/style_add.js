var styles_add = {
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerTxt: {
    fontSize: 16,
    letterSpacing: 2,
  },
  addDiv: {
    width: '100%',
    height: '40%',
    alignSelf: 'center',
    // backgroundColor: 'rgba(200, 200, 200, .3)',
  },
  addInput: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    // lineHeight: 40,
    padding: 15,
  },

  itemDiv: {
    width: '100%',
    height: '60%',
    justifyContent: 'flex-end',
    alignItems: "center"
  },
  listDiv: {
    width: "100%",
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  listIcon: {
    fontSize: 25,
    width: "10%",
    height: 40,
    padding: 5,
    paddingLeft: 10,
    color: '#474747',
    justifyContent: "center",
  },
  listDiv_data: {
    minWidth: "90%",
    height: 40,
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: "center",
  },
  listDiv_dataTxt: {
    width: "100%",
    fontSize: 16,
    // color: '#474747',
    justifyContent: "center",
  },
  // btnTime: {
  //   height: 40,
  //   padding: 5,
  //   justifyContent: "center",
  // },
  // btnTimeTxt: {
  //   fontSize: 20,
  // },

  addBtn: {
    width: '90%',
    height: 40,
    borderRadius: 6,
    backgroundColor: '#1072b5',
    marginTop: 10,
    alignSelf: 'center',
  },
  addBtnTxt: {
    letterSpacing: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#fff',
  },

  dialog_div: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(232, 232, 232, 0.8)",
  },
  dialog: {
    width: "85%",
    height: "40%",
    backgroundColor: '#f7f7f7',
    position: 'absolute',
    top: "15%",
    // overflow: "hidden",
  },
  dialog_content: {
    flex: 1,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  dialog_txt: {
    fontSize: 16,
    lineHeight: 30,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    color: "#666",
  },
  dialog_dropCon: {
    width: "70%",
    alignSelf: "center",
    marginBottom: 20,
  },
  dialog_dropOver: {
    width: "70%",
  },
  dialog_input: {
    width: '100%',
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
  dialog_data: {
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  dialog_dataTxt: {
    fontSize: 20,
    lineHeight: 80,
    justifyContent: "center",
    alignSelf: "center",
    color: "#111",
  },
  dialog_btnDiv: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    zIndex: -1,
  },
  dialog_btnNext: {
    backgroundColor: "#5b9bd5",
    width: 120,
    height: 50,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  dialog_btnPre: {
    backgroundColor: "#5b9bd5",
    width: 120,
    height: 50,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
  },

  //Add_location
  locationInput: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  //dialog_star
  dialog_star: {
    width: "85%",
    height: "45%",
    backgroundColor: 'rgb(255, 255, 255)',
    //opacity: 0.3,
    position: 'absolute',
    top: "15%",
  },
  dialog_star_div: {
    marginTop: "7%",
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    justifyContent: 'center',
  },
  dialog_startxt: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "#FFB700",
    alignSelf: "center",
  },
  dialog_star_btn: {
    backgroundColor: "#5b9bd5",
    width: "100%",
    height: 50,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 30,
    alignSelf: 'flex-end',
  },

  //待辦事項樣式
  itemDiv_top: {
    width: "100%",
    flexDirection: "row",
  },
  itemDiv_bottom: {
    width: "86%",
    flexDirection: "row",
    alignSelf: 'flex-end'
  },
  itemDiv_check: {
    width: "10%",
    padding: 0,
    alignSelf: 'center',
    // backgroundColor: 'rgba(211, 211, 211, .3)',
    // width: 30,
    // borderWidth: 0,
  },
  itemDiv_icon: {
    width: "10%",
    fontSize: 30,
    alignSelf: 'center',
  },
  itemDiv_discount: {
    width: 50,
    height: 50,
    // fontSize: 30,
    position: "absolute",
    bottom: 0,
    right: 0
  },
  itemDiv_item: {
    width: "70%",
    fontSize: 18,
    color: '#333',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  itemDiv_time: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'center',
    paddingLeft: 0,
  },
  itemDiv_location: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'center',
    paddingLeft: 10,
  }
};

export default styles_add;