module.exports = {
    rules: [
      {
      pattern: /\/api\/indexList.php$/,
      respondwith: './index.json'
    },
      {
      pattern: /\/api\/indexListNew.php\?page=\d+&pageSize=2$/,
      respondwith: './indexList.json'
    },
      {
      pattern: /\/api\/indexListNew.php\?page=\d+&pageSize=3$/,
      respondwith: './indexHomeList.json'
    },
    {
      pattern: /\/api\/indexListNew.php\?type=refresh$/,
      respondwith: './indexHomeList.json'
    }
  ]
};
