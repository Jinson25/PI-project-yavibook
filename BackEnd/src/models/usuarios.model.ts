import {Schema, model} from 'mongoose';

export interface User{
    token: string;
    id:string;
    email:string;
    password: string;
    name:string;
    roles: string[];
}

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: {type: [String],/* requiered:true*/},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UserModel = model<User>('user', UserSchema);