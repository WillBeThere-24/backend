import mongoose from 'mongoose'

const guestSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        attending: {
            type: Boolean,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Event',
        },
        message: {
            type: String,
        },
        plus_ones: [
            {
              firstName: {
                type: String,
                required: true,
              },
              lastName: {
                type: String,
              },
            },
          ],
    },
    { timestamps: true }
)

export const GuestModel = mongoose.model('Guest', guestSchema)
