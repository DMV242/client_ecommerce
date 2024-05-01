import { useParams } from 'react-router-dom';
import NavBar from '../components/Navigation/NavBar';
 
function Player() {
    const { id } = useParams();
 
    // Utilisez l'ID pour déterminer le texte à afficher
    let playerText;
    switch (id) {
        case '1':
            playerText = "Texte pour le joueur 1";
            break;
        case '2':
            playerText = "Texte pour le joueur 2";
            break;
        // Ajoutez plus de cas pour d'autres ID si nécessaire
        default:
            playerText = "Texte par défaut pour les autres joueurs";
            break;
    }
 
    return (
        <>
            <NavBar />
            <div>
                <h1>Player {id}</h1>
                <p>{playerText}</p>
            </div>
        </>
    );
}
 
export default Player;