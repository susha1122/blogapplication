import User from '../models/user.model.js';
import { Webhook } from 'svix';

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

  const payload = req.body.toString("utf8");
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(payload, headers);
  } catch (error) {
    return res.status(400).json({ message: "Webhook verification failed!" });
  }

  // HANDLE USER CREATION (Standard)
  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address.split("@")[0],
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_image_url || evt.data.image_url,
    });

    await newUser.save();
  }

  // HANDLE SESSION CREATION (Fallback / Self-Healing)
  // Sometimes user.created might fail or be missed. This catches them on login.
  if (evt.type === "session.created") {
    // In session events, user data is nested in evt.data.user
    const userData = evt.data.user; 
    
    // Check if user exists
    const existingUser = await User.findOne({ clerkUserId: evt.data.user_id });
    
    if (!existingUser) {
       const newUser = new User({
        clerkUserId: evt.data.user_id,
        username: userData.username || userData.email_addresses[0].email_address.split("@")[0],
        email: userData.email_addresses[0].email_address,
        img: userData.image_url,
      });
      
      await newUser.save();
      console.log("User created via Session Fallback");
    }
  }

  return res.status(200).json({ message: "Webhook received" });
};