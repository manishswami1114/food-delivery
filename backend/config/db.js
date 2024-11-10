import mongoose, { mongo } from 'mongoose'

export const connectdb=async ()=>{
    await mongoose.connect('mongodb+srv://manish1114be21:Swami335523@cluster0.1wyj2.mongodb.net/').then(()=>console.log("db connected"));
}