// tasks.controllers.js

import { pool } from "../db.js";

export const getCompras = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM formulario ORDER BY createAt ASC"
    );

    res.render('../views/compras', {
      productos: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controlador de compra
export const comprarProducto = async (req, res) => {
  const { producto, cantidad } = req.body;

  try {
    // Verificar si hay suficiente inventario disponible
    const [productInfo] = await pool.query("SELECT inventario FROM formulario WHERE nombre = ?", [producto]);
    const inventarioDisponible = productInfo[0].inventario;

    if (inventarioDisponible < cantidad) {
      return res.status(400).json( `No hay en existencia el producto ${producto} ` );
    }

    // Descontar la cantidad comprada del inventario del producto
    await pool.query("UPDATE formulario SET inventario = inventario - ? WHERE nombre = ?", [cantidad, producto]);

    // Envía una respuesta exitosa
    res.status(200).json({ message: `Se compro ${cantidad} ${producto}(s)` });
  } catch (error) {
    // Si hay algún error en la base de datos u otro problema, envía un mensaje de error
    res.status(500).json({ message: error.message });
  }
};


export const agregar = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM formulario WHERE id NOT IN (SELECT producto_id FROM carrito) ORDER BY createAt ASC"
    );

    res.render('../views/agregar', {
      productos: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getTabla = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM formulario ORDER BY createAt ASC"
    );

    res.render('../views/tabla', {
      productos: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFormularios = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM formulario ORDER BY createAt ASC"
    );

    res.render('../views/productos', {
      productos: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFormulario = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM formulario WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "formulario not found" });

    res.render('../views/productos_edit', {
      productos: result[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFormulario = async (req, res) => {
  try {
    const { nombre, imagen, descripcion } = req.body;
    const { filename, originalname, mimetype, size } = req.file;
    const ruta = '/img/uploads/' + req.file.filename;

    // Insertar el nuevo producto en la base de datos
    await pool.query(
      "INSERT INTO formulario(nombre, imagen, descripcion, inventario, filename, originalname, mimetype, size, path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, imagen, descripcion, 1, filename, originalname, mimetype, size, ruta]
    );

 // Obtener el ID del producto recién insertado
 const [producto] = await pool.query("SELECT LAST_INSERT_ID() AS id");


    // Restar 1 al inventario del producto en la base de datos
    await pool.query("UPDATE formulario SET inventario = inventario -  WHERE id = ?", [
      req.params.id,
    ]);

    res.redirect('/compras');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateFormulario = async (req, res) => {
  try {
    await pool.query("UPDATE formulario SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    res.redirect('/tabla');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFormulario = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM formulario WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "formulario not found" });

    res.redirect('/tabla');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};