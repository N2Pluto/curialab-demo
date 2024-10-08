import { Button } from "@/components/ui/button";
import { routes } from "@/constant/routes";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 rounded-t-2xl h-auto">
      <div className="px-[40px] py-[40px]  flex flex-col  justify-between gap-4  md:flex-row text-white text-balance lg:flex-row lg:space-x-3">
        <div className="flex flex-wrap md:w-[400px]">
          <div>
            <div className="w-[32px] md:w-[32px]  select-none ">
              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" fill="#00f">
                <path
                  fill="currentColor"
                  d="M16 18.851a2.852 2.852 0 1 0 0-5.704 2.852 2.852 0 0 0 0 5.704ZM.945 26.296H0v-2.883h.945c4.087 0 7.413-3.325 7.413-7.412S5.032 8.589.945 8.589H0V5.706h.945c5.677 0 10.296 4.619 10.296 10.295S6.62 26.296.945 26.296Z"
                ></path>
                <path
                  fill="currentColor"
                  d="M16 11.24C10.326 11.24 5.707 6.623 5.707.946V0h2.883v.945c0 4.087 3.325 7.413 7.412 7.413s7.412-3.326 7.412-7.413V0h2.883v.945c0 5.677-4.619 10.296-10.295 10.296ZM26.296 32h-2.883v-.945c0-4.087-3.325-7.413-7.412-7.413s-7.412 3.326-7.412 7.413V32H5.706v-.945c0-5.677 4.619-10.296 10.295-10.296s10.295 4.62 10.295 10.296V32Z"
                ></path>
                <path
                  fill="currentColor"
                  d="M32.002 26.296h-.946c-5.676 0-10.295-4.619-10.295-10.295S25.38 5.706 31.056 5.706h.946v2.883h-.946c-4.087 0-7.412 3.325-7.412 7.412s3.326 7.412 7.412 7.412h.946v2.883Z"
                ></path>
              </svg>
            </div>
          </div>
          <div>
            <div className="pl-4">
              <div className="text-xs">curiaLab.</div>
              <div className="flex-none">Governance Dashboard</div>
            </div>
          </div>
          <div className="w-full pt-2">
            <p className="text-[10px] font-thin">
              Curia Lab develops and refines data-driven tools for DAO governance by actively participating as a
              delegate, addressing data transparency, delegate clarity, and risk assessment in governance processes.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="flex w-full justify-start md:justify-end md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
            <div className="md:pr-4">
              <Link href={routes.FORM} target="_blank">
                <p className="text-md">Request Features</p>
              </Link>
            </div>
            <div className="md:pr-4">
              <Link href={routes.FORM} target="_blank">
                <p className="text-md">Changelog</p>
              </Link>
            </div>
            <div className="flex md:flex-none gap-2">
              <div>
                <Link href={routes.TWITTER} target="_blank">
                <img src="/images/twitter-logo-2.svg" alt="twitter" />
                </Link>
              </div>
              <div>
                <Link href={routes.DISCORD} target="_blank">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20.317 4.15509C18.7873 3.4532 17.147 2.93609 15.4319 2.63991C15.4007 2.6342 15.3695 2.64848 15.3534 2.67705C15.1424 3.05227 14.9087 3.54177 14.7451 3.92651C12.9004 3.65034 11.0652 3.65034 9.25832 3.92651C9.09465 3.53321 8.85248 3.05227 8.64057 2.67705C8.62449 2.64944 8.59328 2.63515 8.56205 2.63991C6.84791 2.93514 5.20756 3.45226 3.67693 4.15509C3.66368 4.1608 3.65233 4.17033 3.64479 4.1827C0.533392 8.83106 -0.31895 13.3652 0.0991801 17.8431C0.101072 17.865 0.11337 17.8859 0.130398 17.8992C2.18321 19.4068 4.17171 20.322 6.12328 20.9286C6.15451 20.9382 6.18761 20.9267 6.20748 20.901C6.66913 20.2706 7.08064 19.6058 7.43348 18.9068C7.4543 18.8659 7.43442 18.8173 7.39186 18.8011C6.73913 18.5535 6.1176 18.2516 5.51973 17.9088C5.47244 17.8812 5.46865 17.8135 5.51216 17.7811C5.63797 17.6869 5.76382 17.5888 5.88396 17.4897C5.90569 17.4716 5.93598 17.4678 5.96153 17.4792C9.88928 19.2725 14.1415 19.2725 18.023 17.4792C18.0485 17.4669 18.0788 17.4707 18.1015 17.4888C18.2216 17.5878 18.3475 17.6869 18.4742 17.7811C18.5177 17.8135 18.5149 17.8812 18.4676 17.9088C17.8697 18.2583 17.2482 18.5535 16.5945 18.8002C16.552 18.8163 16.533 18.8659 16.5538 18.9068C16.9143 19.6049 17.3258 20.2696 17.7789 20.9001C17.7978 20.9267 17.8319 20.9382 17.8631 20.9286C19.8241 20.322 21.8126 19.4068 23.8654 17.8992C23.8834 17.8859 23.8948 17.8659 23.8967 17.844C24.3971 12.6671 23.0585 8.17015 20.3482 4.18365C20.3416 4.17033 20.3303 4.1608 20.317 4.15509ZM8.02002 15.1165C6.8375 15.1165 5.86313 14.0308 5.86313 12.6976C5.86313 11.3643 6.8186 10.2786 8.02002 10.2786C9.23087 10.2786 10.1958 11.3738 10.1769 12.6976C10.1769 14.0308 9.22141 15.1165 8.02002 15.1165ZM15.9947 15.1165C14.8123 15.1165 13.8379 14.0308 13.8379 12.6976C13.8379 11.3643 14.7933 10.2786 15.9947 10.2786C17.2056 10.2786 18.1705 11.3738 18.1516 12.6976C18.1516 14.0308 17.2056 15.1165 15.9947 15.1165Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center md:justify-end pt-4">
            <Link href={routes.API} target="_blank">
              <Button className="rounded-3xl bg-gray-800 hover:bg-white hover:text-black border-screen w-full md:w-auto">
                <p className="text-sm">Request for APIs</p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
