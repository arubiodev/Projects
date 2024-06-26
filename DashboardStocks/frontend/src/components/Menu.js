function Menu({active, setActive, setCategory}) {
    const links = [
        {id: 1, name: "General", value: "general"},
        {id: 2, name: "Forex", value: "forex"},
        {id: 3, name: "Crypto", value: "crypto"},
        {id: 4, name: "Merger", value: "merger"},
    ]
function onClick(id,value){
    setActive(id)
    setCategory(value)
}

return (
    <nav className="menu">
        <ul>
            {links.map(link => (
                <li
                key={link.id}
                className={active === link.id ? "active" : "inactive"}
                onClick = {()=> onClick(link.id, link.value)}>{link.name}</li>
            ))}
        </ul>
    </nav>
)
            }
            export default Menu
