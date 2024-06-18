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
  
  const updateForm = async(req, res) => {
    res.render("update", {
      title: "Update Page",
      
    });
  };
  
  const admin = async(req, res) => {
    res.render("admin", {
      title: "Admin Page",
      
    });
  };

export const controller = {
  home,
  notFound,
  about,
  contactForm,
  loginForm,
  registerForm,
  updateForm,
  admin
};
