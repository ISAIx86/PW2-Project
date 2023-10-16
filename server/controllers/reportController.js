const mongoose = require('mongoose')
const Report = mongoose.model('denuncias')
const Article = mongoose.model('articulos')
const User = mongoose.model('usuarios')

const errorMessages = require('../handlers/error-messages.json')
const { modlogger } = require('../middlewares/logger')
const { sendResponse } = require('../handlers/answerHandler')

// Create
exports.create = async (req, res) => {
    
    const { artID } = req.body
    const id = req.payload.id
    
    const article = await Article.findOne({_id: artID, is_deleted: false})
    if (!article) throw errorMessages.article['not-found']

    const report = new Report({
        article,
        author: id
    })

    await report.save()

    sendResponse(res, "Denuncia enviada.")

}

// Updates
exports.closeReport = async (req, res) => {

    const { repID, justification } = req.body
    const id = req.payload.id

    const moderator = await User.findOne({_id: id, is_mod: true, is_deleted: false})
    if (!moderator) throw errorMessages.users['id-not-found']

    const report = await Report.findOne({
        _id: repID,
        is_deleted: false
    })
    if (!report) throw errorMessages.reports['id-not-found']

    report.set({
        solved_by: moderator.id,
        solved_text: justification,
        is_deleted: true
    })

    report.save()

    modlogger.log('handle', `mod (${moderator.username}), report:${report.id}, justification: ${report.justification}.`)
    sendResponse(res, "Reporte cerrado.")

}

// Queries
exports.getReport = async (req, res) => {

    const _rep_id = req.params._rep_id
    const id = req.payload.id

    const report = await Report
        .findOne({_id: _rep_id, is_deleted: false})
        .populate('article', 'article_type')
    if (!report) throw errorMessages.reports['id-not-found']

    let article_join = null
    switch (report.article.article_type) {
        case 'review':
            article_join = {
                lookups: [
                    {$lookup: {
                        from: 'resenas',
                        localField: 'article_details._id',
                        foreignField: '_id',
                        as: 'article_data'
                    }}, {$unwind: '$article_data'},
                    {$lookup: {
                        from: 'juegos',
                        localField: 'article_data.game',
                        foreignField: '_id',
                        as: 'game_data'
                    }}, {$unwind:'$game_data'}
                ],
                proj_data: {
                    game_card: {
                        name_id: '$game_data.name_id',
                        image: '$game_data.image',
                        title: '$game_data.title'
                    },
                    container: {
                        content: '$article_data.content',
                        rate: '$article_data.rate'
                    },
                    article_details: {
                        publish_datetime: '$article_details.created_at',
                        likes: {$size: '$article_details.users_likes'}
                    },
                    is_deleted: '$article_details.is_deleted'
                }
            }
            break
        case 'post':
            article_join = {
                lookups: [
                    {$lookup: {
                        from: 'publicaciones',
                        localField: 'article_details._id',
                        foreignField: '_id',
                        as: 'article_data'
                    }}, {$unwind: '$article_data'},
                    {$lookup: {
                        from: 'juegos',
                        localField: 'article_data.game',
                        foreignField: '_id',
                        as: 'game_data'
                    }}, {$unwind: {path:'$game_data', preserveNullAndEmptyArrays: true}},
                    {$lookup: {
                        from: 'multimedias',
                        localField: 'article_data.multimedia',
                        foreignField: '_id',
                        as: 'multimedia_data'
                    }}
                ],
                proj_data: {
                    game_card: {$cond: [
                        {$ifNull: ['$game_data', false]},
                        {name_id: '$game_data.name_id', image: '$game_data.image', title: '$game_data.title'},
                        '$$REMOVE'
                    ]},
                    container: {
                        content: '$article_data.content',
                        multimedia: {$map: {
                            input: '$multimedia_data',
                            as: 'file',
                            in: {
                                source: '$$file.directory'
                            }
                        }}
                    },
                    article_details: {
                        publish_datetime: '$article_details.created_at',
                        likes: {$size: '$article_details.users_likes'}
                    },
                    is_deleted: '$article_details.is_deleted'
                }
            }
            break
    }

    const results = await Report
        .aggregate([
            {$lookup: {
                from: 'articulos',
                localField: 'article',
                foreignField: '_id',
                as: 'article_details'
            }}, {$unwind: '$article_details'},
            {$lookup: {
                from: 'usuarios',
                localField: 'author',
                foreignField: '_id',
                as: 'reporter'
            }}, {$unwind: '$reporter'},
            {$lookup: {
                from: 'usuarios',
                localField: 'article_details.author',
                foreignField: '_id',
                as: 'article_author'
            }}, {$unwind: '$article_author'},
            ...article_join.lookups,
            {$match: {
                '_id': report._id
            }},
            {$project: {
                _id: 1,
                reporter_data: {
                    id: '$reporter._id',
                    image: '$reporter.image',
                    username: '$reporter.username',
                    is_deleted: '$reporter.is_deleted'
                },
                author_data: {
                    id: '$article_author._id',
                    image: '$article_author.image',
                    username: '$article_author.username',
                    is_deleted: '$article_author.is_deleted'
                },
                article_type: '$article_details.article_type',
                article_data: article_join.proj_data
            }}
        ])

    sendResponse(res, results)

}

exports.getReports = async (req, res) => {

    let { page, elem_per_page } = req.query
    
    page = Math.floor(typeof page !== 'undefined' & page !== '' ? page : 1)
    elem_per_page = Math.floor(typeof elem_per_page !== 'undefined' & elem_per_page !== '' ? elem_per_page : 10)

    if (page <= 0) page = 1
    if (elem_per_page < 10) elem_per_page = 10

    const offset = ((page - 1) * elem_per_page)

    const results = await Report
        .aggregate([
            {$lookup: {
                from: 'articulos',
                localField: 'article',
                foreignField: '_id',
                as: 'article_detail'
            }}, {$unwind: '$article_detail'},
            {$lookup: {
                from: 'usuarios',
                localField: 'article_detail.author',
                foreignField: '_id',
                as: 'article_author'
            }}, { $unwind: '$article_author'},
            {$lookup: {
                from: 'usuarios',
                localField: 'author',
                foreignField: '_id',
                as: 'reporter'
            }}, {$unwind: '$reporter'},
            {$match: {
                'is_deleted': false
            }},
            {$project: {
                _id: 1,
                article_id: '$article_detail._id',
                article_author: {
                    id: '$article_author._id',
                    image: '$article_author.image',
                    username: '$article_author.username'
                },
                reporter: {
                    id: '$reporter._id',
                    image: '$reporter.image',
                    username: '$reporter.username'
                },
                report_date: '$created_at',
                article_date: '$article_detail.created_at'
            }},
            {$facet: {
                pagination_data: [
                    {$count: "total_docs"},
                    {$addFields: {page: page}},
                    {$addFields: {elements: elem_per_page}}
                ],
                data: [
                    {$skip: offset},
                    {$limit: elem_per_page}
                ]
            }}
        ])

    sendResponse(res, results)

}

exports.getDeleted = async(req, res) => {

    let { page, elem_per_page } = req.query
    
    page = Math.floor(typeof page !== 'undefined' & page !== '' ? page : 1)
    elem_per_page = Math.floor(typeof elem_per_page !== 'undefined' & elem_per_page !== '' ? elem_per_page : 10)

    if (page <= 0) page = 1
    if (elem_per_page < 10) elem_per_page = 10

    const offset = ((page - 1) * elem_per_page)

    const results = await Report
        .aggregate([
            {$lookup: {
                from: 'articulos',
                localField: 'article',
                foreignField: '_id',
                as: 'article_detail'
            }}, {$unwind: '$article_detail'},
            {$lookup: {
                from: 'usuarios',
                localField: 'article_detail.author',
                foreignField: '_id',
                as: 'article_author'
            }}, { $unwind: '$article_author'},
            {$lookup: {
                from: 'usuarios',
                localField: 'author',
                foreignField: '_id',
                as: 'reporter'
            }}, {$unwind: '$reporter'},
            {$lookup: {
                from: 'usuarios',
                localField: 'solved_by',
                foreignField: '_id',
                as: 'solver'
            }}, {$unwind: '$solver'},
            {$match: {
                'is_deleted': true
            }},
            {$project: {
                _id: 1,
                article_id: '$article_detail._id',
                article_author: {
                    id: '$article_author._id',
                    image: '$article_author.image',
                    username: '$article_author.username',
                    is_deleted: '$article_author.is_deleted'
                },
                reporter: {
                    id: '$reporter._id',
                    image: '$reporter.image',
                    username: '$reporter.username',
                    is_deleted: '$reporter.is_deleted'
                },
                report_date: '$created_at',
                article_date: '$article_detail.created_at',
                solver_data: {
                    id: '$solver._id',
                    image: '$solver.image',
                    username: '$solver.username'
                },
                justification: '$solved_text'
            }},
            {$facet: {
                pagination_data: [
                    {$count: "total_docs"},
                    {$addFields: {page: page}},
                    {$addFields: {elements: elem_per_page}}
                ],
                data: [
                    {$skip: offset},
                    {$limit: elem_per_page}
                ]
            }}
        ])

    sendResponse(res, results)

}