const Button = ({ button, disabled, onclick }) => {
  return (
    <button
      className="text-sm text-white bg-black px-4 py-2 w-fit rounded-2xl cursor-pointer shadow-[0_2px_4px_black] hover:shadow-[0_4px_8px_black] hover:-translate-y-1 active:shadow-[0_2px_2px_black] active:translate-y-0 transition-all duration-150 ease-in-out disabled:hover:translate-y-0 disabled:hover:shadow-[0_2px_4px_black] disabled:active:translate-y-0 disabled:active:shadow-[0_2px_4px_black] disabled:bg-gray-500 disabled:shadow-gray-500"
      onClick={onclick}
      disabled={disabled}
    >
      {button}
    </button>
  );
};

export default Button;
