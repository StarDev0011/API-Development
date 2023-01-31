var sampleSize = 5;

db.contact.aggregate(
  {
    $facet: {
      named: [
        {
          $match: {
            $or: [
              {familyName: {$ne: null}},
              {fullName: {$ne: null}}
            ]
          }
        },
        {$sample: {size: sampleSize}}
      ],
      address: [
        {$match: {addresses: {$exists: true, $ne: []}}},
        {$match: {"addresses.verified.status": "verified"}},
        {$sample: {size: sampleSize * 4}}
      ],
      noaddress: [
        {$match: {addresses: {$exists: true, $eq: []}}},
        {$sample: {size: sampleSize}}
      ],
      email: [
        {$match: {emails: {$exists: true, $ne: []}}},
        {$match: {"emails.verified.status": "verified"}},
        {$sample: {size: sampleSize * 4}}
      ],
      noemail: [
        {$match: {emails: {$exists: true}}},
        {$match: {"emails.address": {$eq: null}}},
        {$sample: {size: sampleSize}}
      ],
      phone: [
        {$match: {telephones: {$exists: true, $ne: []}}},
        {$match: {"telephones.number": {$ne: null}}},
        {$sample: {size: sampleSize * 2}}
      ],
      nophone: [
        {$match: {telephones: {$exists: true, $eq: []}}},
        {$sample: {size: sampleSize}}
      ]
    }
  },
  {
    $project: {
      account: {
        $concatArrays: [
          "$named", "$address", "$noaddress", "$email", "$noemail", "$phone", "$nophone"
        ]
      }
    }
  },
  {
    $project: {account: "$account"}
//},
//{
//    $replaceRoot: { newRoot: "$account" }
//},
//{
//    $unwind: "$account"
  });
