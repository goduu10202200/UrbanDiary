var styles_member = {
  //member
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  container_bottom: {
    width: '100%',
    height: '75%',
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


  //member_data
  dataDiv: {
    width: '80%',
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  dataDiv_txt: {
    width: '30%',
    padding: 3,
    fontSize: 22,
  },
  dataDiv_input: {
    width: '70%',
    padding: 3,
    fontSize: 22,
    backgroundColor: '#dbdbdb',
    borderRadius: 5,
    color: '#333',
  },

};

export default styles_member;