import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  
  export function Navbar() {
    return (
      <nav className="fixed top-0 left-0 right-0 z-10 bg-blue-500 flex items-center">
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
                <BreadcrumbSeparator className="text-white mx-2">|</BreadcrumbSeparator>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <span className="text-white hover:text-gray-300">Home</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-white mx-2">/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">
                      <span className="text-white hover:text-gray-300">Components</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-white mx-2">/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white">Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </NavigationMenuList>
          </NavigationMenu>
      </nav>
    )
  }