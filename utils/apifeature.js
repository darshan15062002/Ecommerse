class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {};

        this.query = this.query.find({ ...keyword })
        return this
    }
    filter() {
        const querynew = { ...this.queryStr }
        const removefield = ['keyword', 'pages', 'limit'];
        removefield.forEach((field) => delete querynew[field])
        let queryStr = JSON.stringify(querynew)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
        console.log(JSON.parse(queryStr));
        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }
    pagination(pagination) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = pagination * (currentPage - 1)
        this.query = this.query.limit(pagination).skip(skip)
        // 5 product page 1 => 5*1-1 = 0  limit=5 skip at start 0
        // 5 product page 2 => 5*2-1 = 0  limit=5 skip at start 5
        return this
    }
}
module.exports = ApiFeatures