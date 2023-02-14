db.accountMain.drop();

db.createView(
    'accountMain',
    'contact',
    [
        {
            $lookup: {
                from: 'context',
                localField: 'aces.provenance.sourceFilename',
                foreignField: 'filename',
                as: 'context'
            }
        },
        {
            $project: {
                _id: 1,
                category: {$first: '$context.context'},
                source: '$aces.provenance.sourceFilename',
                firstName: { $ifNull:  }'$givenName',
                middleName: '$additionalName',
                lastName: '$givenName',
                gender: 1,
                maritalStatus: 1,
                address: {$ifNull: [{$first: '$addresses.address'}, null]},
                address2: {$ifNull: [{$first: '$addresses.address2'}, null]},
                city: {$ifNull: [{$first: '$addresses.city'}, null]},
                county: {$ifNull: [{$first: '$addresses.county'}, null]},
                state: {$ifNull: [{$first: '$addresses.state'}, null]},
                postalCode: {$ifNull: [{$first: '$addresses.postalCode'}, null]},
                addressVerified: {$ifNull: [{$first: '$addresses.verified.status'}, null]},
                email: {$ifNull: [{$first: '$emails.address'}, null]},
                emailVerified: {$ifNull: [{$first: '$emails.verified.status'}, null]},
                telephone: {$ifNull: [{$first: '$telephones.number'}, null]}
            }
        }
    ]
);
