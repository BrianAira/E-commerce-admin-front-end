import { useForm } from "@tanstack/react-form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React from "react";

interface Field {
  name: string;
  label: string;
  type?: string;
}

interface AuthFormProps {
  onSubmit: (data: Record<string, string>) => Promise<void>;
  fields: Field[];
  submitLabel: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  fields,
  submitLabel,
}) => {
  const form = useForm({
    defaultValues: Object.fromEntries(fields.map((f) => [f.name, ""])),
    onSubmit: async ({ value }) => {
      // Limpiamos los valores de espacios en blanco accidentales
      const cleanData = Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, v.trim()])
      );
      await onSubmit(cleanData);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      // Eliminamos bg-gray, shadow y rounded porque ya los provee el Card padre
      className="flex flex-col gap-5 w-full"
    >
      {fields.map((field) => (
        <form.Field key={field.name} name={field.name}>
          {(fieldApi) => (
            <div className="flex flex-col gap-1">
              <Input
                label={field.label}
                type={field.type || "text"}
                variant="bordered"
                labelPlacement="outside" // Se ve más moderno en paneles admin
                placeholder={`Introduce tu ${field.label.toLowerCase()}`}
                value={fieldApi.state.value}
                onBlur={fieldApi.handleBlur}
                onChange={(e) => fieldApi.handleChange(e.target.value)}
                // Clases de HeroUI para asegurar que el texto sea legible en Dark Mode
                classNames={{
                  label: "text-default-700 font-medium",
                  input: "text-small",
                  inputWrapper: [
                    "shadow-sm",
                    "border-default-200",
                    "focus-within:!border-primary",
                    "dark:border-default-100",
                    "dark:bg-default-50/5",
                  ],
                }}
              />
              {/* Espacio para validaciones futuras */}
              {fieldApi.state.meta.errors && (
                 <em className="text-[10px] text-danger ml-1">{fieldApi.state.meta.errors.join(', ')}</em>
              )}
            </div>
          )}
        </form.Field>
      ))}

      <Button 
        type="submit" 
        variant="solid" 
        color="primary" 
        fullWidth
        className="mt-2 font-bold shadow-lg shadow-primary/20"
        size="lg"
      >
        {submitLabel}
      </Button>
    </form>
  );
};