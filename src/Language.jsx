import react from "react"

export default function Language(props){

    const styles = {
        backgroundColor: `${props.backgroundColor}`,
        color: `${props.color}`,
    }

    return(
        <div>
            <p className="language-child"  style={styles}>{props.name}</p>
        </div>
    )
}