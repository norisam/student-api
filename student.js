const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// data
let students = [
  { id: 1, name: 'Zayne', age: 21 },
  { id: 2, name: 'Tara', age: 22 }
];

// GET /students 
app.get('/students', (req, res) => {
  res.json(students);
});

// GET /student/:id
app.get('/student/:id', (req, res) => {
  const student = students.find(s => s.id == parseInt(req.params.id));
  if (!student) return res.status(404).send('no student found');
  res.json(student);
});
// POST /students 
app.post('/students', (req, res) => {
    const { name, age } = req.body;
    const newStudent = {
      id: students.length + 1,
      name,
      age
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
  });
  
  // PUT /student/:id 
  app.put('/student/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('no student found.');
  
    const { name, age } = req.body;
    student.name = name;
    student.age = age;
    res.json(student);
  });
  
  // DELETE /student/:id 
  app.delete('/student/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex === -1) return res.status(404).send('o student found.');
  
    const deletedStudent = students.splice(studentIndex, 1);
    res.json(deletedStudent[0]);
  });
  
 app.listen(port, () => {
    console.log(`Server http://localhost:${port} `);
  });


