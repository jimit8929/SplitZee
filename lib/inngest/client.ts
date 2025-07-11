import { Inngest } from "inngest";
import { inngest as client } from "./client";

export const inngest = new Inngest({
  id: "splitzee",
});

export const helloWorld = client.createFunction(
  { id: "helloWorld" },
  { event: "test/hello.World" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return {
      message: `Hello, ${event.data.email}!`,
    };
  }
);
