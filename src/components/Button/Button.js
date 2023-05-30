import clsx from 'clsx';

import './Button.css';

function Button({
   name,
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
         {name}
      </button>
   );
}

export default Button;
