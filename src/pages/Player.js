import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/Navigation/NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Snackbar, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import "./Player.css";


function Player() {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isCommand, setIsCommand] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlayerData(id);
    }, [id]);

    const fetchPlayerData = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/player/${id}`);
            if (response.status !== 200) {
                throw new Error('Erreur lors de la récupération des données');
            }
            setPlayer(response.data.player);
            setIsLoading(false);

        } catch (error) {
            console.error('Erreur:', error);
            setIsLoading(false);
        }
    };

    const handleFinalisezCommande = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Vous devez vous connecter pour commander");
                navigate("/login");
                return;

            }
            const response = await axios.post(
                'http://localhost:8000/player/commander',
                {
                    message: message,
                    playerId: player._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                setSnackbarOpen(true);
                setIsCommand(false);
                setMessage("");
            } else {
                throw new Error('Erreur lors de la finalisation de la commande');
            }
        } catch (error) {
            console.error('Erreur lors de la finalisation de la commande:', error.message);
            alert('Erreur lors de la finalisation de la commande. Veuillez réessayer.');
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div id='player-page'>
            <NavBar />
            {isLoading ? (
                <p>Chargement...</p>
            ) : player ? (
                <div className="player-container">
                    <div className="player-info">
                        <h1><strong>{player.firstName.toUpperCase()}{" "}{player.lastName.toUpperCase()}</strong></h1>
                        {!isCommand && <div className="text-container">
                            <p>{player.description}</p>
                        </div>}
                    </div>
                    <div className="card">
                        <div className="bg">
                            {player.image && <img src={player.image} alt={player.lastName} className="player-image" />}
                        </div>
                        <div className="blob"></div>
                    </div>
                </div>
            ) : (
                <p>Aucun joueur trouvé.</p>
            )}

            {!isCommand && !isLoading && (
                <div className="custom-button-commander custom-button-1" onClick={() => setIsCommand(true)}>
                    Faites parler ce joueur !!!
                </div>
            )}

            {isCommand && !isLoading && (
                <>
                    <textarea className='custom-input' rows={10} value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    <div className="custom-button-finaliser custom-button-1" onClick={handleFinalisezCommande}>Finaliser la commande</div>
                    <div className="custom-button-annuler custom-button-2" onClick={() => setIsCommand(false)}>
                        Annuler
                    </div>
                </>
            )}

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Commande effectuée avec succès!"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <Close fontSize="small" />
                    </IconButton>
                }
                severity="success" // Ajout de la sévérité pour un message de succès
            />
        </div>
    );
}

export default Player;
