export default function FilterButton({name, isPressed, setFilter}) {
    return (
        <button type="button" className={isPressed ? "px-4 btn rounded-lg bg-[#FF6161]  hover:bg-[#F00000] toggle-btn" : "btn px-4 rounded-lg bg-slate-200 hover:bg-slate-300 toggle-btn"} aria-pressed={isPressed} onClick={() => setFilter(name)}>
            <span>{name}</span>
        </button>
    )
}