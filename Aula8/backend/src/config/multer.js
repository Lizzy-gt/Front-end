const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const baseDir = "uploads";
    let subFolder = "";

    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === ".png") {
      subFolder = "pngFiles";
    } else if (ext === ".pdf") {
      subFolder = "pdfFiles";
    } else if (ext === ".jpg" || ext === ".jpeg") {
      subFolder = "jpgFiles";
    } else {
      subFolder = "otherFiles";
    }
    //Vai realizar a validação de cada um

    const uploadDir = path.join(__dirname, "..", baseDir, subFolder);

    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const nome = Date.now() + "-" + file.originalname;

    cb(null, nome);
  },
});

const upload = multer({ storage });

module.exports = upload;
