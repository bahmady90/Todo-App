const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema

const userSchema = new Schema({
  loginDates: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  
}, { timestamps: true })

//static signup method

userSchema.statics.signup = async function (email, name, password, passwordRepeat )  {

//validation


    if(!email || !password || !name || !passwordRepeat){
      throw Error("All fields must be filled");
    }

    if(password !== passwordRepeat){
      throw new Error("Both passwords must be the same");
  }

    if(!validator.isEmail(email)){
      throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
      throw new Error("Password is not strong enough")
    }
    const exists = await this.findOne({email})
    if(exists){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    //Create LoginDates Array
    
    let loginDates = [new Date()];

    const avatar = "default.svg";
    const user = await this.create({email, password: hash, name, avatar, loginDates})

    return user
}

//static login method

userSchema.statics.login = async function (email, password){

  if(!email || !password){
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({email});
  if(!user){
    throw Error("This email doesnt exists");
  }
  else {
    const match = await bcrypt.compare(password, user.password);
    if(match === true){
      return user;
    }
    else{
      throw new Error("The password is invalid");
    } 
  }

}
module.exports = mongoose.model('User', userSchema)