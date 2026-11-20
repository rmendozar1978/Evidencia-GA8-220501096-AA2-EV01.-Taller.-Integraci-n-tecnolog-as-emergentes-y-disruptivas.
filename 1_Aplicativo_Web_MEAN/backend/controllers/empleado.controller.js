const Empleado = require('../models/empleado');
const mongoose = require('mongoose');

const empleadoCtrl = {};

// Almacén en memoria auxiliar en caso de que MongoDB local no esté iniciado
let memoriaEmpleados = [
    { _id: "60d2aeaa21a176987f0157485", name: "Santiago Muñoz", position: "Experto Temático", office: "Popayán", salary: 3500 },
    { _id: "60d64392eadf31b1d99e64f4", name: "María Isabel", position: "Instructora", office: "Cali", salary: 3000 },
    { _id: "60d2aeaa21a176987f0157487", name: "Julian Gómez", position: "Ingeniero de Software", office: "Medellín", salary: 5000 }
];

// Obtener todos los empleados (GET /api/empleados)
empleadoCtrl.getEmpleados = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const empleados = await Empleado.find();
            return res.json(empleados);
        } else {
            return res.json(memoriaEmpleados);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Crear nuevo empleado (POST /api/empleados)
empleadoCtrl.createEmpleados = async (req, res) => {
    try {
        const { name, position, office, salary } = req.body;
        if (mongoose.connection.readyState === 1) {
            const empleado = new Empleado({ name, position, office, salary });
            await empleado.save();
            return res.json({ status: 'Empleado guardado', empleado });
        } else {
            const nuevo = {
                _id: "id_" + Date.now(),
                name: name || "Sin nombre",
                position: position || "Sin cargo",
                office: office || "Sin sede",
                salary: Number(salary) || 0
            };
            memoriaEmpleados.push(nuevo);
            return res.json({ status: 'Empleado guardado', empleado: nuevo });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Conseguir un único empleado (GET /api/empleados/:id)
empleadoCtrl.getUnicoEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongoose.connection.readyState === 1) {
            const empleado = await Empleado.findById(id);
            return res.json(empleado);
        } else {
            const empleado = memoriaEmpleados.find(e => e._id === id);
            return res.json(empleado || { error: 'No encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Actualizar empleado (PUT /api/empleados/:id)
empleadoCtrl.editarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleadoEdit = {
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        };
        if (mongoose.connection.readyState === 1) {
            await Empleado.findByIdAndUpdate(id, { $set: empleadoEdit }, { new: true });
            return res.json({ status: 'Empleado Actualizado' });
        } else {
            const idx = memoriaEmpleados.findIndex(e => e._id === id);
            if (idx !== -1) {
                memoriaEmpleados[idx] = { ...memoriaEmpleados[idx], ...empleadoEdit };
            }
            return res.json({ status: 'Empleado Actualizado' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Eliminar empleado (DELETE /api/empleados/:id)
empleadoCtrl.eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongoose.connection.readyState === 1) {
            await Empleado.findByIdAndDelete(id);
            return res.json({ status: 'Empleado Eliminado' });
        } else {
            memoriaEmpleados = memoriaEmpleados.filter(e => e._id !== id);
            return res.json({ status: 'Empleado Eliminado' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = empleadoCtrl;
