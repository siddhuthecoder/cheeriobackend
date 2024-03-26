const students = [
    {
      "name": "CH. LAVANYA",
      "idNumber": "N200094",
      "email": "n200094@rguktn.ac.in"
    },
    {
      "name": "M. SANGEETHA",
      "idNumber": "N200348",
      "email": "n200348@rguktn.ac.in"
    },
    {
      "name": "V.A.K. VAMSITHA",
      "idNumber": "N200683",
      "email": "n200683@rguktn.ac.in"
    },
    {
      "name": "T. SHALINI",
      "idNumber": "N200029",
      "email": "n200029@rguktn.ac.in"
    },
    {
      "name": "P. SWAPNA",
      "idNumber": "N200784",
      "email": "n200784@rguktn.ac.in"
    },  
    {
      "name": "K.TEJA SRI",
      "idNumber": "N200375",
      "email": "n200375@rguktn.ac.in"
    },
    {
      "name": "B.TEJA",
      "idNumber": "N200521",
      "email": "n200521@rguktn.ac.in"
    },
    {
      "name": "K.KUSUMA PRIYA",
      "idNumber": "N200522",
      "email": "n200522@rguktn.ac.in"
    },
    {
      "name": "P. SOWJANYA",
      "idNumber": "N200450",
      "email": "n200450@rguktn.ac.in"
    },
    {
      "name": "L. KALYAN",
      "idNumber": "N200329",
      "email": "n200329@rguktn.ac.in"
    },
    {
      "name": "S. PRADEEP",
      "idNumber": "N201023",
      "email": "n201023@rguktn.ac.in"
    },
    {
      "name": "S. DILEEP",
      "idNumber": "N200791",
      "email": "n200791@rguktn.ac.in"
    },
    {
      "name": "K.MOHAN KUMAR",
      "idNumber": "N200394",
      "email": "n200394@rguktn.ac.in"
    },
    {
      "name": "B.V.P SIDDARDHA",
      "idNumber": "N200426",
      "email": "n200426@rguktn.ac.in"
    },
    {
      "name": "S. AKHIL",
      "idNumber": "N200145",
      "email": "n200145@rguktn.ac.in"
    },
    {
      "name": "B. BHARGAV",
      "idNumber": "N200663",
      "email": "n200663@rguktn.ac.in"
    },
    {
      "name": "PRABHAS",
      "idNumber": "N200738",
      "email": "n200738@rguktn.ac.in"
    },
    {
      "name": "NOOR BHASA",
      "idNumber": "N200750",
      "email": "n200750@rguktn.ac.in"
    },
    {
      "name": "N. GANESH NAIK",
      "idNumber": "N201002",
      "email": "n201002@rguktn.ac.in"
    },
    {
      "name": "G. SATHISH ROY",
      "idNumber": "N200298",
      "email": "n200298@rguktn.ac.in"
    },
    {
      "name": "G. DILEEP REDDY",
      "idNumber": "N200947",
      "email": "n200947@rguktn.ac.in"
    },
    {
      "name": "J. LEELA SAI",
      "idNumber": "N200065",
      "email": "n200065@rguktn.ac.in"
    },
    {
      "name": "M. DHEERAJ",
      "idNumber": "N200800",
      "email": "n200800@rguktn.ac.in"
    },
    {
      "name": "H. SAI",
      "idNumber": "N200957",
      "email": "n200957@rguktn.ac.in"
    },
    {
      "name": "Y. Siddrhu",
      "idNumber": "N200081asdasxcesddswdsaasadderasdsfesddddfsdssaasdsafrfsdas",
      "email": "siddarthyernagula@gmail.com"
    },
    {
      "name": "Y. Siddrhu",
      "idNumber": "N200081asascdsewassaserdaddasdsdddsdssfdssdsadaasdsafrfsdas",
      "email": "siddarthyernagula2004@gmail.com"
    },
    {
      "name": "Abhiram",
      "idNumber": "N191080",
      "email": "n191080@rguktn.ac.in"
    },
    {
      "name": "Shareef",
      "idNumber": "N190499",
      "email": "n190499@rguktn.ac.in"
    }

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
  
  

