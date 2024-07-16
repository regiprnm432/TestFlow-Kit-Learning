import { useState, useEffect } from "react";
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
  // BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import logo_polban from "../../assets/logo/polban.png";
import logo_default from "../../assets/logo/default.png";
import { useNavigate } from "react-router-dom";



export function Navbar() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  let apiKey = import.meta.env.VITE_API_KEY;
  // const modulId = import.meta.env.VITE_MODULE_ID;
  const sessionData = localStorage.getItem('session')
  if (sessionData != null){
      const session = JSON.parse(sessionData);
      apiKey = session.token
  }
  const queryParameters = new URLSearchParams(window.location.search)
  const modulId = queryParameters.get("topikModulId")
  const [moduleName, setModuleName] = useState("");
  const [idTopik, setIdTopik] = useState("");
  const [topicName, setTopicName] = useState("");
  const linkTopikModul = "/topikModul?topikModulId="+modulId

  const fetchModuleName = async () => {
    try {
      const response = await fetch(`${apiUrl}/modul/detailByIdTopikModul/${modulId}`, {
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
      console.log("data module name :", data);
      setModuleName(data.data.data_modul.ms_nama_modul); // Assuming the API response has a `name` field
      setIdTopik(data.id_topik)
      console.log("topik id:", data.id_topik);

    } catch (error) {
      console.error("Error fetching module name:", error);
    }
  };
  const fetchTopicName = async () => {
    try {
      const response = await fetch(`${apiUrl}/topik/getDetailData?id_topik=${idTopik}`, {
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
      setTopicName(data.data.ms_nama_topik);
      console.log("data topic name :", data.data.ms_nama_topik);
    } catch (error) {
      console.error("Error fetching module name:", error);
    }
  };
  
  useEffect(() => {
    fetchModuleName();
  }, [apiUrl, apiKey, modulId]);

  useEffect(() => {
    if (idTopik) {
      fetchTopicName();
    }
  }, [idTopik, apiUrl, apiKey]);

  const handleBack = () => {
    // navigate("/list-challanges?idTopik="+idTopik);
    navigate(-1)
  };

  return (
    <nav
      className="relative top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2"
      style={{ backgroundColor: "#2140AD" }}
    >
      <div className="flex items-center">
        {/* Logo */}
        <img
          src={logo_polban}
          alt="Polban Logo"
          className="w-12 h-12 mr-4"
        />
         <img
          src={logo_default}
          alt="App Logo"
          className="w-9 h-9"
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
                  <BreadcrumbLink href={linkTopikModul}>
                    <span className="text-white text-l hover:text-gray-300">
                      {topicName || "Topik Pengujian"}
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
        onClick={handleBack}
        className="flex items-center text-white hover:text-gray-300 mr-8"
      >
        <FaSignOutAlt size={18} className="mr-2" />
        Kembali
      </a>
    </nav>
  );
}
