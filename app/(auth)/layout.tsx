import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen">
      <section className="bg-brand px-10 hidden items-center justify-center w-1/3 lg:flex xl:w-2/5 ">
        <div
          className=" flex flex-col justify-center max-h-[800px] max-w-[430px] space-y-12
        "
        >
          <Image
            src={"/assets/icons/logo-full.svg"}
            alt="logo"
            width={150}
            height={150}
            className="h-auto"
          />

          <div className=" space-y-3 text-white">
            <h1 className="h1">Manage Your Files The Easy Way</h1>
            <p className=" body-1">
              Awesome, we&apos;ve created the perfect place for you to store all your
              documents.
            </p>
          </div>
          <Image
            src={"/assets/images/files.png"}
            alt="files"
            width={342}
            height={342}
            className="mx-auto transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col bg-white p-4 py-12 items-center lg:justify-center lg:px-10 lg:py-0">
        <div className="lg:hidden mb-16">
          <Image
            src={"/assets/icons/logo-full-brand.svg"}
            alt="brand-logo"
            width={224}
            height={84}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>
        {children}
      </section>
    </main>
  );
};

export default layout;
