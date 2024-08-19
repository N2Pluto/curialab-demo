"use client";
import Link from "next/link";
import { Grip } from "lucide-react";

import { Button } from "@/components/ui/button";
import curiahubServices from "@/services/curiahub.services";
import { useEffect, useState } from "react";
import { routes } from "@/constant/routes";

export function Navbar() {
  const [price, setPrice] = useState<number>(0);

  const fetchPrice = async () => {
    try {
      const result = await curiahubServices.getPrice();
      if (result) {
        setPrice(result.price);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center gap-4  bg-background px-4 md:px-6">
      <div className="flex w-full justify-between">
        <nav className=" flex-col gap-1 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm">
          <Link href={routes.HOME} className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <div className="flex space-x-2">
              <div className="w-[32px] lg:w-[32px] cursor-pointer select-none ">
                <img className="h-full" src="/images/curia-logo.svg" alt="logo" />
              </div>
              <div className="w-[31px] lg:w-[179px] cursor-pointer select-none hidden lg:block">
                <img className="h-full" src="/images/curia-logo-text.svg" alt="logo" />
              </div>
            </div>
          </Link>
          <div className="content-center hidden lg:block">
            <div className="flex space-x-2 css-1njaxz2 justify-center items-center">
              <div className="w-[32px] lg:w-[32px]  select-none ">
                <img className="h-full" src="/images/op-logo.svg" alt="logo" />
              </div>
              <div className="w-[32px] lg:w-[32px]  select-none">
                <p className="text-sm lg:text-sm">${price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </nav>

        <nav className=" flex-row gap-1  items-center text-base font-normal lg:flex lg:flex-row hidden">
          <div className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <div className="flex justify-end">
                <div className="content-center">
                  <div className="css-1njaxz3 flex items-center">
                    <div className="p-[2px]">
                      <Link href={routes.HOME}>
                        <div className="bg-white rounded-full p-4">
                          <Grip />
                        </div>
                      </Link>
                    </div>

                    <div className="pl-3 pr-6">
                      <p className="text-white">Holder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <nav className=" flex-row gap-1  items-center font-light lg:flex lg:flex-row hidden ">
          <div className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <div className="flex justify-end">
                <div className="content-center pr-1">
                  <Link href={routes.FORM} target="_blank">
                    <p className="text-base font-light">Request Features</p>
                  </Link>
                </div>
                <div className="content-center pl-3">
                  <Link href={routes.HOME}>
                    <Button className="rounded-3xl bg-red-100 hover:bg-red-300 border-current" variant="outline">
                      <p className="text-base font-light">Delegate Us</p>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
