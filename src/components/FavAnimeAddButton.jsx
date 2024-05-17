//main add anime entry button component
export default function FavAnimeAddButton({ onClick }) {
    return (
        <tr>
            <td></td>
            <td colSpan="4">
                <button onClick={onClick}>Add</button>
            </td>
        </tr> 
    )
}