import mongoose from "mongoose";

export interface BranchDocument extends mongoose.Document{
    name: String,
    category: Array<String>,
    is_delete: Boolean,
    created_by: String,
    created_date: Date,
    updated_by: String,
    updated_date: Date,
}

const BranchSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        category: {type: Array, default: []},
        is_delete: {type: Boolean, default: false},
        created_by: {type: String, default: ''},
        created_date: {type: Date, default: Date.now()},
        updated_by: {type: String, default: ''},
        updated_date: {type: Date, default: Date.now()},
    }   
);

const Branch = mongoose.model<BranchDocument>('branch', BranchSchema);

export default Branch;

