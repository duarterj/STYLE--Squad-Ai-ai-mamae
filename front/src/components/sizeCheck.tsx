import { sizes } from "./componentsData/sizesData";
import { Checkbox } from "./ui/checkbox";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";



export default function SizeCheck() {


  return (
    <Field>
      <FieldGroup className="grid grid-cols-3 sm:gap-x-6 gap-x-12 gap-y-2">
        {sizes.map(({ size }) => (
          <Label key={size} className="flex items-center  cursor-pointer">
            <Checkbox
              className="rounded-full"
            />
            <span className="text-sm mr-[5px] ">{size}</span>
          </Label>
        ))}
      </FieldGroup>
    </Field>
  )
}