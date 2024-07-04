document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cedula = document.getElementById('cedula').value;
    const apellidos = document.getElementById('apellidos').value;
    const nombres = document.getElementById('nombres').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    if (!validateCedula(cedula)) {
        alert('Cédula inválida');
        return;
    }

    if (!validateTelefono(telefono)) {
        alert('Teléfono inválido');
        return;
    }

    if (!validateEmail(correo)) {
        alert('Correo electrónico inválido');
        return;
    }

    const clientData = {
        cedula,
        apellidos,
        nombres,
        direccion,
        telefono,
        correo
    };

    // Obtener datos existentes del almacenamiento local
    const existingData = JSON.parse(localStorage.getItem('clientData')) || [];

    // Verificar si la cédula o el correo ya existen en los datos almacenados
    const duplicateData = existingData.find(client => client.cedula === cedula || client.correo === correo);
    if (duplicateData) {
        alert('Los datos ya existen en el sistema');
        return;
    }

    // Agregar los nuevos datos al array existente
    existingData.push(clientData);

    // Guardar los datos actualizados en el almacenamiento local
    localStorage.setItem('clientData', JSON.stringify(existingData));

    alert('Datos guardados exitosamente');
    document.getElementById('clientForm').reset();
});

function validateCedula(cedula) {
    const cedulaRegex = /^\d{10}$/;
    return cedulaRegex.test(cedula);
}

function validateTelefono(telefono) {
    const telefonoRegex = /^\d{10}$/;
    return telefonoRegex.test(telefono);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
