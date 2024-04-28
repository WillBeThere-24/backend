import mongoose from 'mongoose'
import { hashData } from '../../common/utils/helper.js'
import { EventModel } from './event.schema.js'
import { GuestModel } from './guest.schema.js'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        auth: {
            type: String,
            required: true,
            default: 'local',
            enum: ['local', 'google'],
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            required: false,
        },
        eventCount: {
            type: Number,
            virtual: true,
            get: function () {
                return EventModel.countDocuments({ user: this }).then(
                    (count) => count
                )
            },
        },
        rsvpCount: {
            type: Number,
            virtual: true,
            get: function () {
                return GuestModel.countDocuments({ email: this.email }).then(
                    (count) => count
                )
            },
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    try {
        const hashedPassword = await hashData(this.password)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.pre(/^find/, function (next) {
    // Exclude models with isDeleted=true
    this.find({ isDeleted: { $ne: true } })
    next()
})

// Use pre-update hook to hash the password before updating the document
userSchema.pre(/^update/, async function (next) {
    // 'this' refers to the query being executed (e.g., findOneAndUpdate)
    if (this._update.password) {
        try {
            const hashedPassword = await hashData(this._update.password)
            this._update.password = hashedPassword
            next()
        } catch (error) {
            next(error)
        }
    } else {
        // If password is not being updated, proceed to the next middleware
        next()
    }
})

export const UserModel = mongoose.model('User', userSchema)
