var gnerateKey = require("./gnerateKey")
var insertDataInTo = require("./insertDataInTo")

const {
    table
} = require('console');
const {
    Pool
} = require('pg')
const pool = new Pool({
    idleTimeoutMillis: 1,
    connectionTimeoutMillis: 20000000,
    host: '',
    Port: '',
    database: '',
    Schema: '',
    user: '',
    password: '',
    max: 20
})

exports.selectDataFrom = async (JsonDataTable) => {
    let offset = 0;
    let client
    try {
        client = await pool.connect()
        while (offset < JsonDataTable.TableCount) {
            results = await client.query(`SELECT * FROM validation.${JsonDataTable.TableName} LIMIT ${JsonDataTable.TableLimit} OFFSET ${offset}`)
            offset += parseInt(JsonDataTable.TableLimit)
            DataInsert = []
            results.rows.forEach(result => {
                Keys = gnerateKey.gnerateKey(result, JsonDataTable.TableKeys)
                DataInsert.push({
                    "k": (Keys),
                    "b": JSON.stringify(result)
                })
            });
            await insertDataInTo.insertDataInTo(DataInsert, JsonDataTable.TableName)
            await console.log(JsonDataTable.TableName, "*** remaining records: ", (parseInt(JsonDataTable.TableCount) - offset));
        }
        return (true)
    } catch (e) {
        console.log(e);
        return (null)
    } finally {
        client.release()
    }
}