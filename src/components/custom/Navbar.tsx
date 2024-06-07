import React, { useState, useEffect } from "react";
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

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const modulId = import.meta.env.VITE_MODULE_ID;

export function Navbar() {
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    const fetchModuleName = async () => {
      try {
        const response = await fetch(`${apiUrl}/modul/detail/${modulId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("Forbidden: Access is denied");
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        setModuleName(data.data.data_modul.ms_nama_modul); // Assuming the API response has a `name` field
        console.log(data)
      } catch (error) {
        console.error("Error fetching module name:", error);
      }
    };

    fetchModuleName();
  }, []);

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
                className="block px-4 py-2 text-xl font-medium text-white hover:text-black"
              >
                Coverage Test
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Breadcrumb className="flex items-center ml-4">
              <BreadcrumbSeparator className="text-white text-xl mx-2">
                |
              </BreadcrumbSeparator>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <span className="text-white text-l hover:text-gray-300">
                      Topik Pengujian
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white text-xl mx-2">
                  <FaAngleRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">
                    <span className="text-white hover:text-gray-300">
                      {moduleName || "Modul Program"}
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
