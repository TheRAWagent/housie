import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: () => (
    <div className="flex justify-center items-center">
      <SignIn
        routing="hash"
        signUpUrl="/sign-up"
        appearance={{
          baseTheme: dark,
          layout: { socialButtonsVariant: "blockButton" },
        }}
      />
    </div>
  ),
});
