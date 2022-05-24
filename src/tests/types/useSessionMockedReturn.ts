import { type Session } from "next-auth";

export type useSessionMockedReturn =
  | {
      data: Session;
      status: "authenticated";
    }
  | {
      data: null;
      status: "unauthenticated" | "loading";
    }
  | {
      data: Session;
      status: "authenticated";
    }
  | {
      data: null;
      status: "loading";
    };
