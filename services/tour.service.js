const TourModel = require("../models/tour.model");

exports.createTourService = async (data) => {
    const tour = new TourModel(data);
    return tour;
}
exports.getTourService = async (Data, queryData) => {
    const result = await TourModel
        .find(Data)
        .skip(queryData.skipByPage)
        .limit(queryData.limitByPage || queryData.limitBy)
        .select(queryData.filterBy)
        .sort(queryData.sortBy)
    const totalTour = await TourModel.countDocuments(Data);
    const totalPage = Math.ceil(totalTour / queryData.limitByPage || queryData.limitBy)
    return { totalTour, totalPage, result };
}
exports.getTourByIdService = async (productId) => {
    const tour = await TourModel.findById(productId);
    await TourModel.findOneAndUpdate({ _id: productId }, { $inc: { 'viewCount': 1 } }).exec();
    return tour;
}
exports.updateTourService = async (tourId, data) => {
    const tour = await TourModel.findById(tourId);
    const result = await tour.set(data).save();
    var obj = {
        tour: tour,
        tourName: tour.name
    };
    return obj;
}
exports.trendingTourService = async () => {
    const tour = await TourModel
    .find({})
    .sort({viewCount: -1})
    .limit(3);
    return tour;
}
exports.cheapestTourService = async () => {
    const tour = await TourModel
    .find({})
    .sort({price: 1})
    .limit(3);
    return tour;
}
