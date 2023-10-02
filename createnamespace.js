var chprocess = require('child_process')
exports.createnamespace = (tabelname) => {
  return new Promise(function (createnamespaceResolve, createnamespaceReject) {
    chprocess.exec(`./create_namespace/script.js create -n ${tabelname} -p rat -d rat -s validation -t ${tabelname}`, function (error, stdout, stderr) {
      if (error) {
        createnamespaceReject({error,stderr});
      } else
      createnamespaceResolve(stdout);
    });
  })
}

