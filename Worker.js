const students =[
  
 {
  "name": "H. SAI",
  "idNumber": "n200957",
  "email": "n200957@rguktn.ac.in"
 },
 {
  "name": "M.Govidu",
  "idNumber": "n200686",
  "email": "n200686@rguktn.ac.in"
 },
 {
  "name": "L.Santhosh kumar",
  "idNumber": "n211023",
  "email": "n211023@rguktn.ac.in"
 },
 {
  "name": "V.RAMU",
  "idNumber": "n201102",
  "email": "n201102@rguktn.ac.in"
 },
 {
  "name": "U. JAGADEESHWARA RAO",
  "idNumber": "n201076",
  "email": "n201076@rguktn.ac.in"
 },
 {
  "name": "B.SOMEHS RAJU",
  "idNumber": "n200991",
  "email": "n200991@rguktn.ac.in"
 },
 {
  "name": "S.ADnAn SAMI",
  "idNumber": "n200963",
  "email": "n200963@rguktn.ac.in"
 },
 {
  "name": "D. AnAnD TEJA",
  "idNumber": "n200948",
  "email": "n200948@rguktn.ac.in"
 },
 {
  "name": "S.VEnKATESWAR RAO",
  "idNumber": "n200899",
  "email": "n200899@rguktn.ac.in"
 },
 {
  "name": "P. ABHIKYA PRAnAY",
  "idNumber": "n200893",
  "email": "n200893@rguktn.ac.in"
 },
 {
  "name": "M.DEVA PRASAD",
  "idNumber": "n200861",
  "email": "n200861@rguktn.ac.in"
 },
 {
  "name": "Harshitha",
  "idNumber": "n200776",
  "email": "n200776@rguktn.ac.in"
 },
 {
  "name": "B.ARUn KUMAR",
  "idNumber": "n200706",
  "email": "n200706@rguktn.ac.in"
 },
 {
  "name": "Harika",
  "idNumber": "n200620",
  "email": "n200620@rguktn.ac.in"
 },
 {
  "name": "M. AJAY KUMAR",
  "idNumber": "n200573",
  "email": "n200573@rguktn.ac.in"
 },
 {
  "name": "n. RAJESH CHOWDARY",
  "idNumber": "n200559",
  "email": "n200559@rguktn.ac.in"
 },
 {
  "name": "P.DRUGA ASHISH",
  "idNumber": "n200500",
  "email": "n200500@rguktn.ac.in"
 },
 {
  "name": "S K.  MOHMADD. KAIF",
  "idNumber": "n200460",
  "email": "n200460@rguktn.ac.in"
 },
 {
  "name": "n. SAI SATISH",
  "idNumber": "n200392",
  "email": "n200392@rguktn.ac.in"
 },
 {
  "name": "K.DEEPAK VARMA",
  "idNumber": "n200351",
  "email": "n200351@rguktn.ac.in"
 },
 {
  "name": "P.S. VAMSI",
  "idNumber": "n200346",
  "email": "n200346@rguktn.ac.in"
 },
 {
  "name": "M.J.SIDDARTHA",
  "idNumber": "n200237",
  "email": "n200237@rguktn.ac.in"
 },
 {
  "name": "C.VEnKATESWARLU",
  "idNumber": "n200059",
  "email": "n200059@rguktn.ac.in"
 },
 {
  "name": "A.V.GAnESH",
  "idNumber": "n200050",
  "email": "n200050@rguktn.ac.in"
 },
 {
  "name": "n.ABHI RAM",
  "idNumber": " n200211",
  "email": "n200211@rguktn.ac.in"
 },
 {
  "name": "T.SAI CHOWSIKA",
  "idNumber": "n201054",
  "email": "n201054@rguktn.ac.in"
 },
 {
  "name": "VIGnESH",
  "idNumber": "n200813",
  "email": "n200813@rguktn.ac.in"
 },
 {
  "name": "TARUn",
  "idNumber": "n200680",
  "email": "n200680@rguktn.ac.in"
 },
 {
  "name": "KVS. MAnIDEEP",
  "idNumber": "n200677",
  "email": "n200677@rguktn.ac.in"
 },
 {
  "name": "DILEEP",
  "idNumber": "n200539",
  "email": "n200539@rguktn.ac.in"
 },
 {
  "name": "USHA SRI",
  "idNumber": "n200190",
  "email": "n200190@rguktn.ac.in"
 },
 {
  "name": "K. PRIYAnKA",
  "idNumber": "n200101",
  "email": "n200101@rguktn.ac.in"
 }
]




 var count=0;
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
    console.error("Error adding ID:", error.message);  // Handle errors
    console.log(++count);
  }
}
(async () => {
  for (const student of students) {
    await addId(student.idNumber, student.name, student.email);
  }
})();
