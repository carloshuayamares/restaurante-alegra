const capitalizeFirstLetter = (str) => {
    if (!str) return ''; // Si el string está vacío, retornamos una cadena vacía
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = {
    capitalizeFirstLetter,
}
