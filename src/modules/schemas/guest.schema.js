import mongoose from 'mongoose'

let guestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        attending: {
            type: Boolean,
            default: null,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Event',
        },
        message: {
            type: String,
            default: null,
        },
        plus_ones: {
            type: [{
              name: {
                type: String,
                default: ""
              },
              email: {
                type: String,
                default: ""
              }
            }],
            default: []
        },
        items: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
)

guestSchema.index({ email: 1, event: 1 }, { unique: true });

export const GuestModel = mongoose.model('Guest', guestSchema)
