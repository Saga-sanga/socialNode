const { Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");

const validatePassword = {
  validator: function (value) {
    isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  },
  message: "Password is not strong enough",
};

const userSchema = new Schema({
  name: {
    first: {
      type: String,
    },
    last: {
      type: String,
    },
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  profileImg: {
    type: String,
  },
  password: {
    type: String,
    validate: [validatePassword],
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.post(/find$/, function(doc, next) {
  doc.forEach((file) => {
    file.password = undefined;
  });
  next();
});

const User = model("user", userSchema);

module.exports = User;
