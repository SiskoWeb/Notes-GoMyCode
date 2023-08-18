import React from "react";
import Link from "next-intl/link";

export default function Header({ t, setFilter }: { t: any; setFilter: any }) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center p-10">
        {/*  Switcher Languages */}
        <div className="flex w-full md:justify-end sm:justify-center  gap-5 p-2">
          <Link href="/" locale="en">
            In english
          </Link>

          <Link href="/" locale="ar">
            In Arabic
          </Link>
        </div>

        <div className="header">
          <h1>🤩 {t("title")}</h1>
        </div>
      </div>

      {/* Filtter */}
      <div className="flex  justify-center gap-4  ">
        <button
          className="border-2 border-[green] p-1"
          onClick={() => setFilter("all")}
        >
          {t("btnFiltterALL")}
        </button>
        <button
          className="border-2 border-[blue] p-1"
          onClick={() => setFilter("complete")}
        >
          {t("btnFiltterComplete")}
        </button>
        <button
          className="border-2 border-[red] p-1"
          onClick={() => setFilter("incomplete")}
        >
          {t("btnFiltterrInComplete")}
        </button>
      </div>
    </>
  );
}
