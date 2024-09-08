import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
  component: () => (
    <div className="flex justify-center items-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        appearance={{
          baseTheme: dark,
          layout: { socialButtonsVariant: "blockButton" },
        }}
        />
      </div>
  ),
});
