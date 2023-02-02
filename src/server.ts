/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { app } from './app'

const port = parseInt(process.env.NJCDD_ACCOUNT_API_PORT || '12100')

app.listen(port, () => {
    console.log(`NJCDD-API-Mock listening at http://localhost:${port}`)
  }
)
