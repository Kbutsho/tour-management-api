const TourModel = require("../models/tour.model");
const { createTourService, getTourService, getTourByIdService, updateTourService, trendingTourService, cheapestTourService } = require("../services/tour.service");

module.exports.getAllTour = async (req, res, next) => {
    try {
        let queryObject = { ...req.query }
        // exclude -> page, limit, sort
        const excludeFields = ["page", "limit", "sort", "fields"];
        excludeFields.forEach(field => delete queryObject[field]);

        let filterString = JSON.stringify(queryObject);
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        queryObject = JSON.parse(filterString);
        // queries
        const queries = {};
        // pagination 
        if (req.query.page) {
            const { page = 1, limit = 3 } = req.query;

            const skip = (page - 1) * parseInt(limit);
            queries.skipByPage = skip;
            queries.limitByPage = parseInt(limit);
        }
        // limit data
        if (req.query.limit) {
            const limitBy = req.query.limit
            queries.limitBy = limitBy
        }
        // sort data
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }
        // filter data
        if (req.query.fields) {
            const filterBy = req.query.fields.split(',').join(' ');
            queries.filterBy = filterBy;
        }
        const tour = await getTourService(queryObject, queries);
        res.status(200).json({
            'status': 'success',
            'data': tour
        })
    } catch (error) {
        res.status(400).json({
            'status': 'Failed',
            'message': 'Data not found!',
            'error': error.message
        })
    }
}
module.exports.createTour = async (req, res, next) => {
    try {
        const tour = await createTourService(req.body)
        const result = await tour.save();
        const tourName = result.logger();
        res.status(200).json({
            'status': 'success',
            'message': `${tourName} inserted successfully!`,
            'data': result
        })
    } catch (error) {
        res.status(400).json({
            'status': 'failed',
            'message': 'Data not save',
            'error': error.message
        })
    }
}
module.exports.getTourById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exist = await TourModel.findOne({ _id: id }).select("_id").lean();
        if (exist) {
            const tour = await getTourByIdService(id);
            return res.status(200).json({
                'status': 'success',
                'viewCount': tour.viewCount,
                'data': tour
            })
        }
        res.status(400).json({
            'status': 'failed',
            'message': `Id ${id} not found!`,
        })
    } catch (error) {
        res.status(400).json({
            'status': 'Failed',
            'message': `not found`,
            'error': error.message
        })
    }
}
module.exports.updateTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { tour, tourName } = await updateTourService(id, req.body);
        res.status(200).json({
            'status': 'success',
            'message': `${tourName} update successfully!`,
            'data': tour
        })
    } catch (error) {
        res.status(400).json({
            'status': 'Failed',
            'message': "couldn't update the tour",
            'error': error.message
        })
    }
}
module.exports.trendingTour = async (req,res,next)=>{
    try {
        const trendingTour = await trendingTourService();
        res.status(200).json({
            'status': 'success',
            'message': '3 trending tour',
            'data': trendingTour
        })
    } catch (error) {
        res.status(400).json({
            'status': 'Failed',
            'message': "couldn't found any tour",
            'error': error.message
        })
    }
}
module.exports.cheapestTour = async (req,res,next)=>{
    try {
        const cheapestTour = await cheapestTourService();
        res.status(200).json({
            'status': 'success',
            'message': '3 cheapest tour',
            'data': cheapestTour
        })
    } catch (error) {
        res.status(400).json({
            'status': 'Failed',
            'message': "couldn't found any tour",
            'error': error.message
        })
    }
}