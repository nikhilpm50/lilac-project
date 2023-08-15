import React from "react";
import "./style.css";
import CourseCreation from "../../components/Course/CourseCreation";
import ApplyCards from "../../components/Cards/ApplyCards";

function CourseCreationPage() {
  const cardData = [
    {
      profilePhoto:
        "https://www.socialketchup.in/wp-content/uploads/2020/05/fi-vill-JOHN-DOE.jpg",
      name: "John Doe",
      employeeCode: "EMP123",
      phoneNumber: "123-456-7890",
      email: "johndoe@example.com",
      degreeName: "Bachelor of Science",
      applied: true,
    },
    {
      profilePhoto:
        "https://www.socialketchup.in/wp-content/uploads/2020/05/fi-vill-JOHN-DOE.jpg",
      name: "Harry joa",
      employeeCode: "EMP123",
      phoneNumber: "123-456-7890",
      email: "harry@example.com",
      degreeName: "Bachelor of Business Administration",
      applied: false,
    },
    {
      profilePhoto:
        "https://www.socialketchup.in/wp-content/uploads/2020/05/fi-vill-JOHN-DOE.jpg",
      name: "Ashwathy",
      employeeCode: "EMP123",
      phoneNumber: "123-456-7890",
      email: "ashwathy@example.com",
      degreeName: "Bachelor of commerce",
      applied: true,
    },
  ];
  return (
    <div className="root">
      <div className="cards">
        {cardData.map((data) => (
          <ApplyCards
            profilePhoto={data.profilePhoto}
            name={data.name}
            email={data.email}
            phoneNumber={data.phoneNumber}
            employeeCode={data.employeeCode}
            degreeName={data.degreeName}
            applied={data.applied}
          />
        ))}
      </div>
      <CourseCreation />
    </div>
  );
}

export default CourseCreationPage;
