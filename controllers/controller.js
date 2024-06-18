import { models } from "../models/queries.js";
import { check, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const home = (req, res) => {
  res.render("home", {
    title: "Home",
  });
};

const about = (req, res) => {
  res.render("about", {
    title: "About",
  });
};

const contactForm = (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
};

const notFound = (req, res) => {
  res.render("404", {
    title: "404",
  });
};

const loginForm = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const registerForm = (req, res) => {
  res.render("register", {
    title: "Register Page",
  });
};

const updateForm = async (req, res) => {
  res.render("update", {
    title: "Update Page",
  });
};

const admin = async (req, res) => {
  res.render("admin", {
    title: "Admin Page",
  });
};

const register = async (req, res) => {
  const {
    name,
    email,
    experience,
    especialty,
    password,
    confirm_password,
    
  } = req.body;
  try {
    //verificar los campos
    await check("name")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .run(req);
    await check("email")
      .notEmpty()
      .withMessage("El email es obligatorio")
      .run(req);
    await check("experience")
      .notEmpty()
      .withMessage("La experiencia es obligatoria")
      .run(req);
    await check("especialty")
      .notEmpty()
      .withMessage("La especialidad es obligatoria")
      .run(req);
    await check("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe ser de al menos 6 caracteres")
      .run(req);
    await check("confirm_password")
      .equals(password)
      .withMessage("La contraseña no coinciden")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("register", {
        title: "Register Page",
        errors: errors.array(),
        old: req.body,
      });
    }

    //Creamos la ruta para la imagen
    const { image } = req.files;

    const imageName = uuidv4().slice(0, 8);
    const imageUrl = `/uploads/${imageName}.png`;

    image.mv(`./public/uploads/${imageName}.png`);

    //Verificar que no exista el usuario
    const user = await models.findOneByEmail(email);
    if (user) {
      return res.render("register", {
        title: "Register Page",
        errors: [{ msg: "El usuario ya existe" }],
        old: req.body,
      });
    }

    //Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Guardar el usuario
    const response = await models.register({
      name,
      email,
      experience,
      especialty,
      password: hashedPassword,
      image: imageUrl,
    });

    res.status(201).redirect("/login");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const controller = {
  home,
  about,
  contactForm,
  notFound,
  loginForm,
  registerForm,
  updateForm,
  admin,
  register,
  
};
