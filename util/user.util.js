function buildFilterQuery( query = {} ) {
    const filterQuery = {};
    const ageFilter = {};
    const dateFilter = {};

    if ( query.age_gte ) {
        ageFilter.$gte = Number(query.age_gte);
    }

    if ( query.age_lte ) {
        ageFilter.$lte = Number(query.age_lte);
    }

    if ( query.date_gte ) {
        dateFilter.$gte = query.date_gte;
    }

    if ( query.date_lte ) {
        dateFilter.$lte = query.date_lte; //'YYYY-MM-DD';
    }

    if ( query.search ) {
        filterQuery.$or = [
            { firstName: { $regex: query.search, $options: 'i' } },
            { lastName: { $regex: query.search, $options: 'i' } },
            { email: { $regex: query.search, $options: 'i' } }
        ];
    }

    if ( Object.keys(ageFilter).length ) {
        filterQuery.age = ageFilter;
    }

    if ( Object.keys(dateFilter).length ) {
        filterQuery.createdAt = dateFilter;
    }

    return filterQuery;
}

module.exports = {
    buildFilterQuery
};
