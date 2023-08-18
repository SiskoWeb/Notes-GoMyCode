import React from "react";
import Link from "next-intl/link";

export default function Header() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-10">
      <div className="header">
        <h1>🤩 Notes</h1>
      </div>

      <div className="language">
        <Link href="/" locale="en">
          In english
        </Link>{" "}
        |{" "}
        <Link href="/" locale="ar">
          In Arabic
        </Link>
      </div>
    </div>
  );
}
