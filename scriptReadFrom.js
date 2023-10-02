var selectDataFrom = require("./selectDataFrom.js")
var selectDataFromBigTable = require("./selectDataFromBigTable.js")
var createnamespace = require('./createnamespace.js')
//var JsonDataTables = require('./tables_p.json');
var JsonDataTables = require('./tables.json');

(async function scriptReadFrom() {
  let date = new Date();
  let starthour = date.getHours()
  let startminute = date.getMinutes()
  let startsecond = date.getSeconds()
  let TableCountMin = []
  let TableCountMax = []
  console.log("----------------------Start Time categorization table " + starthour + ":" + startminute + ":" + startsecond + "----------------------");
  JsonDataTables.forEach(JsonDataTable => {
    if (parseInt(JsonDataTable.TableCount) <= 1000) //30000)
      TableCountMin.push(JsonDataTable)
    else
      TableCountMax.push(JsonDataTable)
    createnamespace.createnamespace(JsonDataTable.TableName)
  })
  date = new Date();
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  console.log("----------------------Start Time TableCountMin " + hour + ":" + minute + ":" + second + "----------------------");
  Promise.all(TableCountMin.map(async (JsonDataTable) => {
      await selectDataFrom.selectDataFrom(JsonDataTable)
    })).then(async result => {
      date = new Date();
      hour = date.getHours()
      minute = date.getMinutes()
      second = date.getSeconds()
      console.log("----------------------Start Time TableCountMax " + hour + ":" + minute + ":" + second + "----------------------");
      let MaxQuery = 300;
      for (let index = 0; index < TableCountMax.length; index++) {

        let LimitQuery = parseInt(TableCountMax[index].TableCount) / MaxQuery | 0
        for (let OffsetQuery = 0; OffsetQuery < parseInt(TableCountMax[index].TableCount); OffsetQuery += LimitQuery) {

        await  selectDataFromBigTable.selectDataFromBigTable(TableCountMax[index], OffsetQuery, LimitQuery)
        }
      }
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      date = new Date();
      let endhour = date.getHours()
      let endminute = date.getMinutes()
      let endsecond = date.getSeconds()
      console.log("--------------------End Time : " + endhour + ":" + endminute + ":" + endsecond + "-----------------");
      console.log("--------------------Process Time :" + Math.abs(endhour - starthour) + ":" + Math.abs(endminute - startminute) + ":" + Math.abs(endsecond - startsecond) + "-----------------");

    });


})()