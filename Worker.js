const students = [
    // {
    //   "name": "CH. LAVANYA",
    //   "idNumber": "N200094",
    //   "mail": "n200094@rguktn.ac.in"
    // },
    // {
    //   "name": "M. SANGEETHA",
    //   "idNumber": "N200348",
    //   "mail": "n200348@rguktn.ac.in"
    // },
    // {
    //   "name": "V.A.K. VAMSITHA",
    //   "idNumber": "N200683",
    //   "mail": "n200683@rguktn.ac.in"
    // },
    // {
    //   "name": "T. SHALINI",
    //   "idNumber": "N200029",
    //   "mail": "n200029@rguktn.ac.in"
    // },
    // {
    //   "name": "P. SWAPNA",
    //   "idNumber": "N200784",
    //   "mail": "n200784@rguktn.ac.in"
    // },  
    // {
    //   "name": "K.TEJA SRI",
    //   "idNumber": "N200375",
    //   "mail": "n200375@rguktn.ac.in"
    // },
    // {
    //   "name": "B.TEJA",
    //   "idNumber": "N200521",
    //   "mail": "n200521@rguktn.ac.in"
    // },
    // {
    //   "name": "K.KUSUMA PRIYA",
    //   "idNumber": "N200522",
    //   "mail": "n200522@rguktn.ac.in"
    // },
    // {
    //   "name": "P. SOWJANYA",
    //   "idNumber": "N200450",
    //   "mail": "n200450@rguktn.ac.in"
    // },
    // {
    //   "name": "L. KALYAN",
    //   "idNumber": "N200329",
    //   "mail": "n200329@rguktn.ac.in"
    // },
    // {
    //   "name": "S. PRADEEP",
    //   "idNumber": "N201023",
    //   "mail": "n201023@rguktn.ac.in"
    // },
    // {
    //   "name": "S. DILEEP",
    //   "idNumber": "N200791",
    //   "mail": "n200791@rguktn.ac.in"
    // },
    // {
    //   "name": "K.MOHAN KUMAR",
    //   "idNumber": "N200394",
    //   "mail": "n200394@rguktn.ac.in"
    // },
    // {
    //   "name": "B.V.P SIDDARDHA",
    //   "idNumber": "N200426",
    //   "mail": "n200426@rguktn.ac.in"
    // },
    // {
    //   "name": "S. AKHIL",
    //   "idNumber": "N200145",
    //   "mail": "n200145@rguktn.ac.in"
    // },
    // {
    //   "name": "B. BHARGAV",
    //   "idNumber": "N200663",
    //   "mail": "n200663@rguktn.ac.in"
    // },
    // {
    //   "name": "PRABHAS",
    //   "idNumber": "N200738",
    //   "mail": "n200738@rguktn.ac.in"
    // },
    // {
    //   "name": "NOOR BHASA",
    //   "idNumber": "N200750",
    //   "mail": "n200750@rguktn.ac.in"
    // },
    // {
    //   "name": "N. GANESH NAIK",
    //   "idNumber": "N201002",
    //   "mail": "n201002@rguktn.ac.in"
    // },
    // {
    //   "name": "G. SATHISH ROY",
    //   "idNumber": "N200298",
    //   "mail": "n200298@rguktn.ac.in"
    // },
    // {
    //   "name": "G. DILEEP REDDY",
    //   "idNumber": "N200947",
    //   "mail": "n200947@rguktn.ac.in"
    // },
    // {
    //   "name": "J. LEELA SAI",
    //   "idNumber": "N200065",
    //   "mail": "n200065@rguktn.ac.in"
    // },
    // {
    //   "name": "M. DHEERAJ",
    //   "idNumber": "N200800",
    //   "mail": "n200800@rguktn.ac.in"
    // },
    // {
    //   "name": "H. SAI",
    //   "idNumber": "N200957",
    //   "mail": "n200957@rguktn.ac.in"
    // },
    {
      "name": "Y. Siddrhu",
      "idNumber": "N200081asdasewasaddasfesddddfsdssaasdsafrfsdas",
      "email": "siddarthyernagula@gmail.com"
    },
    {
      "name": "Y. Siddrhu",
      "idNumber": "N200081asasewassaddasdddssfdssdsadaasdsafrfsdas",
      "email": "siddarthyernagula2004@gmail.com"
    },
    // {
    //   "name": "Abhiram",
    //   "idNumber": "N191080",
    //   "mail": "n191080@rguktn.ac.in"
    // },
    // {
    //   "name": "Shareef",
    //   "idNumber": "N190499",
    //   "mail": "n190499@rguktn.ac.in"
    // }

  ]

  async function addId(idNumber, name, email) {
    const url = 'https://cheeriobackend-v4ch.onrender.com/add-id'; // Assuming your server is running on the same domain
    const data = { idNumber, name, email };
  
    try {
      const response = await fetch(url, {
        method: 'POST', // Use POST for creating data
        headers: { 'Content-Type': 'application/json' }, // Set content type for JSON data
        body: JSON.stringify(data), // Stringify the data object into JSON
      });
  
      if (!response.ok) {
        // Handle non-200 status codes (errors)
        const errorData = await response.json();
        // throw new Error(errorData.message || 'Failed to add ID');
        console.log(errorData);
      }
  
      const addedUser = await response.json();
      console.log('ID added successfully:', addedUser); // Handle successful response
    } catch (error) {
      console.error('Error adding ID:', error.message); // Handle errors
    }
  }
  (async () => {
    for (const student of students) {
      await addId(student.idNumber, student.name, student.email);
    }
  })();
  
  

