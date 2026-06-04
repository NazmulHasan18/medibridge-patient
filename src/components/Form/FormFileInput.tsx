import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FormFileInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  accept?: string;
  formDescription?: string;
  className?: string;
};

const FormFileInput = <T extends FieldValues>({
  form,
  name,
  label,
  accept,
  formDescription,
  className,
}: FormFileInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ref, name: fieldName, onBlur } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              ref={ref}
              name={fieldName}
              onBlur={onBlur}
              type="file"
              accept={accept}
              className={clsx(
                "h-auto cursor-pointer border-blue-400 rounded-full px-5 py-3 focus-visible:outline-blue-400 focus-visible:ring-0 hover:bg-gray-200",
                className,
              )}
              onChange={(event) => onChange(event.target.files?.[0])}
            />
          </FormControl>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFileInput;
