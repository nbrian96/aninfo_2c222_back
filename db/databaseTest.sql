-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema psa
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema psa
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `psa` DEFAULT CHARACTER SET utf8 ;
USE `psa` ;

-- -----------------------------------------------------
-- Table `psa`.`tbl_proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_proyecto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `fecha_inicio` DATETIME NULL,
  `fecha_fin` DATETIME NULL,
  `estado` VARCHAR(45) NULL,
  `prioridad` VARCHAR(45) NULL,
  `costo_acumulado` INT NULL,
  `horas_estimadas` INT NULL,
  `horas_reales` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_tarea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_tarea` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_proyecto` INT NULL,
  `estado` VARCHAR(45) NULL,
  `descripcion` MEDIUMTEXT NULL,
  `horas_estimadas` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_proyecto_idx` (`id_proyecto` ASC) VISIBLE,
  CONSTRAINT `id_proyectot`
    FOREIGN KEY (`id_proyecto`)
    REFERENCES `psa`.`tbl_proyecto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_version`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_version` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `fecha_lanzamiento` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_producto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_version` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `fecha_lanzamiento` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `id_version_idx` (`id_version` ASC) VISIBLE,
  CONSTRAINT `id_version`
    FOREIGN KEY (`id_version`)
    REFERENCES `psa`.`tbl_version` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_tarea` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `descripcion` MEDIUMTEXT NULL,
  `severidad` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NULL,
  `fecha_emision` DATETIME NULL,
  `fecha_resolucion` DATETIME NULL,
  `tbl_ticketcol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `codigo_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `id_idx` (`id_tarea` ASC) INVISIBLE,
  INDEX `id_producto_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `id_tarea`
    FOREIGN KEY (`id_tarea`)
    REFERENCES `psa`.`tbl_tarea` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_productot`
    FOREIGN KEY (`id_producto`)
    REFERENCES `psa`.`tbl_producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_gerente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_gerente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `area` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_empleado` (
  `legajo` INT NOT NULL AUTO_INCREMENT,
  `id_gerente` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `apellido` VARCHAR(45) NULL,
  `cargo` VARCHAR(45) NULL,
  `antiguedad` INT NULL,
  PRIMARY KEY (`legajo`),
  INDEX `id_gerente_idx` (`id_gerente` ASC) VISIBLE,
  CONSTRAINT `id_gerente`
    FOREIGN KEY (`id_gerente`)
    REFERENCES `psa`.`tbl_gerente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_horas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_horas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `legajo_empleado` INT NOT NULL,
  `id_tarea` INT NOT NULL,
  `cant_horas` INT NULL,
  `fecha` DATETIME NULL,
  `estado` VARCHAR(45) NULL,
  `extra` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `legajo_empleado_idx` (`legajo_empleado` ASC) VISIBLE,
  INDEX `id_tarea_idx` (`id_tarea` ASC) VISIBLE,
  CONSTRAINT `legajo_empleado`
    FOREIGN KEY (`legajo_empleado`)
    REFERENCES `psa`.`tbl_empleado` (`legajo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_tareah`
    FOREIGN KEY (`id_tarea`)
    REFERENCES `psa`.`tbl_tarea` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_faltas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_faltas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `legajo_empleado` INT NOT NULL,
  `fecha` DATETIME NULL,
  `justificante` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `legajo_empleado_idx` (`legajo_empleado` ASC) VISIBLE,
  CONSTRAINT `legajo_empleadof`
    FOREIGN KEY (`legajo_empleado`)
    REFERENCES `psa`.`tbl_empleado` (`legajo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_licencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_licencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `legajo_empleado` INT NOT NULL,
  `tipo_licencia` INT NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  `fecha_inicio` DATETIME NULL,
  `fecha_fin` DATETIME NULL,
  `goce_sueldo` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `legajo_empleado_idx` (`legajo_empleado` ASC) VISIBLE,
  CONSTRAINT `legajo_empleadol`
    FOREIGN KEY (`legajo_empleado`)
    REFERENCES `psa`.`tbl_empleado` (`legajo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_guardia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_guardia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `legajo_empleado` INT NOT NULL,
  `fecha_inicio` DATETIME NULL,
  `fecha_fin` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `legajo_empleado_idx` (`legajo_empleado` ASC) VISIBLE,
  CONSTRAINT `legajo_empleadog`
    FOREIGN KEY (`legajo_empleado`)
    REFERENCES `psa`.`tbl_empleado` (`legajo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `id_producto_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `id_productoc`
    FOREIGN KEY (`id_producto`)
    REFERENCES `psa`.`tbl_producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_comentario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_ticket` INT NOT NULL,
  `titulo` VARCHAR(45) NULL,
  `descripcion` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_ticket_idx` (`id_ticket` ASC) VISIBLE,
  CONSTRAINT `id_ticketc`
    FOREIGN KEY (`id_ticket`)
    REFERENCES `psa`.`tbl_ticket` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_empleado_tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_empleado_tickets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_empleado` INT NOT NULL,
  `id_ticket` INT NOT NULL,
  `fecha_asignacion` VARCHAR(45) NULL,
  `comentario` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_ticket_idx` (`id_ticket` ASC) VISIBLE,
  INDEX `id_empleado_idx` (`id_empleado` ASC) VISIBLE,
  CONSTRAINT `id_empleado`
    FOREIGN KEY (`id_empleado`)
    REFERENCES `psa`.`tbl_empleado` (`legajo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_tickete`
    FOREIGN KEY (`id_ticket`)
    REFERENCES `psa`.`tbl_ticket` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_fase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_fase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_proyecto` INT NULL,
  `id_fase_anterior` INT NULL,
  `id_fase_siguiente` INT NULL,
  `descripcion` MEDIUMTEXT NULL,
  `fecha_inicio` DATETIME NULL,
  `fecha_fin_estimada` DATETIME NULL,
  `fecha_fin_real` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `id_proyectof_idx` (`id_proyecto` ASC) VISIBLE,
  INDEX `id_siguiente_idx` (`id_fase_siguiente` ASC) VISIBLE,
  INDEX `id_anterior_idx` (`id_fase_anterior` ASC) VISIBLE,
  CONSTRAINT `id_proyectof`
    FOREIGN KEY (`id_proyecto`)
    REFERENCES `psa`.`tbl_proyecto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_siguiente`
    FOREIGN KEY (`id_fase_siguiente`)
    REFERENCES `psa`.`tbl_fase` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_anterior`
    FOREIGN KEY (`id_fase_anterior`)
    REFERENCES `psa`.`tbl_fase` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `psa`.`tbl_iteracion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`tbl_iteracion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_fase` INT NOT NULL,
  `id_anterior` INT NULL,
  `id_siguiente` INT NULL,
  `descripcion` MEDIUMTEXT NULL,
  `fecha_inicio` DATETIME NULL,
  `fecha_fin` DATETIME NULL,
  `fecha_fin_real` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `id_fase_idx` (`id_fase` ASC) VISIBLE,
  INDEX `id_anteriori_idx` (`id_anterior` ASC) VISIBLE,
  INDEX `id_siguientei_idx` (`id_siguiente` ASC) VISIBLE,
  CONSTRAINT `id_fase`
    FOREIGN KEY (`id_fase`)
    REFERENCES `psa`.`tbl_fase` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_anteriori`
    FOREIGN KEY (`id_anterior`)
    REFERENCES `psa`.`tbl_iteracion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_siguientei`
    FOREIGN KEY (`id_siguiente`)
    REFERENCES `psa`.`tbl_iteracion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `psa` ;

-- -----------------------------------------------------
-- Placeholder table for view `psa`.`horas_tarea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`horas_tarea` (`id_tarea` INT, `SUM(cant_horas)` INT);

-- -----------------------------------------------------
-- Placeholder table for view `psa`.`horas_proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psa`.`horas_proyecto` (`id_tarea` INT, `id_proyecto` INT, `SUM(cant_horas)` INT);

-- -----------------------------------------------------
-- View `psa`.`horas_tarea`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `psa`.`horas_tarea`;
USE `psa`;
CREATE  OR REPLACE VIEW `horas_tarea` AS
SELECT
	id_tarea,
	SUM(cant_horas)
FROM
	tbl_horas
GROUP BY id_tarea;

-- -----------------------------------------------------
-- View `psa`.`horas_proyecto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `psa`.`horas_proyecto`;
USE `psa`;
CREATE  OR REPLACE VIEW `horas_proyecto` AS
SELECT
	id_tarea,
	tbl_tarea.id_proyecto,
	SUM(cant_horas)
FROM
	tbl_horas
JOIN tbl_tarea ON tbl_tarea.id = tbl_horas.id_tarea
GROUP BY id_proyecto;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
