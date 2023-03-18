import * as React from "react";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Button, Paper } from "@mui/material";

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "50px auto" };
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [students, setStudents] = React.useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New student added");
    });
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => setStudents(result));
  });
  return (
    <Container>
      <Paper elevation={5} style={paperStyle}>
        <h1 style={{ color: "grey" }}>Add Student</h1>
        <form className="textField" noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Student name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student address"
            variant="outlined"
            margin="normal"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="success" onClick={handleClick}>
            Submit
          </Button>
        </form>
      </Paper>
      <Paper elevation={3} style={paperStyle}>
        {students.map(student=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={student.id}>
                id:{student.id}<br></br>
                Name:{student.name}<br></br>
                address:{student.address}
            </Paper>
        ))}
      </Paper>
    </Container>
  );
}
