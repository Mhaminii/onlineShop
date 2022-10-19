const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "!لطفا نام خود را وارد نمایید"],
    maxLength: [30, "!نام نمی تواند بیشتر از 30 کاراکتر باشد"],
  },
  email: {
    type: String,
    required: [true, "!لطفا ایمیل خود را وارد نمایید"],
    unique: true,
    validate: [
      validator.isEmail,
      "!اییمل نامعتبر است. لطفا ایمیل معتیر وارد کنید",
    ],
  },
  password: {
    type: String,
    required: [true, "!لطفا رمزعبور را وارد نمایید"],
    minlength: [6, "!رمزعبور نمی تواند کمتر از 6 کاراکتر باشد"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Encryping passsword before save it.
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

userSchema.methods.getJwtToken = function(){
    return jwt.sign({ id : this._id},'ROU2878RHCUFB47RY7RCHCCM28327R',{
        expiresIn: '7d'
    })
}

//generate reser password token

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('User' , userSchema)
