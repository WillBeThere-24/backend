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
        },
        // plusOnesGuestCount: {
        //     type: Number,
        //     virtual: true,
        //     get: function() {
        //         let plusOnes = 0;
        //         const guests = GuestModel.find({ event: this, attending: true })
        //         guests.forEach(guest => plusOnes += guest.plus_ones.length)
        //         return plusOnes
        //     }
        // }
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

export const EventModel = mongoose.model('Event', eventSchema)
