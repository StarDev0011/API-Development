db.accounts.aggregate([
    {
        $match: {
            addresses: { $exists: 1, $ne: []}
        }
    },
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
            address: {$ifNull: [
                {$first: "$addresses.verified.usps.AddressValidateResponse.Address.Address2"},
                "$address"
            ]},
            address2: {$first: "$addresses.verified.usps.AddressValidateResponse.Address.Address1"},
            addressVerified: {$ifNull: [{$first: '$addresses.verified.status'}, null]},
            city: {$ifNull: [
                {$first: "$addresses.verified.usps.AddressValidateResponse.Address.City"},
                "$city"
            ]},
            state: {$ifNull: [
                {$first: "$addresses.verified.usps.AddressValidateResponse.Address.State"},
                "$state"
            ]},
            postalCode: {$ifNull: [
                {$first: "$addresses.verified.usps.AddressValidateResponse.Address.Zip5"},
                "$postalCode"
            ]},
            firstName: {$toUpper: {$ifNull: [ "$aces.humanName.first", "$firstName" ]}},
            middleName: {$toUpper: {$ifNull: [ "$aces.humanName.middle", "$middleName" ]}},
            lastName: {$toUpper: {$ifNull: [ "$aces.humanName.last", "$lastName" ]}},
            gender: 1,
            maritalStatus: 1,
            email: {$toUpper: {$ifNull: [{$first: '$emails.address'}, null]}},
            emailVerified: {$ifNull: [{$first: '$emails.verified.status'}, null]},
            telephone: {$ifNull: [{$first: '$telephones.number'}, null]},
            category: {$first: '$context.context'},
            source: '$aces.provenance.sourceFilename'
        }
    }
])
