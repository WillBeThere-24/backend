import mongoose from 'mongoose'

const inviteeSchema = new mongoose.Schema(
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
        plus_ones: {
            type: Array,
        },
    },
    { timestamps: true }
)

export const InviteeModel = mongoose.model('Invitee', inviteeSchema)
