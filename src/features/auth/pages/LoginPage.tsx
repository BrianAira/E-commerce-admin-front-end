import { AuthForm } from "../../../components/ui/AuthForm";
import { Link } from "react-router"; // Asegúrate de que sea 'react-router-dom' si usas v6
import { useAuth } from "../hooks/useAuth";
import { LoadingComponent } from "../../../components/Layout/LoadingComponent";
import { Card, CardBody } from "@heroui/react";

export const LoginPage = () => {
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (data: Record<string, string>) => {
    await login({
      username: data.email, 
      password: data.password
    });
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    // bg-background se ajusta solo a blanco o negro según el tema
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 transition-colors duration-500">
      
      {/* Envolvemos el AuthForm en un Card para darle profundidad. 
        En modo oscuro, HeroUI le da un borde sutil muy pro. 
      */}
      <Card className="w-full max-w-md shadow-2xl border-none bg-content1">
        <CardBody className="p-8">
          <div className="flex flex-col gap-2 mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">Bienvenido a Mi Odisea</h1>
            <p className="text-small text-default-500">Introduce tus credenciales para gestionar la tienda</p>
          </div>

          <AuthForm
            onSubmit={handleLogin}
            submitLabel={isLoading ? "Iniciando sesión..." : "Entrar al Panel"}
            fields={[
              { name: "email", label: "Correo electrónico", type: "email" },
              { name: "password", label: "Contraseña", type: "password" },
            ]}
          />

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-danger-50 border border-danger-100">
              <p className="text-xs text-danger font-semibold text-center">{error}</p>
            </div>
          )}
        </CardBody>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm text-default-500">
          ¿No tienes cuenta de administrador?{" "}
          <Link to="/register" className="text-primary font-bold hover:underline transition-all">
            Solicitar acceso
          </Link>
        </p>
      </div>

      {/* Decoración sutil de fondo para quitar lo "plano" */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
    </div>
  );
};