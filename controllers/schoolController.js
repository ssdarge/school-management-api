const getAllSchools = (req, res) => {
  res.send("all schools");
};

const createSchool = (req, res) => {
  res.send("school created");
};

export { getAllSchools, createSchool };
