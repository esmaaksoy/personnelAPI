"use strict";

const { mongoose } = require("../configs/dbConnection");

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  {
    collection: "departments",
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", DepartmentSchema);
