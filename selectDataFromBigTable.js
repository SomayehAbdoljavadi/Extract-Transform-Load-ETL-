var gnerateKey = require("./gnerateKey")
var insertDataInTo = require("./insertDataInTo")

const {
    table
} = require('console');
const {
    Pool
} = require('pg');
const {
    promises
} = require("fs");
const pool = new Pool({
    idleTimeoutMillis: 1,
    connectionTimeoutMillis: 200000000,

    host: '',
    Port: '',
    database: '',
    Schema: '',
    user: '',
    password: '',
    max: 20
})
exports.selectDataFromBigTable = async (JsonDataTable,OffsetQuery,LimitQuery) => {
  //   let MaxQuery = 300;
    // let LimitQuery = JsonDataTable.TableCount / MaxQuery | 0
      try {
        client = await pool.connect()
        //for (let i = 0; i < parseInt(JsonDataTable.TableCount); i += LimitQuery) {
            //client.query(`SELECT * FROM validation.${JsonDataTable.TableName} LIMIT ${LimitQuery} OFFSET ${i}`).the
            results = await client.query(`SELECT * FROM validation.${JsonDataTable.TableName} LIMIT ${LimitQuery} OFFSET ${OffsetQuery}`)
            DataInsert = []
            results.rows.forEach(result => {
                Keys = gnerateKey.gnerateKey(result, JsonDataTable.TableKeys)
                DataInsert.push({
                    "k": (Keys),
                    "b": JSON.stringify(result)
                })
            });
             insertDataInTo.insertDataInTo(DataInsert, JsonDataTable.TableName)
             console.log(JsonDataTable.TableName, "*** remaining records: ", (parseInt(JsonDataTable.TableCount) - OffsetQuery));
       // }
        return (true)
    } catch (e) {
        console.log(e);
        return (null)
    } finally {
        client.release()
    }
}