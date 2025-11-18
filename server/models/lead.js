import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  module: { type: String, default: "Resume" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Lead", LeadSchema);

