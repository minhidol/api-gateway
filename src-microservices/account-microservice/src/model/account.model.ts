import mongoose from "mongoose";

export interface AccountDocument extends mongoose.Document{
    username: String,
    password: String,
    full_name: String,
    refresh_token: String,
    age: String,
    role: String,
    is_delete: Boolean,
    address: String,
    created_by: String,
    created_date: Date,
    updated_by: String,
    updated_date: Date,
}

const AccountSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        full_name: {type: String, default: ''},
        age: {type: String, default: ''},
        role: {type: String, default: ''},
        refresh_token: {type: String, default: ''},
        is_delete: {type: Boolean, default: false},
        address:{type: String, default: ''},
        created_by: {type: String, default: ''},
        created_date: {type: Date, default: Date.now()},
        updated_by: {type: String, default: ''},
        updated_date: {type: Date, default: Date.now()},
    }   
);

const Account = mongoose.model<AccountDocument>('account', AccountSchema);

export default Account;

