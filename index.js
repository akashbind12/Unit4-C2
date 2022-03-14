
const express = require ("express");

const  mongoose = require("mongoose");

const app = express();

const connect = () => {
    return mongoose.connect(
        "mongodb://127.0.0.1:27017/bankSystem"
    );
};

app.listen(5000, async () => {
    try{
        await connect();
    } catch (err){
        console.log(err);
    }
   
    console.log("listening on port 6789");
});


// User SCHEMA
//creating schema


const userSchema = new mongoose.Schema(
    {
        firstName : { type : String, required: true},
        middleName : { type : String, required: false},
        lastName : { type : String, required: true},
        age : { type : Number, required: true},
        email : { type : String, required: true, unique: true},
        address : { type : String, required: true},
        gender : { type : String, required: false, default: "female"},
        type : { type : String, required: false, default: "customer"},
    },
    {
        timestamps: true, 
    } 
);

const User = mongoose.model("user", userSchema);


// BranchDetail schema

const BranchDetailSchema = new mongoose.Schema(
    {
        Name : { type : String, required: true},
        address : { type : String, required: true},
        IFSC : { type : String, required: true},
        MICR : { type : Number, required: true}, 
    },
    {
        timestamps: true, 
    } 
);

const BranchDetail = mongoose.model("BranchDetail", BranchDetailSchema);


//Relationshpipmanager schema

const RelationshpipmanagerSchema = new mongoose.Schema(
    {
        Name : { type : String, required: true},
    },
    {
        timestamps: true, 
    } 
);

const Relationshpipmanager = mongoose.model("Relationshpipmanager", RelationshpipmanagerSchema);



// MasterAccount Schema

// balance (required) This is the total balance that the person has in the bank
// createdAt (required)
// updatedAt (required)

const MasterAccountSchema = new mongoose.Schema(
    {
        balance : { type : Number, required: true},
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required: true,
        },
        BranchDetailId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "BranchDetail",
            required: true,
        },
        RelationshpipmanagerId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Relationshpipmanager",
            required: true,
        },
    },
    {
        timestamps: true, 
    } 
);

const MasterAccount = mongoose.model("MasterAccount", MasterAccountSchema);

// SavingsAccount Schema

const SavingsAccountSchema = new mongoose.Schema(
    {
        account_number : { type : String, required: true, unique: true},
        balance : { type : Number, required: true},
        interestRate : { type : Number, required: true},
        MasterAccountId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "MasterAccount",
            required: true,
        },
    },
    {
        timestamps: true, 
    } 
);

const SavingsAccount = mongoose.model("SavingsAccount", SavingsAccountSchema);


// FixedAccount Schema

// account_number ( required and should be unique)
// balance ( required )
// interestRate ( required )
// startDate ( required )
// maturityDate (required )
// createdAt (required)
// updatedAt (required)

const FixedAccountSchema = new mongoose.Schema(
    {
        account_number : { type : String, required: true, unique: true},
        balance : { type : Number, required: true},
        interestRate : { type : Number, required: true},
        startDate : { type : Date, required: true},
        maturityDate : { type : Date, required: true},
        MasterAccountId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "MasterAccount",
            required: true,
        },
    },
    {
        timestamps: true, 
    } 
);

const FixedAccount = mongoose.model("FixedAccount", FixedAccountSchema);




