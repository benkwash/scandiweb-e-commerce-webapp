import clsx from 'clsx';

import './Button.css';

function Button({
   children,
   type = 'button',
   onClick = () => {},
   variant = 'primary',
   disabled = false
}) {
   return (
      <button
         type={type}
         onClick={() => onClick()}
         className={clsx('reusable-btn', 'cursor-pointer', variant, {
            disabled
         })}
         disabled={disabled}
      >
         {children}
      </button>
   );
}

function PrimaryButton({ children, ...rest }) {
   return (
      <Button variant="primary" {...rest}>
         {children}
      </Button>
   );
}

function SecondaryButton({ children, ...rest }) {
   return (
      <Button variant="secondary" {...rest}>
         {children}
      </Button>
   );
}

export { Button as default, PrimaryButton, SecondaryButton };
