import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { FaSignOutAlt, FaAngleRight } from "react-icons/fa";

import {
  Breadcrumb,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export function Navbar() {
  const handleLogout = () => {
    // Lakukan proses logout di sini
    console.log("Logout clicked");
  };

  return (
    <nav
      className="relative top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2"
      style={{ backgroundColor: "#2140AD" }}
    >
      <div className="flex items-center">
        {/* Logo */}
        <img
          src="/src/assets/logo/polban.png"
          alt="Polban Logo"
          className="w-12 h-12 mr-4"
        />

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/Home"
                className="block px-4 py-2 text-base font-medium text-white hover:text-black"
              >
                Coverage Test
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Breadcrumb className="flex items-center ml-4">
              <BreadcrumbSeparator className="text-white mx-2">
                |
              </BreadcrumbSeparator>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <span className="text-white hover:text-gray-300">
                      Topik Pengujian
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white mx-2">
                  <FaAngleRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">
                    <span className="text-white hover:text-gray-300">
                      Modul Program
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <a
        href="#"
        onClick={handleLogout}
        className="flex items-center text-white hover:text-gray-300 mr-8"
      >
        <FaSignOutAlt size={18} className="mr-2" />
        Kembali
      </a>
    </nav>
  );
}
