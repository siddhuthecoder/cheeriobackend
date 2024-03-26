const students =[
  {
    "name": "VIGNESH",
    "idNumber": "N200813",
    "email": "n200813@rguktn.ac.in"
  },
  {
    "name": "DILEEP",
    "idNumber": "N200539",
    "email": "n200539@rguktn.ac.in"
  },
  {
    "name": "TARUN",
    "idNumber": "N200680",
    "email": "n200680@rguktn.ac.in"
  },
  {
    "name": "KVS. MANIDEEP",
    "idNumber": "N200677",
    "email": "n200677@rguktn.ac.in"
  },
  {
    "name": "K. PRIYANKA",
    "idNumber": "N200101",
    "email": "n200101@rguktn.ac.in"
  },
  {
    "name": "USHA SRI",
    "idNumber": "N200190",
    "email": "n200190@rguktn.ac.in"
  },
  {
    "name": "T.SAI CHOWSIKA",
    "idNumber": "N201O54",
    "email": "n201054@rguktn.ac.in"
  }
]




async function addId(idNumber, name, email) {
  const url = "https://cheeriobackend-v4ch.onrender.com/add-id"; // Assuming your server is running on the same domain
  const data = { idNumber, name, email };

  try {
    const response = await fetch(url, {
      method: "POST", // Use POST for creating data
      headers: { "Content-Type": "application/json" }, // Set content type for JSON data
      body: JSON.stringify(data), // Stringify the data object into JSON
    });

    if (!response.ok) {
      // Handle non-200 status codes (errors)
      const errorData = await response.json();
      // throw new Error(errorData.message || 'Failed to add ID');
      console.log(errorData);
    }

    const addedUser = await response.json();
    console.log("ID added successfully:", addedUser); // Handle successful response
  } catch (error) {
    console.error("Error adding ID:", error.message); // Handle errors
  }
}
(async () => {
  for (const student of students) {
    await addId(student.idNumber, student.name, student.email);
  }
})();
