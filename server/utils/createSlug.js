const crypto = require("crypto");

const createSlug = (title) => {
  const base = title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
  return `${base}-${crypto.randomBytes(4).toString("hex")}`;
};

module.exports = createSlug;
