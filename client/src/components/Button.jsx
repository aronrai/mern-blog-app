const Button = ({ button, disabled, onclick }) => {
  return (
    <button
      className={`text-sm text-white px-4 py-2 w-fit rounded-sm cursor-pointer ${disabled ? "bg-gray-500 shadow-[0_2px_4px] shadow-gray-500" : "bg-black shadow-[0_2px_4px] shadow-black hover:shadow-[0_4px_8px] hover:-translate-y-0.5 active:shadow[0_2px_4px] active:translate-y-0"} transition-all duration-150 ease-in-out`}
      onClick={onclick}
      disabled={disabled}
    >
      {button}
    </button>
  );
};

export default Button;
