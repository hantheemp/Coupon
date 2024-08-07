import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI || "")
mongoose.Promise = global.Promise

const ticketSchema = new Schema(
    {
        name: String,
        surname: String,
        iban: String,
        withdrawAmount: Number,
        description: String,
        status: String,
        authDoctor: String,
    },
    {
        timestamps: true,
    }
)

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema)
export default Ticket