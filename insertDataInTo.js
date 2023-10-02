var axios = require('axios')
exports.insertDataInTo = (DataInsert, TableName) => {
   var config = {
    method: 'POST',
 url: 'http://127.0.0.1:8080/service//add',
    headers: {
      'name-space': TableName,
      'Content-Type': 'application/json'
    },
    data: DataInsert
  }
   return new Promise(function (DataInsertResolve,DataInsertReject) {
    axios(config)
      .then(function (AxiosResponse) {
         DataInsertResolve(AxiosResponse)
      }).catch(function (AxiosError) {
         DataInsertReject(AxiosError)
      })
  });

}