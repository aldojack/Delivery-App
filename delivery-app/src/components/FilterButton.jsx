export default function FilterButton({name, isPressed, setFilter}) {
    //Regular expression looks for any lowercase letter 
    //followed immediately by an uppercase letter and inserts a space between them
    const formattedName = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    return (
        <button type="button" className={isPressed ? "px-4 btn rounded-lg bg-[#FF6161]  hover:bg-[#F00000] toggle-btn ease-in duration-100" : "btn px-4 rounded-lg bg-slate-200 hover:bg-slate-300 toggle-btn"} aria-pressed={isPressed} onClick={() => setFilter(name)}>
            <span>{formattedName}</span>
        </button>
    )
}