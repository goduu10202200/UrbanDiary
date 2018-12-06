// const apiURL = "http://192.168.0.13/ud/api/ud/";
// const apiURL = "http://172.20.10.2/ud/api/ud/";
// const uploadURL = "http://172.20.10.2/ud/view/ud/assets/uploadfile/";
const apiURL = "http://172.20.10.2/ud/api/ud/";
const uploadURL = "http://172.20.10.2/ud/assets/uploadfile/images/";

export default {
  getURL() {
    return apiURL;
  },
  getUploadURL() {
    return uploadURL;
  }
};
