import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({


  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .searchIndex("search_name", { searchField: "name" })
    .searchIndex("search_email", { searchField: "email" }),



  expenses: defineTable({
    description: v.string(),
    amount: v.number(),
    category: v.optional(v.string()),
    date: v.number(), //timestamp
    paidByUserId: v.id("users"), //reference to users table
    splitType: v.string(), // "equal", "percentage", "exact"
    splits: v.array(
      v.object({
        userId: v.id("users"), // reference to users table
        amount: v.number(), // amount owed by the user
        paid: v.boolean(),
      })
    ),
    groupId: v.optional(v.id("groups")), // undefined for one-on-one expenses
    createdBy: v.id("users"), // reference to users table
  })
  .index("by_group", ["groupId"])
  .index("by_user_and_group", ["paidByUserId", "groupId"])
  .index("by_date", ["date"]),



  groups: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.id("users"), // reference to users table
    members: v.array(
        v.object({
            userId: v.id("users"), // reference to users table
            role: v.string(),
            joinedAt: v.number(), // timestamp of when the user joined the group
        })
    ),
  }),




  settlements: defineTable({
    amount: v.number(),
    note: v.optional(v.string()),
    date: v.number(), // timestamp
    paidByUserId: v.id("users"),
    receivedByUserId: v.id("users"),
    groupId: v.optional(v.id("groups")),
    relatedExpenseIds: v.optional(v.array(v.id("expenses"))), // <-- this line must be present
    createdBy: v.id("users"),
  })
    .index("by_group", ["groupId"])
    .index("by_user_and_group", ["paidByUserId", "groupId"])
    .index("by_date", ["date"])
    .index("by_receiver_and_group", ["receivedByUserId", "groupId"]),
});
