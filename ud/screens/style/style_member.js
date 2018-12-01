var styles_member = {
  //member
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  container_bottom: {
    flex: 1,
    backgroundColor: "#cfe2ee",
  },
  userDiv: {
    width: '100%',
    height: '25%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  userLogo: {
    flex: .8,
    resizeMode: 'contain',
  },

  futureDiv: {
    width: '90%',
    maxHeight: 60,
    alignSelf: 'center',
  },
  listDiv: {
    width: '90%',
    alignSelf: 'center',
  },

  //member_list
  listView: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 15

  },
  itemDiv: {
    // flexDirection: "row", 
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 10,
  },
  itemDiv_checked: {
    // flexDirection: "row", 
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: "#bababa",
    marginTop: 10,
    padding: 10,
    // opacity: 0.7,
  },
  itemDiv_top: {
    width: "100%",
    flexDirection: "row",
  },
  itemDiv_bottom: {
    width: "80%",
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
    paddingLeft: 10,
  },
  itemDiv_location: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  //sandy Q
  dialog: {
    width: "85%",
    height: "25%",
    backgroundColor: 'rgb(255, 255, 255)',
    //opacity: 0.3,
    position: 'absolute',
    top: "8%",
  },
  dialog_div: {
    marginTop: "2.5%",
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
  },
  dialog_txt: {
    fontSize: 20,
    marginRight: 10,
    alignSelf: "center",
    //fontWeight: 'bold',
  },

  //member_data
  dataDiv: {
    width: '80%',
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  dataDiv_txt: {
    width: '25%',
    padding: 3,
    fontSize: 18,
  },
  dataDiv_input: {
    width: '75%',
    padding: 3,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 3,
  },

};

export default styles_member;