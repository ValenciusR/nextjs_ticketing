export default async function cityHandler(req, res) {
  try {
    const response = await fetch("https://ota-gin.onrender.com/api/v1/cities");
    const data = await response.json();
    console.log("🚀 ~ cityHandler ~ data:", data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cities", error });
  }
}
