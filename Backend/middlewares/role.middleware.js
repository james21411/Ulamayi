// Middleware de verification des roles
// S'utilise APRES le middleware d'authentification
// Verifie que l'utilisateur connecte a le bon role pour acceder a la route
// Exemple : autoriser('admin') bloque tous les non-admins avec une erreur 403

// On utilise ...roles pour accepter un ou plusieurs roles autorises
// Exemple d'appel : autoriser('admin') ou autoriser('eleve', 'enseignant')
const autoriser = (...rolesAutorises) => {
    return (req, res, next) => {
        // req.utilisateur a ete rempli par le middleware d'authentification juste avant
        const roleUtilisateur = req.utilisateur?.role;

        if (!roleUtilisateur || !rolesAutorises.includes(roleUtilisateur)) {
            return res.status(403).json({
                message: `Acces interdit : cette action est reservee aux ${rolesAutorises.join(', ')}.`,
            });
        }

        next();
    };
};

module.exports = { autoriser };
