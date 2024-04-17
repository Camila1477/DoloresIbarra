
CREATE DATABASE formularioDB;


CREATE TABLE formulario (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    imagen  VARCHAR(200),
    descripcion VARCHAR(300) NOT NULL,
    inventario NUMERIC NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0,
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    titulo VARCHAR(100),
    desc_img VARCHAR(200),
    filename VARCHAR(100),
    path VARCHAR(100),
    originalname VARCHAR(100),
    mimetype VARCHAR(100),
    size NUMERIC  
);
