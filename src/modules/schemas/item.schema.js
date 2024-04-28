import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Event',
        },
        show: {
            type: Boolean,
            default: true,
        },
        picked_by: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'User',
                },
            },
          ],
    },
    { timestamps: true }
)

export const ItemModel = mongoose.model('Item', itemSchema)
