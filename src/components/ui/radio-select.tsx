import React, { forwardRef } from "react";

type RadioSelectProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  children: React.ReactNode;
};

const RadioSelect = forwardRef<HTMLInputElement, RadioSelectProps>(
  ({ children, ...props }, ref) => {
    return (
      <label className="cursor-pointer">
        <input type="radio" className="hidden peer" ref={ref} {...props} />
        <div className="px-4 py-2 border rounded-md peer-checked:bg-active peer-checked:text-white bg-secondary drop-shadow-sm">
          {children}
        </div>
      </label>
    );
  },
);

RadioSelect.displayName = "RadioSelect";

export default RadioSelect;
