const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToMongoDB = require("./connections/mongoDbAtlas");
const UserRoutes = require("./routes/user");
const ProjectRoutes = require("./routes/project");
const EpisodeRoutes = require("./routes/episode");
const { verifyUserAuthentication } = require("./middleware/authentication");

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ message: "Here is your data" });
});

app.use("/user", UserRoutes);
app.use("/project", verifyUserAuthentication, ProjectRoutes);
// app.use("/project", ProjectRoutes);
app.use("/project/:projectId/episode", verifyUserAuthentication, EpisodeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

async function init() {
  await connectToMongoDB();
  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}

init();
