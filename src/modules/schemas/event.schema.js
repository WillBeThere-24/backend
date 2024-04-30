import mongoose from 'mongoose'
import { GuestModel } from '../schemas/guest.schema.js'

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        isPrivate: {
            type: Boolean,
            required: true,
            default: true,
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
        timezone: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            default: []
        },
        attendingGuestCount: {
            type: Number,
            virtual: true,
            get: function() {
                return GuestModel.countDocuments({ event: this, attending: true })
                .then(count => count);
            }
        },
        notAttendingGuestCount: {
            type: Number,
            virtual: true,
            get: function() {
                return GuestModel.countDocuments({ event: this, attending: false })
                .then(count => count);
            }
        },
        noResponseGuestCount: {
            type: Number,
            virtual: true,
            get: function() {
                return GuestModel.countDocuments({ event: this, attending: null })
                .then(count => count);
            }
        }
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

eventSchema.methods.getTotalPlusOnes = async function() {
    let totalPlusOnes = 0;
    
    await GuestModel.aggregate([
        { $match: { event: this._id, attending: true } },
        { $unwind: '$plus_ones' },
        { $group: { _id: null, totalPlusOnes: { $sum: 1 } } }
      ])
      .then(results => {
        totalPlusOnes = results.length > 0 ? results[0].totalPlusOnes : 0;
      });
    
    return totalPlusOnes;
};

export const EventModel = mongoose.model('Event', eventSchema)
