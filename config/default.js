/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

module.exports = {
  api: {
    data: {
      source: process.env.NJCDD_API_DATAPATH || './data/source'
    },
    database: {
      mongodb: {
        url: process.env.NJCDD_MONGODB_URI
      },
      name: 'njcdd',
      table: {
        account: 'contact',
        accounts: 'contact',
        accountView: 'accountView',
        query: 'queryCatalog'
      }
    },
    port: process.env.NJCDD_ACCOUNT_API_PORT
  }
};
