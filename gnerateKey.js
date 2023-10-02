exports.gnerateKey = (Body, TableKeys) => {
    Keys = []
    TableKeys.forEach(TableKey => {
        Keys.push(TableKey + "_" + Body[TableKey])
    });
    return Keys;
}