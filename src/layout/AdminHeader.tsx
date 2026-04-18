import { 
  Badge, Button, Divider, Dropdown, DropdownItem, 
  DropdownMenu, DropdownTrigger, Navbar, NavbarContent, 
  NavbarItem, User 
} from "@heroui/react";
import { FiBell, FiSun, FiMoon, FiMonitor, FiLogOut } from "react-icons/fi";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useSelector } from "react-redux";
import { useTheme } from "../features/settings/hooks/useTheme"; // Ajusta la ruta
import type { RootState } from "../store/store";

export const AdminHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { logoutUser } = useAuth();
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <Navbar 
      isBordered 
      maxWidth="xl" 
      // bg-white/70 en light y bg-default-50/70 en dark para que no sea negro puro
      className="h-16 bg-white/70 dark:bg-[#121212]/70 backdrop-blur-md sticky top-0 z-50 border-divider transition-colors duration-300"
    >
      <NavbarContent justify="start">
        <NavbarItem>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold leading-none text-foreground tracking-tight">
              Panel de control <span className="text-primary text-[10px] font-bold ml-1 uppercase"></span>
            </h2>
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2 sm:gap-4">
        {/* Selector de Tema: El toque pro */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            radius="full"
            size="sm"
            onPress={toggleTheme}
            className="text-default-500 hover:bg-default-100 dark:hover:bg-neutral-800"
          >
            {theme === 'light' && <FiSun size={18} />}
            {theme === 'dark' && <FiMoon size={18} />}
            {theme === 'system' && <FiMonitor size={18} />}
          </Button>
        </NavbarItem>

        {/* Notificaciones */}
        <NavbarItem>
          <Badge color="danger" content="2" size="sm" shape="circle" variant="flat">
            <Button
              isIconOnly
              variant="light"
              radius="full"
              size="sm"
              className="text-default-500 hover:bg-default-100 dark:hover:bg-neutral-800"
            >
              <FiBell size={20} />
            </Button>
          </Badge>
        </NavbarItem>

        <Divider orientation="vertical" className="h-6 mx-1 opacity-50" />

        {/* Usuario */}
        <NavbarItem>
          <Dropdown placement="bottom-end" backdrop="transparent">
            <DropdownTrigger>
              <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-full hover:bg-default-100 dark:hover:bg-neutral-800 transition-all border border-transparent hover:border-default-200 dark:hover:border-neutral-700">
                <User
                  as="button"
                  name=""
                  description=""
                  
                  // avatarProps={{
                  //   src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                  //   size: "sm",
                  //   isBordered: true,
                  //   color: "primary",
                  //   className: "w-8 h-8 flex-shrink-0"
                  // }}
                />
                <div className="hidden md:flex flex-col items-start leading-none">
                  <span className="text-xs font-bold text-foreground">
                    {user?.username || "Admin"}
                  </span>
                  <span className="text-[9px] text-primary font-bold uppercase tracking-tighter mt-1">
                    {user?.role || "Manager"}
                  </span>
                </div>
              </div>
            </DropdownTrigger>
            
            <DropdownMenu 
              aria-label="User actions" 
              variant="flat"
              className="p-2"
            >
              <DropdownItem key="profile" className="h-14 gap-2 opacity-100 cursor-default" isReadOnly>
                <p className="text-[10px] uppercase text-default-400 font-bold">Sesión iniciada como</p>
                <p className="font-semibold text-default-700 dark:text-default-900">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings" showDivider textValue="Configuración">Configuración</DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger" 
                className="text-danger"
                description="Cerrar sesión de forma segura"
                onPress={logoutUser}
                startContent={<FiLogOut size={16} />}
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};