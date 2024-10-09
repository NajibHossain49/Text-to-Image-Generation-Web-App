// Function to query Hugging Face API for text-to-image generation
async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
    {
      headers: {
        Authorization: "Bearer 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", // Your API token
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

// Function to handle form submission
document
  .getElementById("text-to-image-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from submitting in the default way

    const inputText = document.getElementById("input-text").value;
    const resultContainer = document.querySelector(".image-container");

    // Show a loading message while the image is being generated
    resultContainer.innerHTML = "<p>Generating image...</p>";

    try {
      // Send the text to the API and get the image
      const imageBlob = await query({ inputs: inputText });
      const imageUrl = URL.createObjectURL(imageBlob);

      // Display the generated image
      resultContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image" />`;
    } catch (error) {
      // Handle any errors
      console.error("Error generating image:", error);
      resultContainer.innerHTML =
        "<p>There was an error generating the image. Please try again.</p>";
    }
  });
