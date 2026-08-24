import { Checkbox } from "./checkbox";
import { Field, FieldGroup } from "./field";
import { Label } from "./label";



type SizeCheckProps = {
  listaTamanhos: { size: string }[];
  selecionado?: string;
  aoMudar: (size: string, checked: boolean | "indeterminate") => void;
};

export default function SizeCheck({
  listaTamanhos,
  selecionado,
  aoMudar,
}: SizeCheckProps) {

  return (
    <Field>
      <FieldGroup className="grid grid-cols-3 sm:gap-x-6 gap-x-12 gap-y-2">
        {listaTamanhos.map(({ size }) => {
          const estaAtivo = selecionado === size;

          return (
            <Label key={size} className="flex items-center cursor-pointer">
              <Checkbox
                className="rounded-full"
                checked={estaAtivo}
                onCheckedChange={(checked) => aoMudar(size, checked)}
              />
              <span className="text-sm ml-2">{size}</span>
            </Label>
          );
        })}
      </FieldGroup>
    </Field>
  )
}