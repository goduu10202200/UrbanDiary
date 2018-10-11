var styles_member = {
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  container_bottom:{
    width: '100%',
    height: '75%',
  },
  userDiv:{
    width: '100%',
    height: '25%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  userLogo: {
    flex: .8,
    resizeMode: 'contain',
  },

  futureDiv:{
    width: '90%',
    maxHeight: 60,
    alignSelf: 'center',
  },
  listDiv:{
    width: '90%',
    alignSelf: 'center',
  },

  checkbox:{
    width: '10%',
    alignSelf: 'center',
    marginLeft: 10,
  },
  
  itemDiv:{
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(211, 211, 211, .5)',
    flexDirection: 'row',
    borderRadius: 6,
    marginTop: 10,
    padding: 0,
  },
  itemDiv_check: {
    padding: 0,
    alignSelf: 'center',
    backgroundColor: 'rgba(211, 211, 211, .3)',
    width: 30,
    borderWidth: 0,
  },
  itemDiv_icon: {
    fontSize: 30,
    alignSelf: 'center',
  },
  itemDiv_time: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    alignSelf: 'center',
    padding: 5,
  },
  itemDiv_item: {
    fontSize: 16,
    color: '#333',
    alignSelf: 'center',
    padding: 5,
  },

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