const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    // Password: "password123"
    password: "$2b$10$VW5wYHoBHj/2GVkc1hWFw.yOQwz8YtTeKCol3yVMbk6pJleGgLq0u"
  },
  {
    id: 2,
    name: "Juan Pérez",
    email: "juan@example.com",
    // Password: "juan123"
    password: "$2b$10$G/FzSCHIFvrpMcp1tF9e2Ooap/ABT1lQlDCdgmzLQCwhcQ0WBLUGG"
  },
  {
    id: 3,
    name: "María García",
    email: "maria@example.com",
    // Password: "maria123"
    password: "$2b$10$DvyNxr..a4ficIADJfcPkOlS4RqkdKe17jOgBAt56eQJkDeanfigG"
  }
];

module.exports = users;