"use strict"

module.exports = (req, res, next) => {  

    const search = req.query?.search || {}
    for (let key in search) search[key] = { $regex: search[key], $options: 'i' }

    const sort = req.query?.sort || {}

    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)

    let page = Number(req.query?.page)
    page = (page > 0 ? page : 1) - 1

    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page * limit)

    res.getModelList = async function (Model, filter = {}, populate = null) {

        const filtersAndSearch = { ...filter, ...search  }

        return await Model.find(filtersAndSearch).sort(sort).skip(skip).limit(limit).populate(populate)
    }

    res.getModelListDetails = async function (Model, filters = {}) {

        const filtersAndSearch = { ...filters, ...search }

        const data = await Model.find(filtersAndSearch)

        let details = {
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length,
        }
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
        if (details.totalRecords <= limit) details.pages = false
        return details
    }

    next()
}