
export const mockLoginResponses = {
  user: {
    data: {
      user: { fullname: "Josh", email: "user@example.com" },
      token: "user-token",
      role: "student",
    },
    message: "User logged in successfully",
  },
  tutor: {
    data: {
      user: { fullname: "Jane Tutor", email: "tutor@example.com" },
      token: "tutor-token",
      role: "tutor",
    },
    message: "Tutor logged in successfully",
  },
  admin: {
    data: {
      user: { fullname: "Admin", email: "admin@example.com" },
      token: "admin-token",
      role: "admin",
    },
    message: "Admin logged in successfully",
  },
};
